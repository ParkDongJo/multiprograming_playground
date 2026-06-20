/**
 * API 호출 배치 처리 시스템 - 정답 (@fxts/core 사용)
 */

import { map, delay, fx } from "@fxts/core";

// API 호출 정보
interface ApiCall {
  id: string;
  url: string;
}

// 결과 타입
type SuccessResult = {
  success: true;
  data: {
    id: string;
    name: string;
  };
}
type ErrorResult = {
  success: false;
  error: string;
}

/**
 * TaskRunner 클래스 (chapter6 참고)
 */
class TaskRunner<T> {
  private _promise: Promise<T> | null = null;
  private _isDone = false;

  get promise() { 
    return this._promise ?? this.run(); 
  }
  
  get isDone() { 
    return this._isDone; 
  }

  constructor(private f: () => Promise<T>) {}

  async run() {
    if (this._promise) {
      return this._promise;
    }
    
    return this._promise = this.f().then(res => {
      this._isDone = true;
      return res;
    });
  }
}

/**
 * TaskPool 클래스 (chapter6 참고)
 */
class TaskPool<T> {
  private readonly taskIterator: IterableIterator<TaskRunner<T>>;
  private readonly pool: TaskRunner<T>[] = [];
  public poolSize: number;
  
  constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
    this.taskIterator = map(f => new TaskRunner(f), fs);
    this.poolSize = poolSize;
  }

  setPoolSize(poolSize: number) {
    this.poolSize = poolSize;
  }

  private canExpandPool() {
    return this.pool.length < this.poolSize;
  }

  async run(errorHandle: (err: unknown) => unknown) {
    const { pool, taskIterator } = this;
    const tasks: TaskRunner<T>[] = [];

    while (true) {
      const { done, value: nextTask } = taskIterator.next();
      
      if (!done) {
        pool.push(nextTask);
        tasks.push(nextTask);
        if (this.canExpandPool()) continue;
      }
      
      if (done && pool.length === 0) break;
      
      await Promise.race(pool.map(task => task.run())).catch(errorHandle);
      pool.splice(pool.findIndex(task => task.isDone), 1);
    }

    return tasks.map(task => task.promise);
  }

  async runAllSettled(): Promise<PromiseSettledResult<T>[]> {
    return Promise.allSettled(await this.run(() => undefined));
  }
}

/**
 * API 호출 처리기 - 완성된 구현 (@fxts/core 사용)
 */
class ApiController {
  constructor(
    private concurrency: number = 2
  ) {}

  // API 호출 (30% 확률로 실패)
  private async callApiCall(url: string): Promise<SuccessResult | ErrorResult> {
    await delay(3 * 1000 + 500);
    
    // 30% 확률로 실패
    if (Math.random() < 0.3) {
      return Promise.reject({
        success: false,
        error: new Error(`Network error for ${url}`),
      });
    }
    
    return Promise.resolve({
      success: true,
      data: {
        id: url.split('/').pop() ?? '-',
        name: url.split('/').pop() ?? '-',
      },
    });
  }

  // [문제] batch 함수 구현
  async batch(apis: ApiCall[]): Promise<{
    successful: SuccessResult['data'][];
    failed: ErrorResult['error'][];
  }> {
    // 1. 함수들로 변환하여 TaskPool에 전달
    const tasks = fx(apis)
      .map(api => () => this.callApiCall(api.url))
      .toArray()
    
    // 2. TaskPool 생성
    const taskPool = new TaskPool(tasks, this.concurrency);
    
    // 3. runAllSettled 호출
    const results = await taskPool.runAllSettled();
    
    // 4. 결과 분류하여 반환 (함수형 스타일)
    const successful = fx(results)
      .filter(result => result.status === 'fulfilled')
      .reject(result => !result.value.success)
      .map(result => (result.value as SuccessResult).data)
      .toArray();

    const failed = fx(results)
      .filter(result => result.status === 'rejected')
      .map(result => result.reason.error)
      .toArray();
    
    return { successful, failed };
  }
}

// 테스트 코드
async function main() {
  const controller = new ApiController(2); // 동시성 2

  const apiCalls: ApiCall[] = [
    { id: 'api1', url: 'https://api.example.com/users/1' },
    { id: 'api2', url: 'https://api.example.com/users/2' },
    { id: 'api3', url: 'https://api.example.com/users/3' },
    { id: 'api4', url: 'https://api.example.com/users/4' },
    { id: 'api5', url: 'https://api.example.com/users/5' },
  ];

  console.log('🚀 API 호출 시작... (@fxts/core 사용)');
  
  const result = await controller.batch(apiCalls);
  
  console.log(`✅ 성공: ${result.successful.length}개`);
  console.log(`❌ 실패: ${result.failed.length}개`);
  
  // 성공 결과 출력
  console.log('\n📊 성공한 API 호출:');
  result.successful.forEach(({ id, name }) => {
    console.log(`  ${id}: ${name})`);
  });
  
  // 실패 결과 출력
  console.log('\n📊 실패한 API 호출:');
  result.failed.forEach((error) => {
    console.log(`  ${error})`);
  });
}

// 실행
main().catch(console.error);

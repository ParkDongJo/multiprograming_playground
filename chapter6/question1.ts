/**
 * 6장에서 학습한 TaskPool 를 바탕으로 api 호출에 대한 batch 처리하는 함수를 구현해주세요.
 * 
 * 조건
 * - api 동시 호출은 2개로 제한합니다.
 * - 성공과 실패에 대한 결과를 따로 분리하여 반환합니다.
 * 
 * 의도
 * - 책내용을 보고 TaskPool를 구현해보셨나요?
 * - TaskPool을 통해 받은 응답값을 가볍게 다뤄봅시다
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
 * API 호출 처리기 - 완성된 구현 (@fxts/core 사용)
 */
class ApiController {
  constructor(
    // 동시성 2개로 제한
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
    
    // 3. runAllSettled 호출
    
    // 4. 결과 분류하여 반환 (함수형 스타일)
    const successful = null;

    const failed = null;
    
    return { successful, failed };
  }
}

// 확인 코드!
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

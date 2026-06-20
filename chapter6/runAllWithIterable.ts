import { delay } from "@fxts/core";

class TaskRunner<T> {
  private _promise: Promise<T> | null = null;
  private _isDone = false;
  get promise() { return this._promise ?? this.run(); }
  get isDone() { return this._isDone; }

  constructor(private f: () => Promise<T>) {}

  async run() {
    if (this._promise) {
      return this._promise;
    } else {
      return this._promise = this.f().then(res => {
        this._isDone = true;
        return res;
      });
    }
  }
}

// 이터러블 적용
class TaskPool<T> {
  private readonly taskIterator: IterableIterator<TaskRunner<T>>;
  private readonly pool: TaskRunner<T>[] = [];
  public poolSize: number;

  // (1)
  constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
    this.taskIterator = map(f => new TaskRunner(f), fs); // (2)
    this.poolSize = poolSize;
  }

  setPoolSize(poolSize: number) {
    this.poolSize = poolSize;
  }

  private canExpandPool() {
    return this.pool.length < this.poolSize;
  }

  async runAll() {
    const { pool, taskIterator } = this;
    const tasks: TaskRunner<T>[] = [];

    while (true) { // (3)
      const { done, value: nextTask } = taskIterator.next();
      if (!done) {
        pool.push(nextTask);
        tasks.push(nextTask);
        if (this.canExpandPool()) continue;
      }
      if (done && pool.length === 0) break;
      await Promise.race(pool.map(task => task.run()));
      pool.splice(pool.findIndex(task => task.isDone), 1);
    }

    return Promise.all(tasks.map(task => task.promise));
  }
}


const tasks = [
  createAsyncTask("A", 1000),
  createAsyncTask("B", 500),
  createAsyncTask("C", 800),
  createAsyncTask("D", 300),
  createAsyncTask("E", 1200),
];

const run = async () => {
  const poolSize = 2;
  const results = await new TaskPool(tasks, poolSize).runAll();
  console.log("Results:", results);
}

async function crawling(page: number) {
  console.log(`Starting analysis of page ${page}`)
  await delay(5_000);
  console.log(`Page ${page} saved successfully`);
  return page;
}

void new TaskPool(
  map(page => () => crawling(page), range(Infinity)),
  5
).runAll();
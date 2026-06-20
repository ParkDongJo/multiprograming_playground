import { delay, range } from "@fxts/core";

async function code_6_27_28() {
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

    private async run(errorHandle: (err: unknown) => unknown) {
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

    async runAll() {
      return Promise.all(await this.run(err => Promise.reject(err)));
    }

    async runAllSettled() {
      return Promise.allSettled(await this.run(() => undefined));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    () => createAsyncTask("B", 500)().then(() => Promise.reject('no!')),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  async function runAllTest() {
    try {
      const result = await new TaskPool(tasks, 2).runAll();
      console.log(result);
    } catch (e) {
      console.log(e); // "no!"
    }
  }

  await runAllTest();

  async function runAllSettledTest() {
    const result = await new TaskPool(tasks, 2).runAllSettled();
    console.log(result);
    // [
    //   {status: "fulfilled", value: "A"},
    //   {status: "rejected", reason: "no!"},
    //   {status:"fulfilled",value:"C"},
    //   {status:"fulfilled",value:"D"},
    //   {status:"fulfilled",value:"E"}
    // ]
  }

  await runAllSettledTest();

  async function runAllTest2() {
    try {
      const task = (page: number) => () =>
        page === 7
          ? Promise.reject(page)
          : crawling(page);

      await new TaskPool(map(task, range(Infinity)), 5).runAll();
    } catch (e) {
      console.log(`Crawling failed halfway! (Page ${e})`);
    }
  }

  await runAllTest2();

  await delay(10_000);
  console.log('------------');

  async function runAllSettledTest2() {
    const task = (page: number) => () =>
      page === 7
        ? Promise.reject(page)
        : crawling(page);

    const taskPool = new TaskPool(
      map(task, range(Infinity)), 5
    );

    void taskPool.runAllSettled();

    setTimeout(() => {
      taskPool.setPoolSize(10);
    }, 10_000);
  }

  void runAllSettledTest2();
}

export async function main() {
  // await code_6_20_21();
  // await code_6_22();
  // await code_6_24();
  // await code_6_25_26();
  await code_6_27_28();
}
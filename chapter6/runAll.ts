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

class TaskPool<T> {
  private readonly tasks: TaskRunner<T>[];
  private readonly pool: TaskRunner<T>[] = [];
  public poolSize: number;

  constructor(fs: (() => Promise<T>)[], poolSize: number) {
    this.tasks = fs.map(f => new TaskRunner(f));
    this.poolSize = poolSize;
  }

  setPoolSize(poolSize: number) {
    this.poolSize = poolSize;
  }

  private canExpandPool() {
    return this.pool.length < this.poolSize;
  }

  async runAll() {
    const { pool, tasks } = this;

    let i = 0;
    const { length } = tasks;
    while (i < length) {
      const nextTask = tasks[i];
      pool.push(nextTask);
      const isNotLast = ++i < length;
      if (isNotLast && this.canExpandPool()) continue;
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

run();

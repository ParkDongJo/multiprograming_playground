

async function runTasksWithPool<T>(
  fs: (() => Promise<T>)[],
  poolSize: number
): Promise<T[]> {
  const results: T[] = [];
  const activePromises: Promise<void>[] = [];

  for (let i = 0; i < fs.length; i++) {
    const taskFactory = fs[i];
    const p = taskFactory()
      .then((fetchedValue) => {
        results[i] = fetchedValue;
      })
      .then(() => {
        const removeIndex = activePromises.indexOf(p);
        if (removeIndex > -1) {
          activePromises.splice(removeIndex, 1);
        }
      });

    activePromises.push(p);

    if (activePromises.length >= poolSize) {
      await Promise.race(activePromises);
    }
  }

  await Promise.all(activePromises);

  return results;
}

function createAsyncTask(name: string, ms: number): () => Promise<string> {
  return () =>
    new Promise(resolve => {
      console.log(`Started: ${name}`);
      setTimeout(() => {
        console.log(`Finished: ${name}`);
        resolve(name);
      }, ms);
    });
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
  const results = await runTasksWithPool(tasks, poolSize);
  console.log("Results:", results);
}

run();

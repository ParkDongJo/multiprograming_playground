import { fx } from "@fxts/core";
import { fx as fxIterable } from "../common/FxIterable";
import { fromAsync } from "../common/fromAsync";

async function executeWithLimit(fs: (() => Promise<void>)[], limit: number) {
  const results = [];

  for (let i = 0; i < fs.length; i += limit) {
    const batchPromise = [];
    for (let j = 0; j < limit; j++) {
      batchPromise.push(fs[i+j]());
    }
    const batchResults = await Promise.all(batchPromise);
    results.push(...batchResults);
  }

  return results;
}

const executeWithLimitV2 = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> => {
  return fxIterable(fs)
    .map(f => f())
    .chunk(limit)
    .map(batch => Promise.all(batch))
    .to(fromAsync)
    .then(results => results.flat());
}

const executeWithLimitV3 = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> => {
  return fx(fs)
  .toAsync()
  .map(f => f())
  .concurrent(limit)
  .toArray();
}
import { fx } from "../common/FxIterable";

const isOdd = (a: number) => a % 2 === 1;

function* naturals(limit: number): IterableIterator<number> {
  let i = 0;
  while(i < limit) yield i++;
};

const delay = <T>(ms: number, result: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(result), ms));


async function test() {
  console.log(
    fx(naturals(4))
    .filter(isOdd)
    .map(a => a * a)
    .toArray()
  )
}

const iter2 = fx(naturals(4))
  .toAsync()
  .filter(a => delay(100, isOdd(a)))
  .map(a => a.toFixed(2))

const consoleIter2 = async function () {
  for await (const a of iter2) {
    console.log(a);
  }
}
consoleIter2();

const iter3 = fx(naturals(4))
  .filter(isOdd)
  .toAsync()
  .map(a => delay(100, a * 10))
  .toArray();

const consoleIter3 = async function () {
  return await iter3;
}
consoleIter3();
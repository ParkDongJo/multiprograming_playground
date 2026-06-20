import FxIterable, { fx } from "./FxIterable";

const run = () => {
  const result = fx([1, 2, 3, 4, 5])
    .map(x => x * 2)
    .filter(x => x % 2 === 0)
    .reduce((acc, x) => acc + x, 0);

  console.log(result);
}

run();

const run2 = () => {
  const result = fx([1, 2, 3, 4, 5])
    .filter(x => x % 2 === 0)
    .map(x => x * 10)
    .chain(iterable => new Set(iterable))
    .reduce((acc, x) => acc + x);

  console.log(result);
}

run2();
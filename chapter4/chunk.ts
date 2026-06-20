import take from "../common/take";

export function* chunk<A>(iter: Iterable<A>, size: number): Generator<A[]> {
  const iterator = iter[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]: () => iterator,
      }),
    ];
    if (arr.length < size) break;
    yield arr;
  }
}

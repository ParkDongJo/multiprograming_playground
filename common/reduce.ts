function baseReduce<A, Acc>(
  fn: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterator<A>
) {
  while (true) {
    const { done, value } = iterable.next();
    if (done) return acc;
    acc = fn(acc, value);
  }
}

export function reduce<A, Acc>(
  fn: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>
): Acc;
export function reduce<A, Acc>(
  fn: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>
): Acc;
export default function reduce<A, Acc>(
  fn: (a: Acc | A, b: A) => Acc, 
  accOrIterable: Acc | Iterable<A>, 
  iterable?: Iterable<A>
): Acc {

  if (iterable === undefined) {
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done) throw new Error("Cannot reduce empty iterable");
    return baseReduce(fn, acc, iterator) as Acc;
  }
  return baseReduce(fn, accOrIterable as Acc, iterable[Symbol.iterator]());
}

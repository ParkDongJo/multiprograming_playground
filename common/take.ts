export default function* take<A>(n: number, iterable: Iterable<A>): Iterable<A> {
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    yield iterator.next().value;
  }
}

export function* filterSync<A>(f: (a: A) => boolean, iter: Iterable<A>): IterableIterator<A> {
  for (const value of iter) {
    if (f(value)) yield value;
  }
}

export function mapSync<A, B>(f: (a: A) => B, iter: Iterable<A>): IterableIterator<B> {
  const iterator = iter[Symbol.iterator]();
  return {
    next: () => {
      const { done, value } = iterator.next();
      return done ? { done, value } : { done, value: f(value) };
    },
    [Symbol.iterator]() { 
      return this
    },
  }
}

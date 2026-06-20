export function mapAsync<A, B>(f: (a: A) => B, asyncIterable: AsyncIterable<A>): AsyncIterableIterator<Awaited<B>> {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();

  return {
    async next() {
      const { done, value } = await asyncIterator.next();
      return done ? { done, value } : { done, value: await f(value) };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  }
}

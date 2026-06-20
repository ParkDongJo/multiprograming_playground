export async function* filterAsync<A>(f: (a: A) => boolean | Promise<boolean>, asyncIterable: AsyncIterable<A>): AsyncIterableIterator<A> {
  for await (const value of asyncIterable) {
    if (await f(value)) yield value;
  }
}

export async function* toAsync<T>(iterable: Iterable<T | Promise<T>>): AsyncIterableIterator<Awaited<T>> {
  for await (const value of iterable) {
    yield value;
  }
}

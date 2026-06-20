
export function* concat<A>(...iterables: Iterable<A>[]): Iterable<A> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

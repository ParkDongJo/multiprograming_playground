export default function* filter<A>(fn: (a: A) => boolean, iterable: Iterable<A>) {
  for (const a of iterable) {
    if (fn(a)) {
      yield a;
    }
  }
}
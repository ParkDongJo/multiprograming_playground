export default function forEach<A>(fn: (a: A) => void, iterable: Iterable<A>): void {
  for (const a of iterable) {
    fn(a);
  }
}

export default function* findIndex<A>(iter: Iterable<A>, fn: (a: A) => boolean): Generator<number> {
  let index = 0;
  for (const a of iter) {
    if (fn(a)) yield index;
    index++;
  }
  return -1;
}

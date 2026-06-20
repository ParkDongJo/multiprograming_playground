export function head<A>(iterable: Iterable<A>): A
export function head<A>(iterable: Iterable<A>): A | undefined
export function head<A>(iterable: Iterable<A>): A | undefined {
  return iterable[Symbol.iterator]().next().value;
}

import { fx } from "../common/FxIterable";

function head<A>(iterable: Iterable<A>): A | undefined {
  return iterable[Symbol.iterator]().next().value;
}

export function find<A>(iterable: Iterable<A>, fn: (a: A) => boolean): A | undefined {
  return fx(iterable).filter(fn).to(head);
}

const result = find([1, 2, 3, 4, 5], (a) => a % 2 === 0);
console.log(result);

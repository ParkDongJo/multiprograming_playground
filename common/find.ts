import { fx } from "../common/FxIterable";
import { head } from "./head";

export default function find<A>(iterable: Iterable<A>, fn: (a: A) => boolean): A | undefined {
  return fx(iterable).filter(fn).to(head);
}

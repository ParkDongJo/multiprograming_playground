import reduce from "./reduce";
import map from "./map";
import filter from "./filter";
import forEach from "./forEach";  
import take from "./take";

export const fx = <A>(iterable: Iterable<A>): FxIterable<A> => {
  return new FxIterable(iterable);
}

class FxIterable<A> {
  constructor(public readonly iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(fn: (a: A) => B): FxIterable<B> {
    return fx(map(fn, this.iterable));
  }

  filter(fn: (a: A) => boolean): FxIterable<A> {
    return fx(filter(fn, this.iterable));
  }
  
  forEach(fn: (a: A) => void): void {
    return forEach(fn, this.iterable);
  }

  reduce<Acc>(fn: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
  reduce<Acc>(fn: (a: A, b: A) => Acc): Acc;
  reduce<Acc>(fn: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
    return acc === undefined ? reduce(fn, this.iterable) : reduce(fn, acc, this.iterable);
  }

  toArray(): A[] {
    return Array.from(this.iterable);
  }

  reject(fn: (a: A) => boolean): FxIterable<A> {
    return this.filter(a => !fn(a));
  }

  to<R>(converter: (iterable: this) => R): R {
    return converter(this);
  }

  chain<B>(fn: (iterable: this) => Iterable<B>): FxIterable<B> {
    return fx(fn(this));
  }

  take(n: number): FxIterable<A> {
    return fx(take(n, this.iterable));
  }
}

export default FxIterable;
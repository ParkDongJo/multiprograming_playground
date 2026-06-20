import reduce from "./reduce";
import map from "./map";
import filter from "./filter";
import forEach from "./forEach";  
import take from "./take";
import { chunk } from "./chunk";
import findIndex from "./findIndex";
import { head } from "./head";
import { mapAsync } from "./mapAsync";
import { filterAsync } from "./filterAsync";
import { fromAsync } from "./fromAsync";
import { toAsync } from "./toAsync";
import { map as mapOverrided } from "./mapOverrided";
import { filter as filterOverrided } from "./filterOverrided";
import { reduce as reduceOverrided } from "./reduceOverrided";
import { flat } from "./flat";

/*
Looking at the error, TypeScript can't access Symbol.iterator on the unknown type. The most concise fix is to cast iterable to any before accessing the symbol property:

이 방법은 다음과 같은 단계로 체크합니다:
iterable != null - null이나 undefined가 아닌지 확인
typeof iterable === 'object' - 객체 타입인지 확인
Symbol.iterator in iterable - Symbol.iterator 프로퍼티가 존재하는지 확인
*/
const isIterable = <T = unknown>(iterable: Iterable<T> | unknown): iterable is Iterable<T> => {
  return iterable != null && typeof iterable === 'object' && Symbol.iterator in iterable;
}

export function fx<A>(Iterator: Iterable<A>): FxIterable<A>;
export function fx<A>(AsyncIterator: AsyncIterable<A>): FxAsyncIterable<A>;
export function fx<A>(iterable: Iterable<A> | AsyncIterable<A>): FxIterable<A> | FxAsyncIterable<A> {
  return isIterable(iterable) ? new FxIterable(iterable) : new FxAsyncIterable(iterable);
}

class FxIterable<A> {
  constructor(public readonly iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(fn: (a: A) => B): FxIterable<B> {
    return fx(mapOverrided(fn, this));
  }

  filter(fn: (a: A) => boolean): FxIterable<A> {
    return fx(filterOverrided(fn, this));
  }
  
  forEach(fn: (a: A) => void): void {
    return forEach(fn, this.iterable);
  }

  find(fn: (a: A) => boolean): A | undefined {
    return fx(filter(fn, this.iterable)).to(head) as A | undefined;
  }

  findIndex(fn: (a: A) => boolean): number {
    return fx(findIndex(this.iterable, fn)).to(head) as number;
  }

  // reduce<Acc>(fn: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
  // reduce<Acc>(fn: (a: A, b: A) => Acc): Acc;
  // reduce<Acc>(fn: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
  //   return acc === undefined ? reduce(fn, this.iterable) : reduce(fn, acc, this.iterable);
  // }

  reduce<Acc>(fn: (acc: Acc, a: A) => Acc, acc: Acc): Acc | Promise<Acc> {
    return reduceOverrided(fn, acc, this);
  }

  reject(fn: (a: A) => boolean): FxIterable<A> {
    return this.filter(a => !fn(a));
  }
  
  chain<B>(fn: (iterable: this) => Iterable<B>): FxIterable<B> {
    return fx(fn(this));
  }
  
  take(n: number): FxIterable<A> {
    return fx(take(n, this.iterable));
  }
  
  chunk(size: number): FxIterable<A[]> {
    return fx(chunk(this.iterable, size));
  }

  flat(): FxIterable<A> {
    return fx(flat(this.iterable));
  }
  
  toArray(): A[] {
    return Array.from(this.iterable);
  }

  to<R>(converter: (iterable: this) => R): R {
    return converter(this);
  }

  toAsync(): FxAsyncIterable<A> {
    return fx(toAsync(this));
  }
}

class FxAsyncIterable<A> {
  constructor(public readonly asyncIterable: AsyncIterable<A>) {}

  [Symbol.asyncIterator]() {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  map<B>(fn: (a: A) => B): FxAsyncIterable<Awaited<B>> {
    return fx(mapOverrided(fn, this));
  }

  filter(fn: (a: A) => boolean | Promise<boolean>): FxAsyncIterable<A> {
    return fx(filterOverrided(fn, this));
  }

  reduce<Acc>(fn: (acc: Acc, a: A) => Acc | Promise<Acc>, acc: Acc): Promise<Acc> {
    return reduceOverrided(fn, acc, this);
  }

  toArray(): Promise<A[]> {
    return fromAsync(this.asyncIterable);
  }
}

export default FxIterable;

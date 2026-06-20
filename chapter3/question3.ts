import { fx } from "../common/FxIterable";

// findIndex, join 를 만들어보는 문제를 낸다.


// findIndex 함수를 만들어 보자
/*
  const a = [1, 2, 3, 4, 5]
  findIndex(a, (a) => a === 3) // 2

  const b = {a: 1, b: 2, c: 3}
  findIndex(b, (a) => a === 3) // 2

  const d = new Map([[1, "a"], [2, "b"], [3, "c"]])
  findIndex(d, (a) => a === "c") // 2

  위 처럼 작동하는 findIndex 함수를 만들어보자.
*/



// [문제]
// 아래 findIndex 함수를 정의해주세요.
function findIndex() {}

const arr = [1, 2, 3, 4];
console.log(findIndex(arr, (x) => x === 3)); // 2

const set = new Set(["a", "b", "c"]);
console.log(findIndex(set, (x) => x === "b")); // 1
console.log(findIndex(set, (x) => x === "d")); // -1

const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);
console.log(findIndex(map.values(), (x) => x === "three")); // 2

function* gen() {
  yield 10;
  yield 20;
  yield 30;
}
console.log(findIndex(gen(), (x) => x === 20)); // 1


// [문제]
// 아래 join 함수를 정의해주세요.
function join() {}

const arr2 = [1, 2, 3, 4];
console.log(join(arr2, ',')); // 1,2,3,4

const set2 = new Set(["a", "b", "c"]);
console.log(join(set2, ',')); // a,b,c

const map2 = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);
console.log(join(map2.values(),'@')); // one@two@three

function* gen2() {
  yield 10;
  yield 20;
  yield 30;
}
console.log(join(gen2(), '-')); // 10-20-30


//정답
export function findIndex<A>(iter: Iterable<A>, fn: (a: A) => boolean): number {
  return fx(iter).findIndex(fn);
}

// 10-20-30 이렇게 출력되도록 해주세요.
export function join<A>(iter: Iterable<A>, sep: string): string {
  return fx(iter).reduce((acc, a) => acc + (!acc ? "" : sep) + a, "");
}

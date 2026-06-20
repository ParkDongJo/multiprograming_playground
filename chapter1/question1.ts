// 제너레이터 만들기

// 소수 판별 함수
function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}


// 일반 함수
// function filterdRange(start: number, end: number, predicate: (n: number) => boolean) {
//   const result = [];
//   for (let i = start; i <= end; i++) {
//     if (predicate(i)) {
//       result.push(i);
//     }
//   }
//   return result;
// }
// console.time('filterdRange basic');
// console.log(filterdRange(1, 100, isPrime));
// console.timeEnd('filterdRange basic');

/*
  실험 결과
  --------------------------------
  [
   2,  3,  5,  7, 11, 13, 17, 19,
  23, 29, 31, 37, 41, 43, 47, 53,
  59, 61, 67, 71, 73, 79, 83, 89,
  97
  ]
  filterdRange basic: 11.867ms

  2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
  filteredRange generator: 0.157ms
  --------------------------------

  제너레이터를 사용하여 연산을 한 결과가 훨씬 빨랐다.
  이 코드는 두 함수 모두 동일한 반복 횟수를 타지만 아래와 같은 부분에서 차이가 나는 듯 하다

  메모리 효율성:
  - 일반 배열 방식은 모든 결과를 메모리에 저장해야 합니다.
  - 제너레이터는 한 번에 하나의 값만 생성하고 반환하므로 메모리 사용이 적습니다.

  스프레드 연산자(...)와의 시너지:
  - console.log(...filteredRange(1, 100, isPrime))에서 스프레드 연산자는 제너레이터의 값을 필요할 때만 가져옵니다. 이는 메모리 사용을 최적화하고, 필요한 값만 처리하게 합니다.
*/

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// 제너레이터
function* findPrimeInRange(start: number, end: number, predicate: (n: number) => boolean) {
  for (let i = start; i <= end; i++) {
    if (predicate(i)) {
      yield i;
    }
  }
}
console.log(...findPrimeInRange(1, 100, isPrime));

console.time('filteredRange generator');
console.log(...findPrimeInRange(1, 100, isPrime));
console.timeEnd('filteredRange generator');


/*
  [문제 1]
  start, end 사이의 소수를 찾는 함수를 만들어보자.

  조건
  - isPrime 함수는 소수를 판별합니다.
*/

const isPrime = (n: number) => {
}

const findPrimeInRange = (start: number, end: number) => {
}

console.log(...findPrimeInRange(1, 100));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
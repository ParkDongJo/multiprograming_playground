/*
  FxIterable 에 take 함수를 추가해주세요.
  take 함수는 아래 예시를 만족해야합니다.
*/

import FxIterable, { fx } from "./FxIterable";

const result = fx([1, 2, 3, 4, 5])
  .take(3)
  .toArray();

// result 는 [ 1, 2, 3 ] 로 찍혀야 합니다.
console.log(result);


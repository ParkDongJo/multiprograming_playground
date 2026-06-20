/*
FxIterable 클래스를 활용하여, 작성할 수 있는 문제를 만들어줘

다음 조건을 만족하여, result 변수에 결과를 할당해줘
1. fruit이 아닌 것만
2. 1000원 이상
3. 상품명에 "A"가 포함된 상품만
4. 상품명만 추출
5. 이름 대문자 여야 합니다.
6. Set으로 중복 제거를 하세요
*/

import FxIterable, { fx } from "./FxIterable";

type Product = {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: "Apple", price: 1000, category: "fruit" },
  { name: "Banana", price: 800, category: "fruit" },
  { name: "Carrot", price: 500, category: "vegetable" },
  { name: "Donut", price: 1500, category: "dessert" },
  { name: "Eggplant", price: 1200, category: "vegetable" },
  { name: "Eggplant", price: 1200, category: "vegetable" },
];

// const result = 여기를 구현해주세요

// console.log(result);
// result 는 [ 'EGGPLANT' ] 로 찍혀야 합니다.




const result = fx(products)
  .reject(product => product.category === "fruit") // 1. fruit이 아닌 것만
  .map(product => ({ ...product, name: product.name.toUpperCase() })) // 2. 이름 대문자
  .filter(product => product.price >= 1000 && product.name.includes("A")) // 3. 1000원 이상
  .map(product => product.name) // 5. 상품명만 추출
  .chain(iterable => {
    // 4. 상품명에 "A"가 포함된 상품만, Set으로 중복 제거
    return new Set(iterable);
  })
  .toArray();

console.log(result);

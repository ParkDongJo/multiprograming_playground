// every, some, find, concat 를 활용하는 문제를 낸다.

/*

*/
import FxIterable, { fx } from "../common/FxIterable";
import { every } from "./every";
import { some } from "./some";

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
  { name: "Elderberry", price: 900, category: "fruit" },
];

// [문제]
// 이번 단원에 나오는 주요 함수들을 활용하여 문제를 해결해보자.
// 만들어 놓은 함수가 없다면, 이번 기회에 코드로 만들어 봅시다.

// fruit 만 찾아라
const fruits = undefined;
console.log(fruits); // Apple, Banana, Elderberry

// 1000원 이하 상품이 있는가?
const hasCheapProduct = undefined;
console.log(hasCheapProduct); // true

// 모든 상품이 3000원 미만인가?
const allUnderMaxPrice = undefined;
console.log(allUnderMaxPrice); // true


// // 정답
// // fruit 만 찾아라
// const fruits = fx(products).find(product => product.category === "fruit");
// console.log(fruits); // Apple, Banana, Elderberry

// // 1000원 이하 상품이 있는가?
// const hasCheapProduct = some(products, product => product.price < 1000);
// console.log(hasCheapProduct); // true

// // 모든 상품이 3000원 미만인가?
// const allUnderMaxPrice = every(products, product => product.price < 3000);
// console.log(allUnderMaxPrice); // true


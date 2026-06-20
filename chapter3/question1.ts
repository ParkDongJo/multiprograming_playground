import FxIterable, { fx } from "../common/FxIterable";

type Product = {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: "Apple", price: 1000, category: "fruit" },
  { name: "Banana", price: 800, category: "fruit" },
  { name: "Carrot", price: 500, category: "vegetable" },
  { name: "Eggplant", price: 1200, category: "vegetable" },
  { name: "Eggplant", price: 1200, category: "vegetable" },
  { name: "ApplePie", price: 2000, category: "dessert" },
  { name: "Donut", price: 1500, category: "dessert" },
];

const rejectFruit = (product: Product) => {
  console.log("1");
  return product.category === "fruit";
}
const upperCaseName = (product: Product) => {
  console.log("2");
  return ({ ...product, name: product.name.toUpperCase() })
};
const shouldIncludesA = (product: Product) => {
  console.log("3")
  return product.price >= 1000 && product.name.includes("A");
}
const getName = (product: Product) => {
  console.log("4")
  return product.name;
}
const log = (name: string) => {
  console.log("5")
  return name;
}




// 아래 코드를 실행했을 시 로그가 어떻게 찍힐지 추측을 해주세요.
const result2 = fx(products)
  .reject(rejectFruit)
  .map(upperCaseName)
  .filter(shouldIncludesA)
  .map(getName)
  .map(log)
  .take(2)
  .toArray();


console.log(result2);


// 아래 코드를 실행했을 시 로그가 어떻게 찍힐지 추측을 해주세요.
// const result = fx(products)
//   .reject(rejectFruit)
//   .map(upperCaseName)
//   .filter(shouldIncludesA)
//   .map(getName)
//   .take(1) // 5
//   .toArray();

// console.log(result);
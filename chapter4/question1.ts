import { fx } from "../common/FxIterable";


/*
[문제1]
아래의 조건에 맞는 값을 출력해주세요.

1. 상품명이 "A"가 포함된 상품만 필터링
2. 상품의 가격이 1000원 이상인 상품만 필터링
3. 상품의 신선도를 확인하는 함수를 호출하여 신선도가 높은 상품만 필터링 (신선도는 랜덤함수로 판단하도록 해뒀어요)
5. 상품명만 추출
*/

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


const fetchProductAll = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  }) as Promise<Product[]>;
};

const fetchIsFresh = (product: Product) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5);
    }, 1000);
  }) as Promise<boolean>;
}


// const getFreshProducts = 여기를 구현해주세요

// console.log() 로 결과값을 찍어보세요~



const getFreshProducts = async () => {
  const products = await fetchProductAll();

  const result = await fx(products)
    .filter(product => product.price >= 1000 && product.name.includes("A")) // 3. 1000원 이상
    .toAsync()
    .filter(fetchIsFresh)
    .map(product => product.name)
    .toArray();

  return result;
}

console.log(getFreshProducts().then(result => console.log(result)));

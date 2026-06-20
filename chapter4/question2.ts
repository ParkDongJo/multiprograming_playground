const productsData = require("./question2_products.json");

/*
[문제2]
아래의 코드를 책내용에서 배운 내용을 활용하여 개선해봅시다.
그리고 그렇게 개선한 이유를 간략하게 작성해주세요.
*/

type Product = {
  name: string;
  price: number;
  category: string;
}

const exchangeRate = 1000;

function parseProduct() {
  try {
    const parsedProducts = JSON.parse(productsData) as Product[];
    
    if (!Array.isArray(parsedProducts)) {
      throw new Error("productsData is not an array");
    }

    return parsedProducts.filter((product) => product.price >= 1).map((product) => ({
      name: product.name,
      price: product.price * exchangeRate,
      category: product.category
    }));
  } catch (e) {
    console.log(e);
  }
}

// 개선한 코드


// 개선한 이유

// nyoung 님

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


function* take<A>(n : number, iterable : Iterable<A>) : Iterable<A> {
  for(const item of iterable) {
    if(n <= 0) break;
    yield item;
    n--;
  }
}

function* map<A, B>(fn : (a : A) => B, iterable : Iterable<A>) : Iterable<B> {
  for(const item of iterable) {
    yield fn(item);
  }
}

function* filter<A>(fn: (a : A) => boolean, iterable : Iterable<A>) : Iterable<A> {
    for(const item of iterable) {
      if(fn(item)) {
        yield item;
      }
    }
  }



class FxIterable<A> {
  private iterable : Iterable<A>;

  constructor(iterable : Iterable<A>) {
    this.iterable = iterable;
  }

  take(n : number) : FxIterable<A> {
    return new FxIterable(take(n, this.iterable));
  }

  filter(fn : (a : A) => boolean) : FxIterable<A> {
    return new FxIterable(filter(fn, this.iterable));
  }

  map<B>(fn: (a:A) => B) : FxIterable<B> {
    return new FxIterable(map(fn, this.iterable))
  }

  toArray() : A[] {
    return [...this.iterable];
  }

  toSet() : Set<A> {
    return new Set(this.iterable);
  }
}

function fx<A>(iterable : Iterable<A>) {
  return new FxIterable(iterable);
}

/*
fruit이 아닌 것만, // filter
1000원 이상, // filter
상품명에 "A"가 포함된 상품만, //filter
상품명만 추출, // map
이름은 대문자 여야 합니다. // map
Set으로 중복 제거를 하세요, // toSet
*/

const result = fx<Product>(products)
.filter(product => product.category !== "fruit")
.filter(product => product.price >= 1000)
.filter(product => product.name.includes("a"))
.map(product => product.name)
.map(name => name.toUpperCase())
.toSet()

console.log(result)


// 희지님 코드
class FxIterable<A> {
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  // 중략 ..

  // FxIterable 클래스에 to 추가
  to<R>(converter: (iterable: this) => R): R {
    return converter(this);
  }
}

const result2 = fx(products)
  .filter(v => v.category !== 'fruit' && v.price >= 1000)
  .map(v => v.name.toUpperCase())
  .filter(name => name.includes('A'))
  .to(iterable => new Set(iterable));

console.log([...result2]); // [ 'EGGPLANT' ]
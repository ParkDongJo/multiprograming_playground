import { zip } from "./zip";
import { fx } from "../../common/FxIterable";

/*
zip-reduce 패턴은 두 배열 이터러블을 결합한 후 이를 순회하여 최종결과 누적
*/

const keys = ['name', 'age', 'city'];
const values = ['John', 30, 'New York'];

const object = fx(zip(keys, values))
  .map(([key, value]) => ({ [key]: value }))
  .reduce((acc, curr) => ({ ...acc, ...curr }), {});

console.log(object);
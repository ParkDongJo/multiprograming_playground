// 230p

import { fromAsync } from "./fromAsync";
import { fx } from "../common/FxIterable";

const excuteWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> => 
  fx(fs)
  .map(f => f())
  .chunk(limit)
  .map(chunk => Promise.all(chunk))
  .to(fromAsync)
  .then(arr => arr.flat());

const fs = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  () => new Promise(resolve => setTimeout(() => resolve(3), 3000)),
]

excuteWithLimit(fs, 2).then(arr => console.log(arr));

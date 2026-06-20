/*
nested-map 패턴은 리스트 프로세싱에서 중첩된 데이터 구조를 처리하거나 데이터의 계층을 따라 각 수준에서 변형을 수행할때
*/

import { fx } from "@fxts/core";

const tree = [
  { id: 1, children: [{ id: 2 }, { id: 3 }] },
  { id: 4, children: [{ id: 5 }, { id: 6 }] },
];

const transformedTree = fx(tree)
  .map(node => ({
     ...node, 
     children: node.children.map(child => ({ ...child, parentId: node.id })) }))
  .toArray();

console.log(transformedTree);

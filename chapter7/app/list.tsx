import { useMemo } from "react";
import { filter, map, fx } from "@fxts/core";

type Item = {
  id: number;
  title: string;
  description: string;
  count: number;
  createdAt: string;
}

export default function List({ data }: { data: Item[] }) {

  const renderList = useMemo(() => {
    return fx(data)
    .filter((item) => item.count > 2)
    .reject((item) => item.createdAt > '2021-01-01')
    .map((item) => (
      <li key={item.id}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </li>
    ))
  }, [data])

  return <ul> 
    {renderList}
  </ul>;
}
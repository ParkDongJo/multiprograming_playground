
export const ViewList = () => {

  const renderItem = (item: { id: number, title: string, description: string }) => {
    return <li key={item.id}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </li>
  }

  return <div>ViewList</div>;
}
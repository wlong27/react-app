function ListGroup() {
  const items = ["New York", "San Franciso", "Tokyo", "London", "Paris"];

  if (items.length === 0) {
    return (
      <>
        <h1>List</h1>
        <p> No item found</p>
      </>
    );
  }

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item}> {item}</li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;

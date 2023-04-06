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

  const getMessage = () => {
    items.length === 0 && <p> No item found</p>;
  };

  return (
    <>
      <h1>List</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={(event) => {
              console.log(item, index);
              console.log(event);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;

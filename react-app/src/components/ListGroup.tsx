import { MouseEvent, useState } from "react";
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

  const handleClick = (event: MouseEvent) => {
    console.log(event);
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
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

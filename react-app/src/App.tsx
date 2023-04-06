import ListGroup from "./components/ListGroup";

function App() {
  const items = ["New York", "San Franciso", "Tokyo", "London", "Paris"];
  return (
    <div>
      <ListGroup items={items} heading="Cities"></ListGroup>
    </div>
  );
}

export default App;

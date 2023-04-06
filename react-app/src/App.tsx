import Alert from "./components/Alert";
import Buttons from "./components/Buttons";
import ListGroup from "./components/ListGroup";

function App() {
  const items = ["New York", "San Franciso", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      <Alert>
        <span>Hello World</span>
      </Alert>
      <Buttons color="danger" onClick={() => console.log("clicked")}>
        my button
      </Buttons>
    </div>
  );
}

export default App;

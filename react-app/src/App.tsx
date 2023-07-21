// import { useState } from "react";
// import Alert from "./components/Alert";
// import Buttons from "./components/Buttons";
// import ListGroup from "./components/ListGroup";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApiCall from "./ApiCall";
import CharacterDetails from "./CharacterDetails";
import "./styles.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import './App.css'; 

// function App() {
//   const items = ["New York", "San Franciso", "Tokyo", "London", "Paris"];

//   const handleSelectItem = (item: string) => {
//     console.log(item);
//   };

//   const [alertVisible, setAlertVisibility] = useState(false);

//   return (
//     <div>
//       <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       ></ListGroup>

//       {alertVisible && (
//         <Alert onClose={() => setAlertVisibility(false)}>
//           <span>Hello World</span>
//         </Alert>
//       )}
//       <Buttons color="danger" onClick={() => setAlertVisibility(true)}>
//         my button
//       </Buttons>
//     </div>
//   );
// }
const App: React.FC = () => {
  return (
    <>
      <AudioPlayer></AudioPlayer>
      <Router>
        <div className="App">
          <h1>My Star Wars React App</h1>
          <Routes>
            <Route path="/" element={<ApiCall />} />
            <Route path="/characters/:name" element={<CharacterDetails />} />
          </Routes>
        </div>
      </Router>
      
    </>
  );
};

export default App;

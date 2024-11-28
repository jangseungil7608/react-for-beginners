import Button from "./Button";
import Todo from "./components/Todo"
import Coin from "./components/Coin"
import Movie from "./components/Movie"
//import styles from "./App.module.css";
import {useState} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./routes/Home"
import Details from "./routes/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
        <Route path={process.env.PUBLIC_URL + "/movie/:id"} element={<Details />} />
      </Routes>
    </Router>
  );
}

/*
function App() {
  const [selectedValue,setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Select an Option</option>
      <option value="todo">TODO</option>
      <option value="coin">COIN</option>
      <option value="movie">MOVIE</option>
    </select>
    {selectedValue === "todo" ? <Todo /> : null}
    {selectedValue === "coin" ? <Coin /> : null}
    {selectedValue === "movie" ? <Movie /> : null} 
    </div>
  );
}
*/


export default App;

import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/App.css';
import { UserContext } from "./Context/UserContext";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Nav from "./Components/Nav/Nav";

function App() {
  // const { user } = useContext(UserContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
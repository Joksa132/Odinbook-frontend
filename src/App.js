import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/App.css';
import { UserContext } from "./Context/UserContext";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<ProtectedRoute isLoggedIn={user} destination={"/login"}><Home /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute isLoggedIn={!user} destination={"/"}><Register /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute isLoggedIn={!user} destination={"/"}><Login /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/App.css';
import { UserContext } from "./Context/UserContext";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import Profile from "./Components/Profile/Profile"
import SearchProfiles from "./Pages/SearchProfiles/SearchProfiles";

function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<ProtectedRoute id="register" isLoggedIn={user} destination={"/"}><Register /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute id="login" isLoggedIn={user} destination={"/"}><Login /></ProtectedRoute>} />

          <Route path="/" element={<ProtectedRoute isLoggedIn={!user} destination={"/login"}><Home /></ProtectedRoute>} />
          <Route path="/search/:name" element={<ProtectedRoute isLoggedIn={!user} destination={"/login"}><SearchProfiles /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute isLoggedIn={!user} destination={"/login"}><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
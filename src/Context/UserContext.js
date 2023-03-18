import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get("http://localhost:4000/user/info", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
      setUser(
        {
          username: res.data.userName,
          userId: res.data.userId
        }
      )
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
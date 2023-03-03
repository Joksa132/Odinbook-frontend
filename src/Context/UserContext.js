import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState()

  useEffect(() => {
    axios.get("http://localhost:4000/user/info", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
      setUser(res.data.userName)
      console.log(res.data.userName)
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BackendURL}/user/info`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => {
        setUser(
          {
            username: res.data.userName,
            userId: res.data.userId,
            firstName: res.data.firstName,
            lastName: res.data.lastName
          }
        )
      })
      .catch(setUser(null))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
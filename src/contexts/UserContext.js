import React, { createContext, useState, useEffect } from "react";
import { apiGet } from "../api/api"; 

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
  const [users, setUsers] = useState([])
  const [couriers, setCouriers] = useState([])

  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchUsers = async (page) => {
      try {
        const data = await apiGet("/users?page="+page);
        return data
      } catch (err) {
        console.error("Failed to fetch users:", err);
        return null;
      }
    };

    const getAllUsers = async () => {

      let data = []
      let lastPage = 1
      let curPage = 1
      while (lastPage && curPage <= lastPage){
  
        let f = await fetchUsers(curPage);
        if (f){
          lastPage = f.data.last_page
          data = [...data, f.data.data]
          curPage++
        }else{
          break;
        }
      }
      setUsers(data.flat())
      setCouriers(data.flat().filter(user => user.roles.includes("courier")))
      setLoading(false)
    }

    getAllUsers()

  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, loading, couriers }}>
      {children}
    </UsersContext.Provider>
  );
};

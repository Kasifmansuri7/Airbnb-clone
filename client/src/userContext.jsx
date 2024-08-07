import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, ready, active, setActive }}>
      {children}
    </UserContext.Provider>
  );
}

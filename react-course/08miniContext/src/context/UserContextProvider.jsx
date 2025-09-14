import React, { useState } from "react";
import UserContext from "./UserContext";

// use context TYPE - 1

//making all aware about the context
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

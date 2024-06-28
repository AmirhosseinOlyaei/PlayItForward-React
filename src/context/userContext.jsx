// src/context/userContext.jsx
import { createContext, useContext } from "react";
const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const getUserContext = () => useContext(UserContext);

export default UserContext;

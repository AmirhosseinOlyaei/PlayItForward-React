// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserContext from "./context/userContext";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

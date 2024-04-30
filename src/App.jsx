// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserContext from "./context/userContext";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setUser(null);
      });
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <Router>
          <Navbar user={user} />
          <AppRoutes />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

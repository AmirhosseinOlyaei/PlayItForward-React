// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import UserContext from "./context/userContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={user}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

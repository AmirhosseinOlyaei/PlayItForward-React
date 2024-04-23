// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import UserContext from "./context/userContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setUser(null);
      });
  }, []);

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

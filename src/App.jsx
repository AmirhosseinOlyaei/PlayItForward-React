import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
// import HomePage from "./HomePage"; // Замените на ваши компоненты страниц
// import MessagesPage from "./MessagesPage";
// import ProfilePage from "./ProfilePage";

const App = () => {
  return (
    <div>
      <NavBar />
    </div>
    // <Router>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<NavBar />} />
    // <Route path="/messages" element={<MessagesPage />} />
    // <Route path="/profile" element={<ProfilePage />} />
    // {/* Добавьте другие маршруты здесь */}
    //   </Routes>
    // </Router>
  );
};

export default App;

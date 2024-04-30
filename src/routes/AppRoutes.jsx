import { Routes, Route, useLocation } from "react-router-dom";
import ToyList from "../components/ToyList";
import LoginPage from "../components/LoginPage";
import MyListings from "../components/UserProfile/MyListings";
import Messages from "../components/Messages";
import CreateListing from "../components/CreateListing";
import PersonalInfo from "../components/UserProfile/PersonalInfo";
import NotFoundPage from "../components/NotFoundPage";
import Favorites from "../components/UserProfile/Favorites/index";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";

const AppRoutes = ({ user }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/toys" element={<ToyList />} />
        <Route path="/toys/:selectedToyId" element={<ToyList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/listings" element={<MyListings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Messages />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/personal" element={<PersonalInfo />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

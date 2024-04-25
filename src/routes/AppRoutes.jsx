import { Routes, Route } from "react-router-dom";
import ToyList from "../components/ToyList";
import ListingDetail from "../components/ListingDetail";
import LoginPage from "../components/LoginPage";
import MyListings from "../components/UserProfile/MyListings";
import Messages from "../components/Messages";
import CreateListing from "../components/CreateListing";
import PersonalInfo from "../components/UserProfile/PersonalInfo";
import NotFoundPage from "../components/NotFoundPage";
import Favorites from "../components/UserProfile/Favorites/index";
import { useContext } from "react";
import UserContext from "../context/userContext";

const AppRoutes = () => {
  const user = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<ToyList />} />
      <Route path="/toys" element={<ToyList />} />
      <Route path="/toys/:id" element={<ListingDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/listings" element={<MyListings />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/messages/:id" element={<Messages />} />
      <Route path="/create" element={<CreateListing />} />
      <Route path="/personal" element={<PersonalInfo />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

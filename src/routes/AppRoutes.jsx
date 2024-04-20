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

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={ToyList} />
      <Route path="/toys" Component={ToyList} />
      <Route path="/toys/:id" Component={ListingDetail} />
      <Route path="/toy-details" Component={ListingDetail} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/listings" Component={MyListings} />
      <Route path="/messages" Component={Messages} />
      <Route path="/create" Component={CreateListing} />
      <Route path="/personal" Component={PersonalInfo} />
      <Route path="/favorites" Component={Favorites} />
      <Route component={NotFoundPage} />
    </Routes>
  );
};

export default AppRoutes;

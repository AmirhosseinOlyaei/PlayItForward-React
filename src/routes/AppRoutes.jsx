import { Routes, Route } from "react-router-dom";
import ToyList from "../components/ToyList";
import ListingDetail from "../components/ListingDetail";
import LoginPage from "../components/LoginPage";
import UserProfile from "../components/UserProfile";
import Messages from "../components/Messages";
import CreateListing from "../components/CreateListing";
import NotFoundPage from "../components/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={ToyList} />
      <Route path="/toys" Component={ToyList} />
      <Route path="/toy-details" Component={ListingDetail} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/profile" Component={UserProfile} />
      <Route path="/messages" Component={Messages} />
      <Route path="/create" Component={CreateListing} />
      <Route component={NotFoundPage} />
    </Routes>
  );
};

export default AppRoutes;

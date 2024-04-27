import React, { useState, useEffect, useContext } from "react";
import styles from "./UserProfile.module.css";
import IconMenu from "../IconMenu";
import EditIcon from "@mui/icons-material/Edit";
import {
  AppBar,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteCard from "./FavoriteCard";
import UserContext from "../../../context/userContext";

const Favorites = () => {
  const user = useContext(UserContext);
  const currentUserId = user ? user._id : "";

  const [favoriteToys, setFavoriteToys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getFavToys() {
      if (user && user._id) {
        try {
          // Fetch favorite toys list from /favorites endpoint
          const response = await fetch(`${apiUrl}/favorites/${currentUserId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch favorite toys");
          }
          const favToys = await response.json();
          setFavoriteToys(favToys);

          console.log("setFavoriteToys", favToys);
          // Set loading state
          setIsLoading(false);
        } catch (error) {
          console.error("Error while receiving data:", error);
        }
      }
    }
    // Run getFavToys when dependencies (apiUrl, currentUserId) change
    getFavToys();
  }, [apiUrl, currentUserId]);

  // Run getFavToys when dependencies (apiUrl, currentUserId) change

  console.log("LIST", favoriteToys);

  // Delete toy from favorites
  const deleteFromFavorite = async (favoriteId) => {
    const response = await fetch(`${apiUrl}/favorites/${favoriteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete favorite toy");
    }
    const favToyToDelete = await response.json();
    console.log("Deleted toy:", favToyToDelete);
    setFavoriteToys(favoriteToys.filter((toy) => toy._id !== favoriteId));
  };

  // Sort toys by created date in descending order
  const sortedToys = favoriteToys
    .slice()
    .sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
      <IconMenu activeTab="1" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
        <br />
        <br />
        <Typography variant="h4">My Favorites</Typography>

        {isLoading ? (
          // Display loading indicator while data is being fetched
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="200px" // Adjust the height as needed
          >
            <CircularProgress sx={{ mt: 5 }} />
          </Box>
        ) : sortedToys.length > 0 ? (
          <div>
            {sortedToys.map((favToy) => (
              <FavoriteCard
                toy={favToy.toy_listing_id}
                key={favToy._id}
                favToyId={favToy._id}
                toyId={favToy.toy_listing_id._id}
                deleteFromFavorite={deleteFromFavorite}
              />
            ))}
          </div>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;

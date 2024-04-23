import React, { useState, useEffect, useRef } from "react";
import styles from "./UserProfile.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import IconMenu from "./IconMenu";
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
import axios from "axios";

const Favorites = () => {
  const currentUserId = "6609a2873eaffef95345b9fa";

  const [favoriteToys, setFavoriteToys] = useState([]);
  const [favToysList, setFavToysList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredFavToysByUser, setFilteredFavToysByUser] = useState([]);
  // const [favoriteToys]

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getFavToys() {
      try {
        // Fetch favorite toys list from /favorites endpoint
        const response = await fetch(`${apiUrl}/favorites`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite toys");
        }
        const favToys = await response.json();
        setFavoriteToys(favToys);

        console.log("Fetched favorite toys", favToys);

        // Filter favorite toys by current user
        const filteredFavToysByUser = favToys.filter(
          (toy) => toy.user_id === currentUserId
        );

        setFilteredFavToysByUser(filteredFavToysByUser);

        // Set state with filtered favorite toys

        console.log(
          "Filtered favorite toys by current user",
          filteredFavToysByUser
        );

        // Extract toy IDs from filteredFavToysByUser
        const toyIDs = filteredFavToysByUser.map((toy) => toy.toy_listing_id);
        console.log("Toy IDs", toyIDs);

        // Fetch toys using the IDs
        const toyFetchPromises = toyIDs.map(async (toyId) => {
          const toyResponse = await fetch(`${apiUrl}/toys/${toyId}`);

          if (!toyResponse.ok) {
            throw new Error(`Failed to fetch toy with ID ${toyId}`);
          }
          return toyResponse.json();
        });
        const toyResponses = await Promise.all(toyFetchPromises);
        console.log("Fetched toys", toyResponses);
        // Set state with the fetched toys
        //setFavToysList((prevList) => [...prevList, ...toyResponses]);
        setFavToysList(toyResponses);
      } catch (error) {
        console.error("Error while receiving data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    // Run getFavToys when dependencies (apiUrl, currentUserId) change
    getFavToys();
  }, [apiUrl, currentUserId]);

  console.log("LIST", favToysList);

  // Delete toy from favorites
  const deleteFromFavorite = async (favoriteId) => {
    try {
      const filteredToy = filteredFavToysByUser.filter(
        (toy) => toy.toy_listing_id === favoriteId
      );
      console.log("Filtered toy:", filteredToy);

      // Delete toy from favorites
      await axios.delete(`${apiUrl}/favorites/${filteredToy[0]._id}`);
      console.log("Deleted favorite with ID:", favoriteId);
      setFavToysList((prevList) =>
        prevList.filter((toy) => toy._id !== favoriteId)
      );
    } catch (error) {
      console.error("Error while deleting toy:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
      <IconMenu />
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
        ) : favToysList.length > 0 ? (
          <div>
            {favToysList.map((toy) => (
              <FavoriteCard
                toy={toy}
                key={toy._id}
                toyId={toy._id}
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

export default Favorites; // FavoritesPage;

import React, { useState, useEffect, useContext } from "react";
import styles from "./UserProfile.module.css";
import Grid from "@mui/material/Unstable_Grid2";
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
import axios from "axios";
import UserContext from "../../../context/userContext";

const Favorites = () => {
  const user = useContext(UserContext);
  const currentUserId = user ? user._id : "";

  const [favoriteToys, setFavoriteToys] = useState([]);
  //const [favToysList, setFavToysList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [filteredFavToysByUser, setFilteredFavToysByUser] = useState([]);
  // const [favoriteToys]

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getFavToys() {
      try {
        // Fetch favorite toys list from /favorites endpoint
        const response = await fetch(`${apiUrl}/favorites/${currentUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite toys");
        }
        const favToys = await response.json();

        // // Filter favorite toys by current user
        // const filteredFavToysByUser = favToys.filter(
        //   (toy) => toy.user_id === currentUserId
        // );

        // setFilteredFavToysByUser(filteredFavToysByUser);

        // Set state with filtered favorite toys

        // console.log(
        //   "Filtered favorite toys by current user",
        //   filteredFavToysByUser
        // );

        // // Extract toy IDs from filteredFavToysByUser
        // const toyIDs = favToys.map((toy) => toy.toy_listing_id._id);
        // console.log("Toy IDs", toyIDs);

        // // Fetch toys using the IDs
        // const toyFetchPromises = toyIDs.map(async (toyId) => {
        //   const toyResponse = await fetch(`${apiUrl}/toys/${toyId}`);

        //   if (!toyResponse.ok) {
        //     throw new Error(`Failed to fetch toy with ID ${toyId}`);
        //   }
        //   return toyResponse.json();
        // });
        // const toyResponses = await Promise.all(toyFetchPromises);
        // console.log("Fetched toys", toyResponses);
        // // Set state with the fetched toys
        // //setFavToysList((prevList) => [...prevList, ...toyResponses]);

        // setFavoriteToys(toyResponses);
        setFavoriteToys(favToys);

        console.log("setFavoriteToys", favToys);

        // Set loading state
        setIsLoading(false);
      } catch (error) {
        console.error("Error while receiving data:", error);
      }
    }
    // Run getFavToys when dependencies (apiUrl, currentUserId) change
    getFavToys();
  }, [apiUrl, currentUserId]);

  // Run getFavToys when dependencies (apiUrl, currentUserId) change

  console.log("LIST", favoriteToys);

  // Delete toy from favorites
  const deleteFromFavorite = async (favoriteId) => {
    try {
      const favToyToDelete = favoriteToys.find((toy) => toy._id === favoriteId);
      console.log("Deleted toy:", favToyToDelete);
      const response = await fetch(`${apiUrl}/favorites/${favoriteId}`, {
        method: "DELETE",
      });
      // const response = axios.delete(`${apiUrl}/favorites/${favoriteId}`);
      // if (!response.ok) {
      //   throw new Error("Failed to delete favorite toy");
      // }
      // const favToyToDelete = await response.json();
      // console.log("Deleted toy:", favToyToDelete);

      // });

      // };
      // await axios.delete(`${apiUrl}/favorites/${favToyToDelete.favorite_Id}`);
      // await axios.delete(`${apiUrl}/favorites/${favoriteId}`);

      // const filteredToy = favToysList.filter((toy) => toy._id === favoriteId);
      // console.log("Filtered toy:", filteredToy);

      // Delete toy from favorites
      //await axios.delete(`${apiUrl}/favorites/${filteredToy[0]._id}`);
      console.log("Deleted favorite with ID:", favoriteId);
      setFavoriteToys((prevList) =>
        prevList.filter((favToy) => favToy._id !== favToy.toy_listing_id._id)
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
        ) : favoriteToys.length > 0 ? (
          <div>
            {favoriteToys.map((favToy) => (
              <FavoriteCard
                toy={favToy.toy_listing_id}
                key={favToy._id}
                favToyId={favToy._id}
                toyId={favToy.toy_listing_id._id}
                deleteFromFavorite={deleteFromFavorite}
                //favId={toy._id}
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

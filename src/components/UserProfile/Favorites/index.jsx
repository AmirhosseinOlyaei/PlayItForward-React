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
} from "@mui/material";
import ToyCard from "../../ToyList/ToyCard";

const Favorites = (user) => {
  const [delivery, setDelivery] = useState("All");
  const [favoriteToys, setFavoriteToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [toy, setToy] = useState(null);
  const [favToysList, setFavToysList] = useState([]);
  const currentUserId = user && user.user ? user.user._id : "";

  const initialized = useRef(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!initialized.current) {
      async function fetchData() {
        try {
          const response = await fetch(`${apiUrl}/favorites`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const favToys = await response.json();
          setFavoriteToys(favToys);
        } catch (error) {
          console.error("Error while receiving data:", error);
        }
      }
      fetchData();
    }
  }, []);
  console.log("toy", favoriteToys);

  useEffect(() => {
    async function getToyById() {
      try {
        favoriteToys.map(async function (toy) {
          const response = await fetch(`${apiUrl}/toys/${toy.toy_listing_id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const t = await response.json();
          setFavToysList((favToysList) => [...favToysList, t]);
        });
      } catch (error) {
        console.error("Error while receiving data:", error);
      }
    }
    getToyById();
  }, [favoriteToys]);

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
        <p>This is the page where users can view favorite toy listings.</p>
        {favToysList.length > 0 ? (
          <ul>
            {favToysList.map((toy, index) => (
              <li key={index}>
                <ToyCard
                  title={toy.title}
                  location={toy.zip_code}
                  toyId={toy._id}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </Box>
    </Box>
  );
};

export default Favorites; // FavoritesPage;

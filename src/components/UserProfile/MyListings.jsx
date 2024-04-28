import UserContext from "../../context/userContext";
import styles from "./UserProfile.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import IconMenu from "./IconMenu";
import {
  Avatar,
  Button,
  Divider,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import ImgMediaCard from "./oneLising";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const MyListings = () => {
  const user = useContext(UserContext);
  const currentUserId = user && user ? user._id : "";

  const apiUrl = import.meta.env.VITE_API_URL;

  const [toys, setToys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToysByUser = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(
            `${apiUrl}/toys/user/${currentUserId}`
          );

          setToys(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching toys", error);
        }
      }
    };
    fetchToysByUser();
  }, [currentUserId]);

  console.log("toys", toys);
  // Sort toys by created date in descending order
  const sortedToys = toys
    .slice()
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
      <IconMenu activeTab="0" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 12 }}>
        {/* <ImgMediaCard /> */}

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
          <Box sx={{ flexGrow: 1 }}>
            {sortedToys.map((toy) => {
              return (
                <ImgMediaCard
                  toy={toy}
                  key={toy._id}
                  toys={toys}
                  setToys={setToys}
                  toyId={toy._id}
                />
              );
            })}
          </Box>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </Box>
    </Box>
  );
};

export default MyListings;

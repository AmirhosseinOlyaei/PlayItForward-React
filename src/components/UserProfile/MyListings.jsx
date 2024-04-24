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
} from "@mui/material";
import ImgMediaCard from "./oneLising";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";

const MyListings = () => {
  const user = useContext(UserContext);
  const currentUserId = user._id;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [toys, setToys] = useState([]);
  useEffect(() => {
    const fetchToysByUser = async () => {
      //setCurrentUserId("6609a2873eaffef95345b9fb");
      try {
        const response = await axios.get(
          // `http://localhost:8000/api/v1/toys?requester=${currentUserId}`
          `${apiUrl}/toys?requester=${currentUserId}`
        );
        setToys(response.data);
      } catch (error) {
        console.error("Error fetching toys", error);
      }
    };
    fetchToysByUser();
  }, [currentUserId]);

  console.log("toys", toys);
  const filteredToys = toys.filter((toy) => toy.listed_by_id);
  const filteredToysByUser = filteredToys.filter(
    (toy) => toy.listed_by_id._id === currentUserId
  );

  console.log("filteredToys", filteredToys);
  console.log("filteredToysByUser", filteredToysByUser);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
      <IconMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 12 }}>
        {/* <ImgMediaCard /> */}

        {filteredToysByUser.map((toy) => {
          return (
            <ImgMediaCard
              toy={toy}
              key={toy._id}
              toys={toys}
              setToys={setToys}
              // url={`/toys/${toy._id}`}
              //handleOptionSelect={handleOptionSelect}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MyListings;

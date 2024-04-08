import React from "react";
import styles from "./ListingDetail.module.css";
import { Button, ButtonGroup, Typography, Box, Divider, Icon, Avatar } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import MailIcon from '@mui/icons-material/Mail';
import Bookmark from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ActionButton from "../UserProfile/ActionButton";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useState } from "react";
//import GoogleMaps from "../ToyList/GoogleMaps";


const drawerWidth = 340;

const ListingDetail = () => {


  const [toyListing, setToyListing] = useState([]);
  const [toyGiver, setToyGiver] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messageSent, setMessageSent] = useState([]);

  React.useEffect(() => {
    async function fetchToy(toyId) {
      const response = await fetch(`http://localhost:8000/api/v1/toys/${toyId}`);
      const toy = await response.json();
      setToyListing(toy);
      fetchToyGiver(toy.listed_by_id);
    }
    async function fetchToyGiver(userId) {
      const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
      const user = await response.json();
      setToyGiver(user);
    }
    fetchToy("660c4de20dab29b8bab994f9"); // Replace with the ID of the toy you want to fetch
  }, []);
  
  function calculateDate(date) {
    const today = new Date();
    const todayDate = Date.parse(today);
    const toyDate = Date.parse(date);
    const daysAgo = Math.round((todayDate - toyDate) / (1000 * 60 * 60 * 24));
    return daysAgo
    
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    console.log(toyListing._id);
    const fav = {
      toy_listing_id: toyListing._id,
      user_id: "6609a2873eaffef95345b9fa", // Replace with the ID of the user who is logged in
    };
    addFavorite(fav);
  }

  async function addFavorite(fav) {
    const response = await fetch("http://localhost:8000/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fav),
    });

    setFavorites(await response.json());
  }

  async function addFavorite(fav) {
    const response = await fetch(`http://localhost:8000/api/v1/favorites/${fav._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setFavorites({});
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, BoxSizing: 'border-Box', marginTop: "86px" },
        }}
      >
        
        <Box sx={{ overflow: 'auto', padding: "0px 20px" }}>
          
            <Box sx={{ padding: "20px 0" }}>
            <Typography variant="h4" sx={{ margin: "5px 0" }}>{toyListing.title}</Typography>
            
              <Typography variant="body" paragraph>Listed {calculateDate(toyListing.create_date)} days ago in {toyListing.zip_code} </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: "80%"}}>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}><HomeOutlinedIcon sx={{ fontSize: 32 }}/><b style={{ marginLeft: "10px" }}>{toyListing.delivery_method}</b></Typography>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}><LocalShippingOutlinedIcon sx={{ fontSize: 32 }}/><b style={{  marginLeft: "10px" }}>{toyListing.delivery_method}</b></Typography>
            </Box>
            <Grid xs={12} sx={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
              <ActionButton linkTo="/messages" text="Message" startIcon={<MailIcon/>} fullWidth={false}/>
              <ActionButton linkTo="" text="" startIcon={<Bookmark/>} fullWidth={false} onClick={handleFavorite}/>
              <ActionButton linkTo="" text="" startIcon={<ShareIcon/>} fullWidth={false}/>
            </Grid>
            </Box>
            <Divider/>
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>Details</Typography>
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}><Typography variant="body"><b>Category</b></Typography></div>
                  <div><Typography variant="body">{toyListing.category}</Typography></div>
                </div>
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}><Typography variant="body"><b>Condition</b></Typography></div>
                  <div><Typography variant="body">{toyListing.condition}</Typography></div>
                </div>
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}><Typography variant="body"><b>Description</b></Typography></div>  
                  <div><Typography variant="body">{toyListing.description}</Typography></div>
                </div>
            </Box>
            <Divider/>
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>Toy giver information</Typography>
                <Box className={styles.giverInformation}>
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Toy giver profile picture" width="42px" height="42px" />
                  <Typography variant="body" sx={{ marginLeft: "10px", lineHeight: "42px" }}>{toyGiver.nickname}</Typography>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="body">
                    <Avatar src="/AppLogo.png" alt="AppLogo" sx={{ width: 30, height: 30, display: "inline-block", verticalAlign: "middle" }}/>
                     Joined <b>PlayItForward</b> in {dateStringToMonthYear(toyGiver.create_date)}
                  </Typography>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>Send a message</Typography>
              <TextField id="outlined-basic" label="Is this still available?" variant="outlined" sx={{ width: "100%" }} />
              <br/>
              <ActionButton linkTo="" text="Send" startIcon={<MailIcon/>} fullWidth={true}/> 
            </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,  mt: 12 }}>
        <img src="https://geekculture.co/wp-content/uploads/2020/05/tigermiyaw-8-1200x817.jpg" alt="Toy image" width="100%" />
      </Box>
    </Box>
  );
};

export function dateStringToMonthYear(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default ListingDetail;

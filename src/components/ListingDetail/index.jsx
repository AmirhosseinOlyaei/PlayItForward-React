import React, { useEffect } from "react";
import styles from "./ListingDetail.module.css";
import { Typography, Box, Divider, Avatar, Popover, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ActionButton from "../UserProfile/ActionButton";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToyMap from "./ToyMap";



const apiUrl = import.meta.env.VITE_API_URL
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const drawerWidth = 340;
const toyListingId = "66196e990925b15c9b3c4375"; // Replace with the ID of the toy listing, which comes from the URL
const authorizedUser = "6609a2873eaffef95345b9fa"; // Replace with the ID of the user who is logged in

const ListingDetail = () => {


  const [toyListing, setToyListing] = useState([]);
  const [toyGiver, setToyGiver] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newMessage, setNewMessage] = useState("Is this still available?");
  const [messageSent, setMessageSent] = useState([]);



  React.useEffect(() => {
    async function fetchToy(toyId) {
      const response = await fetch(`${apiUrl}/toys/${toyId}`);
      const toy = await response.json();
      setToyListing(toy);
      fetchToyGiver(toy.listed_by_id._id); // User id of the toy owner
      checkFavorite(authorizedUser, toyListingId); // Check if the user has favorited the toy. Parameters: (userId, toyId)
    }
    async function fetchToyGiver(userId) {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const user = await response.json();
      setToyGiver(user);
    }
    async function checkFavorite (userId, toyId) {
      const response = await fetch(`${apiUrl}/favorites/check-favorite/${userId}/${toyId}`);
      const favoriteCheck = await response.json();
      setIsFavorite(favoriteCheck);
    }
    fetchToy(toyListingId); // Replace with the ID of the toy you want to fetch
  }, []);
  
  function calculateDate(date) {
    const today = new Date();
    const todayDate = Date.parse(today);
    const toyDate = Date.parse(date);
    const daysAgo = Math.round((todayDate - toyDate) / (1000 * 60 * 60 * 24));
    return daysAgo
    
  }

  const handleFavorite = () => {
    const fav = {
      toy_listing_id: toyListingId,
      user_id: authorizedUser, // Replace with the ID of the user who is logged in
    };
    isFavorite ? deleteFavorite(fav) : addFavorite(fav);
    setIsFavorite(!isFavorite);
  }

  async function addFavorite(fav) {
    const response = await fetch(`${apiUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fav),
    });
    console.log("The toy is added", toyListing._id );
  }

  async function deleteFavorite(fav) {
    const response = await fetch(`${apiUrl}/favorites/${toyListing._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Deleted from favorites", toyListing._id );
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = async () => {
    try {
      const response = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id_from: authorizedUser,
          user_id_to: toy.listed_by_id._id,
          toy_listing_id: toyListingId,
          date: new Date().toISOString(),
          subject: "Toy subject",
          content: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setNewMessage("Is this still available?");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 3000);
    }
  }, [isOpen]);
  
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
            
              <Typography variant="body" paragraph>Listed {calculateDate(toyListing.created_date)} days ago in {toyListing.zip_code} </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: "80%"}}>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                {toyListing.delivery_method == "Delivery" ? (<HomeOutlinedIcon sx={{ fontSize: 32 }}/>) : 
                (<LocalShippingOutlinedIcon sx={{ fontSize: 32 }}/>)
                }
                <b style={{ marginLeft: "10px" }}>{toyListing.delivery_method}</b>
              </Typography>
 
            </Box>
            <Grid xs={12} sx={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
              <ActionButton link={`/messages?id=${toyListingId}`}  text="&nbsp;Message" startIcon={<MailIcon/>} fullWidth={false}/>
              <ActionButton link="" text="" startIcon={isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>} fullWidth={false} onClick={handleFavorite}/>
              <CopyToClipboard text={`${apiUrl}/toy_details?id=${toyListingId}`} onCopy={() => setIsOpen(true)}> 
                <ActionButton text="" startIcon={<ShareIcon/>} fullWidth={false} onClick={(event) => setAnchorEl(event.currentTarget)}/>
              </CopyToClipboard>
              <Popover
                  open={isOpen}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  anchorEl = {anchorEl}
                  > 
                    <Typography sx={{ p: 2 }}>The link is copied to clipboard.</Typography>
              </Popover>
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
            <Box sx={{ padding: "20px 0" }}>

                  <ToyMap />

            </Box>
            <Divider/>
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>Posted by</Typography>
                <Box className={styles.giverInformation}>
                  <img src={toyGiver.profile_picture} alt="Toy giver profile picture" width="42px" height="42px" />
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
              <TextField id="outlined-basic" onChange={handleMessageChange} value={newMessage} variant="outlined" sx={{ width: "100%" }} />
              <br/>
              <ActionButton linkTo="" text="&nbsp;Send" startIcon={<MailIcon/>} onClick={async () => await handleSendMessage()} fullWidth={true}/> 
            </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,  mt: 12 }}>
        <img src={toyListing.imageUrl} alt="Toy image" width="100%" />
      </Box>
    </Box>
  );
};

export function dateStringToMonthYear(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default ListingDetail;   
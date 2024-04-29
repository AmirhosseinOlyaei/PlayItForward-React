import React, { useContext, useEffect } from "react";
import styles from "./ListingDetail.module.css";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  Popover,
  TextField,
  Dialog,
  Rating,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import MailIcon from "@mui/icons-material/Mail";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ActionButton from "../UserProfile/ActionButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ToyMap from "./ToyMap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserContext from "../../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import LettersAvatar from "./LettersAvatar";
import Slide from "@mui/material/Slide";
import { Navigate } from "react-router-dom";
import LoginAlert from "./LoginAlert";


const apiUrl = import.meta.env.VITE_API_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const drawerWidth = 340;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListingDetail = ({ id, onClose }) => {
  const user = useContext(UserContext);
  const authorizedUser = user ? user._id : "";
  const authorizedUserNickName = user ? user.nickname : "";

  // const { id } = useParams();
  // const user = useContext(UserContext);
  const [toyListing, setToyListing] = useState({});
  const [toyGiver, setToyGiver] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [newMessage, setNewMessage] = useState("Hello! I am interested.");
  const [averageStars, setAverageStars] = useState({});

  React.useEffect(() => {
    async function checkFavorite(userId, toyId) {
      const response = await fetch(
        `${apiUrl}/favorites/check-favorite/${userId}/${toyId}`
      );
      const favoriteCheck = await response.json();
      setIsFavorite(favoriteCheck.isFavorite);
      if (favoriteCheck.isFavorite) {
        setFavoriteId(favoriteCheck.favorite_Id);
      }
    }

    if (authorizedUser !== "") checkFavorite(authorizedUser, id); // Check if the user has favorited the toy. Parameters: (userId, toyId)
  }, [authorizedUser]);

  React.useEffect(() => {
    async function fetchToy(toyId) {
      const response = await fetch(`${apiUrl}/toys/${toyId}`);
      const toy = await response.json();
      setToyListing(toy);
      fetchToyGiver(toy.listed_by_id._id); // User id of the toy owner
      fetchAverageStars(toy.listed_by_id._id);
    }

    async function fetchAverageStars(userId) {
      try {
        const response = await fetch(`${apiUrl}/stars/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch average stars: " + response.status);
        }
        const stars = await response.json();

        setAverageStars(stars[0].averageStars);
        console.log(
          "Average stars for user",
          userId,
          ":",
          stars[0].averageStars
        );
      } catch (error) {
        console.error("Error fetching average stars:", error);
      }
    }

    async function fetchToyGiver(userId) {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const user = await response.json();
      setToyGiver(user);
    }

    fetchToy(id);
  }, []);

  function calculateDate(date) {
    const today = new Date();
    const todayDate = Date.parse(today);
    const toyDate = Date.parse(date);
    const daysAgo = Math.round((todayDate - toyDate) / (1000 * 60 * 60 * 24));
    return daysAgo;
  }

  const handleFavorite = () => {
    const fav = {
      toy_listing_id: id,
      user_id: authorizedUser, // Replace with the ID of the user who is logged in
    };

    isFavorite ? deleteFavorite(favoriteId) : addFavorite(fav);
    setIsFavorite(!isFavorite); // Update the state with the new value of isFavorite);
  };

  async function addFavorite(fav) {
    const response = await fetch(`${apiUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fav),
    });
  }

  async function deleteFavorite(favId) {
    const response = await fetch(`${apiUrl}/favorites/${favId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    console.log(id, toyListing.listed_by_id._id);
    try {
      const response = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id_from: authorizedUser,
          user_id_to: toyListing.listed_by_id._id,
          toy_listing_id: id,
          date: new Date().toISOString(),
          subject: toyListing.title,
          content: authorizedUserNickName + ": " + newMessage,
        }),
      });
      toast.success("Message sent successfully");
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setNewMessage("Hello! I am interested.");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
    }
    setMessageSent(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 3000);
    }
  }, [isOpen]);

  const [mapPosition, setMapPosition] = useState({
    lat: null,
    lng: null,
    city: "",
    state: "",
  });

  // Fetch map position
  useEffect(() => {
    if (!toyListing.zip_code) {
      return;
    }
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${toyListing.zip_code}|country:us&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
        const city = data.results[0].address_components[1].long_name;
        const state = data.results[0].address_components[3].long_name;
        const latitude = location.lat;
        const longitude = location.lng;
        setMapPosition({
          lat: latitude,
          lng: longitude,
          city: city,
          state: state,
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [toyListing]);

   const [alertOpen, setAlertOpen] = React.useState(false);
   const handleMessage = () => {
    //Navigate(`/messages/${id}`) 
    // setAlertOpen(true);
}

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Toaster />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        ></AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              BoxSizing: "border-Box",
              marginTop: "0px",
            },
          }}
        >
          <Box sx={{ overflow: "auto", padding: "0px 20px" }} marginTop={2}>
            <ActionButton
              link=""
              text="&nbsp;Back to Catalogue"
              startIcon={<ArrowBackIcon />}
              onClick={onClose}
              fullWidth
            />
            <Box sx={{ padding: "10px 0" }}>
              <Box mb={2}> 
              {toyListing.status === "reserved" && 
                <Chip 
                  label="Reserved" 
                  sx={{ 
                    backgroundColor:"red", 
                    color:"white", 
                    margin: "10px 10px 0 0", 
                    padding: "0px 10px",
                    textWrap: "wrap",
                    }}/>
              }
              </Box>
                <Typography variant="h4" sx={{ margin: "5px 0" }}>
                {toyListing.title}
                </Typography>
              
              <Typography variant="body" paragraph>
                Listed {calculateDate(toyListing.created_date)} days ago in{" "}
                {mapPosition.city}, {mapPosition.state}{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "80%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {toyListing.delivery_method === "Delivery" ? (
                    <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />
                  ) : (
                    <HomeOutlinedIcon sx={{ fontSize: 32 }} />
                  )}
                  <b style={{ marginLeft: "10px" }}>
                    {toyListing.delivery_method}
                  </b>
                </Typography>
              </Box>
              <Grid
                xs={12}
                sx={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {authorizedUser !== toyListing.listed_by_id?._id ? (
                  <>
                    <ActionButton
                      link={ user ? `/messages/${id}` : "/login"}
                      // onClick={handleMessage}
                      text="&nbsp;Message"
                      startIcon={<MailIcon />}
                      fullWidth={false}
                      btnWidth={user? "auto" : "210px"}
                    />
                    
                    {user && <ActionButton
                      link=""
                      text=""
                      startIcon={
                        isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                      }
                      fullWidth={false}
                      onClick={handleFavorite}
                    />}
                  </>
                ) : (
                  <ActionButton link={`/create?id=${id}`} text={"Edit"} btnWidth={"210px"}  />
                )}
                <CopyToClipboard
                  text={`${window.location.origin}/toys/${id}`}
                  onCopy={() => toast.success("Link copied to clipboard")}
                >
                  <ActionButton
                    text=""
                    startIcon={<ShareIcon />}
                    fullWidth={false}
                    // onClick={(event) => setAnchorEl(event.currentTarget)}
                  />
                </CopyToClipboard>
                <Popover
                  open={isOpen}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorEl={anchorEl}
                >
                  <Typography sx={{ p: 2 }}>
                    The link is copied to clipboard.
                  </Typography>
                </Popover>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>
                Details
              </Typography>
              <div className={styles.detailsRow}>
                <div className={styles.detailsLabel}>
                  <Typography variant="body">
                    <b>Category</b>
                  </Typography>
                </div>
                <div>
                  <Typography variant="body">{toyListing.category}</Typography>
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.detailsLabel}>
                  <Typography variant="body">
                    <b>Condition</b>
                  </Typography>
                </div>
                <div>
                  <Typography variant="body">{toyListing.condition}</Typography>
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.detailsLabel}>
                  <Typography variant="body">
                    <b>Description</b>
                  </Typography><br/>
                  <Typography variant="body">
                    {toyListing.description}
                  </Typography>
                </div>
                {/* <div>
                  
                </div> */}
              </div>
            </Box>
            <Box sx={{ padding: "20px 0" }}>
              {mapPosition.lat && (
                <ToyMap lat={mapPosition.lat} lng={mapPosition.lng} />
              )}
              <Typography variant="body" sx={{ lineHeight: "42px", fontWeight: "bold" }}>
                {mapPosition.city}, {mapPosition.state}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ padding: "20px 0" }}>
              <Typography variant="h6" sx={{ margin: "5px 0" }}>
                Posted by
              </Typography>
              <Box className={styles.giverInformation}>
                {toyGiver.profile_picture ? (
                  <Avatar
                  src={toyGiver.profile_picture}
                  variant="rounded"
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                  alt="profile picture"
                />
                ) : (
                  toyGiver.first_name && toyGiver.last_name && (
                    <LettersAvatar
                      style = {{marginLeft: '10px', width: '70px', height: '70px', fontSize: '40px'}}
                      firstName={toyGiver.first_name}
                      lastName={toyGiver.last_name}
                    />
                  ) 
                )
                
                }
                <div>
                  <Typography
                    variant="body"
                    sx={{ marginLeft: "15px", lineHeight: "42px", fontWeight: "bold" }}
                  >
                    {toyGiver.nickname}
                  </Typography>
                  <Typography>
                    <Rating
                      name="read-only"
                      value={averageStars}
                      precision={0.5}
                      readOnly
                      sx={{ marginLeft: "15px" }}
                    />
                  </Typography>
                </div>
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body">
                  <Avatar
                    src="/AppLogo.png"
                    alt="AppLogo"
                    sx={{
                      width: 30,
                      height: 30,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                  Joined <b>PlayItForward</b> in{" "}
                  {dateStringToMonthYear(toyGiver.modified_date)}
                </Typography>
              </Box>
            </Box>
            <Divider />
            {user && (
              <Box sx={{ padding: "20px 0" }}>
                <Typography variant="h6" sx={{ margin: "5px 0" }}>
                  Send a message
                </Typography>
                <TextField
                  id="outlined-basic"
                  onChange={handleMessageChange}
                  value={newMessage}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  disabled={authorizedUser === toyListing.listed_by_id?._id}
                />
                <br />
                <ActionButton
                  linkTo=""
                  text="&nbsp;Send"
                  startIcon={<MailIcon />}
                  onClick={async () => {
                    await handleSendMessage();
                  }}
                  fullWidth={true}
                  disabled={authorizedUser === toyListing.listed_by_id?._id}
                />
              </Box>
            )}
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 0, textAlign: "center" }} >
          {/* <img src={toyListing.imageUrl} alt="Toy image" style={{ width: "100%", height: "calc(100vh - 60px)", objectFit: "cover"}} /> */}
          {/* <img src={toyListing.imageUrl} alt="Toy image" style={{ width: "auto", height: "calc(100vh - 60px)"}} /> */}
          <img src={toyListing.imageUrl} alt="Toy image" style={{ width: "100%", objectFit: "cover"}} />
          </Box>
      </Box>
    </Dialog>
  );
};

export function dateStringToMonthYear(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
export default ListingDetail;

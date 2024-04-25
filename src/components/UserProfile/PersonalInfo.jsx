import styles from "./UserProfile.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import IconMenu from "./IconMenu";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ImgMediaCard from "./oneLising";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import React, { useContext } from "react";
import { dateStringToMonthYear } from "../ListingDetail";
import DoneIcon from "@mui/icons-material/Done";
import UserContext from "../../context/userContext";
import BackgroundLetterAvatars from "../Messages/Avatar";

const apiUrl = import.meta.env.VITE_API_URL;

const PersonalInfo = () => {
  const user = useContext(UserContext);
  const [userSignedIn, setUserSignedIn] = React.useState({});
  const [editNickNameMode, setEditNickNameMode] = React.useState(false);
  const [newNickname, setNewNickname] = React.useState(userSignedIn.nickname);
  const currentUserId = user && user ? user._id : "";

  React.useEffect(() => {
    async function fetchUser(userId) {
      const response = await fetch(`${apiUrl}/users/${userId}`);
      const user = await response.json();
      setUserSignedIn(user);
      setNewNickname(user.nickname);
    }
    fetchUser(currentUserId);
  }, [currentUserId]);

  const handleEditNickName = () => {
    setEditNickNameMode(true);
  };

  const handleSaveNickName = () => {
    setEditNickNameMode(false);
    updateNickname(newNickname);
  };

  

  async function updateNickname(newNickname) {
    const response = await fetch(`${apiUrl}/users/${currentUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: newNickname,
      }),
    });
    const updatedUser = await response.json();
    setUserSignedIn(updatedUser);
  }

console.log("userSignedIn.created_date", userSignedIn.modified_date);

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(firstName, lastName) {
  const name = `${firstName} ${lastName}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

 function BackgroundLetterAvatarsBigger ({ firstName, lastName }) {
  return (
    <>
      <Avatar {...stringAvatar(firstName, lastName)} style={{ width: 150, height: 150, borderRadius: 75, fontSize: 60 }}/>
    </>
  );
}


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
      <IconMenu activeTab="3" />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 12 }}>
        <div className={styles.userProfile}>
          <div>
            <Typography variant="h3">
              {userSignedIn.first_name} {userSignedIn.last_name}
            </Typography>
            <p>
              <Typography variant="body">
                Joined <b>PlayItForward</b> in{" "}
                {dateStringToMonthYear(userSignedIn.modified_date)}
              </Typography>
            </p>
            <p>
              <Typography variant="body">
                Nickname: {" "}
                {editNickNameMode ? (
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                ) : (
                  userSignedIn.nickname
                )}{" "}
                &nbsp; &nbsp;
                {editNickNameMode ? (
                  <IconButton
                    aria-label="save"
                    size="small"
                    onClick={handleSaveNickName}
                  >
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={handleEditNickName}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Typography>
            </p>

            <p>
              <Typography variant="body">
                E-mail: {userSignedIn.email}
              </Typography>
            </p>
            
          </div>
          <div className={styles.avatar}>

            {userSignedIn.profile_picture ? (
              <Avatar
              src={userSignedIn.profile_picture}
              variant="rounded"
              style={{ width: 150, height: 150, borderRadius: 75 }}
              alt="profile picture"
            />
              ) : ( 
              userSignedIn.first_name && userSignedIn.last_name ? (
                <BackgroundLetterAvatarsBigger 
                  firstName={userSignedIn.first_name} 
                  lastName={userSignedIn.last_name} 
                  />
              ) : null 
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PersonalInfo;

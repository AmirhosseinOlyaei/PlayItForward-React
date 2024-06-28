import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import IconMenu from "./IconMenu";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Typography, IconButton, Box, Rating } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import { dateStringToMonthYear } from "../ListingDetail";
import DoneIcon from "@mui/icons-material/Done";
import { getUserContext } from "../../context/userContext";

const apiUrl = import.meta.env.VITE_API_URL;

const PersonalInfo = () => {
  const { user, setUser } = getUserContext();
  const [editNickNameMode, setEditNickNameMode] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [averageStars, setAverageStars] = useState(0);
  const currentUserId = user ? user._id : "";

  useEffect(() => {
    async function fetchAverageStars(userId) {
      try {
        const response = await fetch(`${apiUrl}/stars/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch average stars: " + response.status);
        }
        const stars = await response.json();

        setAverageStars(stars && stars.length > 0 ? stars[0].averageStars : 0);
      } catch (error) {
        console.error("Error fetching average stars:", error);
      }
    }

    if (currentUserId) {
      fetchAverageStars(currentUserId);
    }
  }, [currentUserId]);

  const handleEditNickName = () => {
    setNewNickname(user.nickname);
    setEditNickNameMode(true);
  };

  const handleSaveNickName = async () => {
    try {
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
      setUser(updatedUser);
      setEditNickNameMode(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

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

  function BackgroundLetterAvatarsBigger({ firstName, lastName }) {
    return (
      <>
        <Avatar
          {...stringAvatar(firstName, lastName)}
          style={{ width: 150, height: 150, borderRadius: 75, fontSize: 60 }}
        />
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
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="body">
              <Rating
                name="read-only"
                value={averageStars}
                precision={0.5}
                readOnly
                sx={{ my: 2 }}
              />
            </Typography>
            <p>
              <Typography variant="body">
                Joined <b>PlayItForward</b> in{" "}
                {dateStringToMonthYear(user?.modified_date)}
              </Typography>
            </p>
            <p>
              <Typography variant="body">
                Nickname:{" "}
                {editNickNameMode ? (
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                ) : (
                  user?.nickname
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
              <Typography variant="body">E-mail: {user?.email}</Typography>
            </p>
          </div>
          <div className={styles.avatar}>
            {user?.profile_picture ? (
              <Avatar
                src={user.profile_picture}
                variant="rounded"
                style={{ width: 150, height: 150, borderRadius: 75 }}
                alt="profile picture"
              />
            ) : user?.first_name && user?.last_name ? (
              <BackgroundLetterAvatarsBigger
                firstName={user.first_name}
                lastName={user.last_name}
              />
            ) : null}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PersonalInfo;

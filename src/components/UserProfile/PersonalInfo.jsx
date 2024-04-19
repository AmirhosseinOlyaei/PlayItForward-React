import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Divider, Typography, IconButton, Box } from "@mui/material";
import ImgMediaCard from "./oneLising";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import React from "react";
import { useState, useEffect } from "react";
import { dateStringToMonthYear } from "../ListingDetail";
import DoneIcon from '@mui/icons-material/Done';



const PersonalInfo = () => {
  // const user = {
  //   email: "jH0H0@example.com",
  //   first_name: "Jen",
  //   last_name: "Hill",
  //   profile_picture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   nickname: "Jennickname",
  //   zipcode: 94040,
  //   created_by_id: 1,
  //   create_date: "March 2022",
  //   modified_date: "March 2022",
  //   modified_by_id: 1,
  // };

  const [userSignedIn, setUserSignedIn] = React.useState({});
  const [editNickNameMode, setEditNickNameMode] = React.useState(false);
  const [newNickname, setNewNickname] = React.useState(userSignedIn.nickname);
  const [newZipcode, setNewZipcode] = React.useState(userSignedIn.zipcode);
  const [editZipcodeMode, setEditZipcodeMode] = React.useState(false);
  const currentUserId = "6609a2873eaffef95345b9f9"; // Replace with the actual user ID of the currently logged-in user

  React.useEffect(() => {
    async function fetchUser(userId) {
      const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
      const user = await response.json();
      setUserSignedIn(user);
      setNewNickname(user.nickname);
      setNewZipcode(user.zipcode);
    }
    fetchUser("6609a2873eaffef95345b9f9");
  }, []);

  const handleEditNickName = () => {
    setEditNickNameMode(true);
  };

  const handleSaveNickName = () => {
    setEditNickNameMode(false);
    updateNickname(newNickname);
  }

  const handleEditZipCode = () => {
    setEditZipcodeMode(true);
  };

  const handleSaveZipCode = () => {
    setEditZipcodeMode(false);
    updateZipcode(newZipcode);
  }

async function updateNickname (newNickname) {
  const response = await fetch(`http://localhost:8000/api/v1/users/${currentUserId}`, {
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

async function updateZipcode (newZipcode) {
  console.log(newZipcode, userSignedIn.id);
  const response = await fetch(`http://localhost:8000/api/v1/users/${currentUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zipcode: newZipcode,
    }),
  });
  const updatedUser = await response.json();
  setUserSignedIn(updatedUser);
}
  
  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      </AppBar>
  <IconMenu/>  
  
  <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 12 }}>
       
    <div className={styles.userProfile}>
      <div>
        <Typography variant="h3">{userSignedIn.first_name}  {userSignedIn.last_name}</Typography>
        <p><Typography variant="body">Joined <b>PlayItForward</b> in {dateStringToMonthYear(userSignedIn.create_date)}</Typography></p>
        <p><Typography variant="body">Nickname: 
        {editNickNameMode ? <input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} /> : userSignedIn.nickname} &nbsp; &nbsp;
          {editNickNameMode ? 
            <IconButton aria-label="save" size="small" onClick={handleSaveNickName}>
              <DoneIcon/>
            </IconButton> 
            : 
            <IconButton aria-label="edit" size="small" onClick={handleEditNickName}>
              <EditIcon />
            </IconButton>}
        </Typography> 
        </p>
        
        
        <p><Typography variant="body">E-mail: {userSignedIn.email}</Typography></p>
        <p><Typography variant="body">Location: 
        {editZipcodeMode ? <input type="text" value={newZipcode} onChange={(e) => setNewZipcode(e.target.value)} /> : userSignedIn.zipcode} &nbsp; &nbsp;
          {editZipcodeMode ? 
          <IconButton aria-label="save" size="small" onClick={handleSaveZipCode}> <DoneIcon/> </IconButton>
           : 
           <IconButton aria-label="edit" size="small" onClick={handleEditZipCode}>
            <EditIcon />
          </IconButton>}
        </Typography></p>
      </div>
      <div className={styles.avatar}>
        <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" variant="rounded" sx={{ width: 150, height: 150 }} alt="profile picture" />
      </div>
    </div>
  </Box>
</Box>




  );
};

export default PersonalInfo;

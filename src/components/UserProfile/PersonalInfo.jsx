import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Divider, Typography, IconButton, Box } from "@mui/material";
import ImgMediaCard from "./oneLising";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';


const PersonalInfo = () => {
  const user = {
    email: "jH0H0@example.com",
    first_name: "Jen",
    last_name: "Hill",
    profile_picture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nickname: "Jennickname",
    zipcode: 94040,
    created_by_id: 1,
    create_date: "March 2022",
    modified_date: "March 2022",
    modified_by_id: 1,

  };
  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      </AppBar>
  <IconMenu/>  
  
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       
    <div className={styles.userProfile}>
      <div>
        <p><Typography variant="h3">{user.first_name} {user.last_name}</Typography></p>
        <p><Typography variant="body">{user.nickname}   
          <IconButton aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
        </Typography> 
        </p>
        
        <p><Typography variant="body">Joined {user.create_date}</Typography></p>
        <p><Typography variant="body">{user.email}</Typography></p>
        <p><Typography variant="body">Location: {user.zipcode} 
          <IconButton aria-label="edit" size="small">
            <EditIcon />
          </IconButton>
        </Typography></p>
      </div>
      <div className={styles.avatar}>
        <Avatar src={user.profile_picture} variant="rounded" sx={{ width: 150, height: 150 }} alt="profile picture" />
      </div>
    </div>
  </Box>
</Box>




  );
};

export default PersonalInfo;

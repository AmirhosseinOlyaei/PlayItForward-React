import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import DeleteIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Divider, Typography, IconButton } from "@mui/material";


const UserProfile = () => {
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
    <Grid container spacing={4}>
  <Grid xs={3}>
    <Button variant="contained">Create New Listing</Button>
  <IconMenu/>  
  </Grid>
  <Divider orientation="vertical" flexItem />
  <Grid xs={8}>
    <div className={styles.userProfile}>
      <div>
        <Typography variant="h3">{user.first_name} {user.last_name}</Typography>
        <p>{user.nickname} 
          <IconButton aria-label="edit" size="small">
          <DeleteIcon />
          </IconButton>
        </p>
        <p>Joined {user.create_date}</p>
        <p>{user.email}</p>
        <p>Location: {user.zipcode} 
          <IconButton aria-label="edit" size="small">
            <DeleteIcon />
          </IconButton></p>
      </div>
      <div>
        <Avatar src={user.profile_picture} variant="rounded" sx={{ width: 150, height: 150 }} alt="profile picture" />
      </div>
    </div>
  </Grid>
</Grid>
  );
};

export default UserProfile;

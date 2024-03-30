import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import { Avatar, Button, Divider, Typography, IconButton } from "@mui/material";
import ImgMediaCard from "./oneLising";


const MyListings = () => {
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

  const toyLising = {
    user_id: 1,
    given_to_user_id: 2,
    title: "Little Lego cars",
    description: "5 items, multiple colors, size about 2 inches  each, lego original",
    condition: "Like new",
    delivery_method: "Pickup",
    pictures: "https://geekculture.co/wp-content/uploads/2020/05/tigermiyaw-8-1200x817.jpg",
    category: "Cars",
    zip_code: 94040,
   
    created_by_id: 1,
    create_date: "2024-11-03", 
    modified_date: "2024-11-03",
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
    <Typography variant="h3">My Listings</Typography>
  <ImgMediaCard/>  
  <ImgMediaCard/> 
  </Grid>
</Grid>
  );
};

export default MyListings;

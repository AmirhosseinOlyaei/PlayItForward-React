import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import DeleteIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Divider, Typography, IconButton } from "@mui/material";

const Favorites = () => {
 return (
    <Grid container spacing={4}>
        <Grid xs={3}>
            <Button variant="contained">Create New Listing</Button>
            <IconMenu/>  
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid xs={8}>
            <Typography variant="h3">My Listings</Typography>
   
        </Grid>
    </Grid>
);
}

export default Favorites;
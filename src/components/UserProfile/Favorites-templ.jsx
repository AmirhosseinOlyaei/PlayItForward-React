import styles from "./UserProfile.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import IconMenu from "./IconMenu";
import DeleteIcon from '@mui/icons-material/Edit';
import { AppBar, Box, CssBaseline, Typography, IconButton } from "@mui/material";


const Favorites = () => {
 return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      </AppBar>
      <IconMenu/>  
      <Box component="main" sx={{ flexGrow: 1, p: 3,  mt: 12 }}>
        <Typography variant="h3">My Favorites</Typography>
        
      </Box>
    </Box>
);
}

export default Favorites;
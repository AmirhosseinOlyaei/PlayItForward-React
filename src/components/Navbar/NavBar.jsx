import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for navigation
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import AppLogo from "../../pictures/AppLogo.png";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isLoggedIn = true; // This should be based on your authentication logic
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar component="nav">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* Left side with the logo and app name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Wrap Avatar with RouterLink to navigate to ListingPage */}
          <RouterLink
            to="/toys"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Avatar
              src={AppLogo}
              alt="AppLogo"
              sx={{ width: 70, height: 70 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ml: 2,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              PlayItForward
            </Typography>
          </RouterLink>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *:not(:last-child)": { mr: 2 },
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
            sx={{ background: "white", borderRadius: 1 }}
          />

          {/* Conditionally render EmailIcon if user is logged in */}
          {isLoggedIn && (
            <IconButton color="inherit" sx={{ p: 0 }}>
              <EmailIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ p: 0 }}>
            {/* <Link to="/profile"> */}
            <PersonIcon sx={{ fontSize: 30 }} />
            {/* </Link> */}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuClick}
            sx={{ p: 0 }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>User Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Toys</MenuItem>
            <MenuItem onClick={handleMenuClose}>Toy Detail</MenuItem>
            <MenuItem onClick={handleMenuClose}>Create Listing</MenuItem>
            <MenuItem onClick={handleMenuClose}>Messages</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign In / Out</MenuItem>
            <Link to="/favorites">
              <MenuItem onClick={handleMenuClose}>Favorites</MenuItem>
            </Link>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

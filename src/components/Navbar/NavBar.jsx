// src/components/Navbar/NavBar.jsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AllInclusive as AllToysIcon,
  Add as CreateListingIcon,
  FormatListBulleted as MyListingsIcon,
  Favorite as MyFavoritesIcon,
  Message as MessagesIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
} from "@mui/icons-material";

const NavBar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    navigate("/toys"); // Navigate to the ToyLanding page
    // If needed, trigger search logic or state changes here
  };

  const handleSignOut = () => {
    // Implement sign out logic here, such as clearing user session
    handleMenuClose();

    navigate("/");
  };

  return (
    <AppBar component="nav" sx={{ bgcolor: "rgba(33, 150, 253, 0.8)" }}>
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
              src="/AppLogo.png"
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
          <IconButton
            color="inherit"
            sx={{ p: 1.5, bgcolor: "rgba(255, 255, 255, 0.12)" }}
            onClick={handleSearchClick}
          >
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuClick}
            sx={{
              p: 1,
              bgcolor: "rgba(255, 255, 255, 0.12)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.24)",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 39 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
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
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/toys"
            >
              <ListItemIcon>
                <AllToysIcon />
              </ListItemIcon>
              All Toys
            </MenuItem>

            {user && (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/create"
              >
                <ListItemIcon>
                  <CreateListingIcon />
                </ListItemIcon>
                Create Listing
              </MenuItem>
            )}

            {user && (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/listings"
              >
                <ListItemIcon>
                  <MyListingsIcon />
                </ListItemIcon>
                My Listings
              </MenuItem>
            )}

            {user && (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/favorites"
              >
                <ListItemIcon>
                  <MyFavoritesIcon />
                </ListItemIcon>
                My Favorites
              </MenuItem>
            )}

            {user && (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/messages"
              >
                <ListItemIcon>
                  <MessagesIcon />
                </ListItemIcon>
                Messages
              </MenuItem>
            )}

            {user && (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/personal"
              >
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
            )}

            {user ? (
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            ) : (
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/login"
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                Sign In
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

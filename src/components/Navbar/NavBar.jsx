import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Search as SearchIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import ExpandableSearch from "./ExpandableSearch";

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
          <ExpandableSearch />
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
          {isLoggedIn && (
            <IconButton color="inherit" sx={{ p: 0 }}>
              <EmailIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ p: 0 }}>
            <PersonIcon sx={{ fontSize: 30 }} />
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
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/profile"
            >
              User Profile
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/toys"
            >
              Toys
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/toy-details"
            >
              Toy Detail
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/create"
            >
              Create Listing
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/messages"
            >
              Messages
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/login"
            >
              Sign In / Out
            </MenuItem>
            {/* <Link href="/favorites"> */}
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/favorites"
            >
              Favorites
            </MenuItem>
            {/* </Link> */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

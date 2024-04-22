// src/components/ToyList/ToysLanding.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CssBaseline from "@mui/material/CssBaseline";
import Create from "./Create";
import Search from "./Search";
import ToyListMap from "./ToyListMap";
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";
import ToyList from "./ToyList";
import DeliveryFilter from "./DeliveryFilter";
import GoogleZip from "./GoogleZip";

const drawerWidth = 340;

export default function ToysLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchToys = async () => {
      const queryParams = [];
      if (delivery !== "All") {
        queryParams.push(`delivery_method=${encodeURIComponent(delivery)}`);
      }
      if (selectedCategories.length > 0) {
        queryParams.push(
          `categories=${encodeURIComponent(selectedCategories.join(","))}`
        );
      }
      if (zipCode) {
        queryParams.push(`zipCodes=${encodeURIComponent(zipCode)}`); // Directly use zipCode
      }
      if (searchKeyword.trim() !== "") {
        queryParams.push(`search=${encodeURIComponent(searchKeyword)}`);
      }

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error(
            "API URL is not defined in the environment variables."
          );
        }
        const response = await axios.get(`${apiUrl}/toys/${queryString}`);
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Received malformed data from API");
        }
        setToys(response.data);
      } catch (err) {
        console.error("Error fetching toys:", err.message || "Unknown error");
        setError("Failed to fetch toys from the server.");
        setToys([]); // Ensure toys are reset on error
      }
    };

    fetchToys();
  }, [delivery, selectedCategories, zipCode, searchKeyword]);

  const handleZipCodeChange = (newZipCode) => {
    setZipCode(newZipCode) || "";
    // You can also trigger a re-fetch or filter update here
  };
  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation); // Update the location state based on selection
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }} backgroundColor="#fdfdfd">
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginRight: 2,
          display: { sm: "none" },
          top: 80,
          left: 45,
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: 2, // Setting borderRadius to 0 to make the button square
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <MenuOpenIcon />
      </IconButton>

      {/* side nav bar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "86px",
            paddingBottom: "120px",
          },
        }}
      >
        {/* side nav contents */}
        <Grid item xs={11} sm={11} p={2}>
          {/* Search */}
          <Grid item xs={12} sm={12} mt={1}>
            <Search onSearchChange={setSearchKeyword} />
          </Grid>

          {/* Create */}
          <Grid item xs={12} sm={12} my={2}>
            <Create />
          </Grid>

          <Divider />

          {/* Filters */}
          <Typography variant="h6" my={2}>
            Filters
          </Typography>

          {/* Location */}
          <Grid item xs={12} sm={12} my={1}>
            <GoogleZip
              onZipCodeChange={handleZipCodeChange}
              value={selectedLocation} // Pass selected location if managed
              onValueChangeLocation={handleLocationChange} // Handle changes in location selection
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} my={2}>
            <DeliveryFilter delivery={delivery} setDelivery={setDelivery} />
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category setSelectedCategories={setSelectedCategories} />
          </Grid>

          <Divider />

          {/* Views */}
          <Typography variant="h6" mt={2} mb={4}>
            Views
          </Typography>
          <Grid item xs={12} sm={12} m={-3}>
            <CustomToolbar viewType={viewType} setViewType={setViewType} />
          </Grid>
        </Grid>
      </Drawer>

      {/* Permanent drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "86px",
            paddingBottom: "120px",
          },
        }}
      >
        {/* side nav contents */}
        <Grid item xs={11} sm={11} p={2}>
          {/* Search */}
          <Grid item xs={12} sm={12} mt={1}>
            <Search onSearchChange={setSearchKeyword} />
          </Grid>

          {/* Create */}
          <Grid item xs={12} sm={12} my={2}>
            <Create />
          </Grid>

          <Divider />

          {/* Filters */}
          <Typography variant="h6" my={2}>
            Filters
          </Typography>

          {/* Location */}
          <Grid item xs={12} sm={12} my={1}>
            <GoogleZip
              onZipCodeChange={handleZipCodeChange}
              value={selectedLocation} // Pass selected location if managed
              onValueChangeLocation={handleLocationChange} // Handle changes in location selection
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} my={2}>
            <DeliveryFilter delivery={delivery} setDelivery={setDelivery} />
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category setSelectedCategories={setSelectedCategories} />
          </Grid>

          <Divider />

          {/* Views */}
          <Typography variant="h6" mt={2} mb={4}>
            Views
          </Typography>
          <Grid item xs={12} sm={12} m={-3}>
            <CustomToolbar viewType={viewType} setViewType={setViewType} />
          </Grid>
        </Grid>
      </Drawer>

      {/* Main section */}
      <Grid container mt={11}>
        <Grid container columns={{ xs: 2, sm: 4, md: 8, lg: 12 }} m={2}>
          {viewType ? (
            <Grid item xs={12} sm={12} m={1}>
              <ToyListMap toysData={toys} />
            </Grid>
          ) : (
            <ToyList toys={toys} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

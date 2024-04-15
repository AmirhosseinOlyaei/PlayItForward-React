// src/components/ToyList/ToysLanding.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Drawer, Typography, Divider, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GoogleMaps from "./GoogleMaps";
import Create from "./Create";
import Search from "./Search";
import ToyListMap from "./ToyListMap";
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";
import ToyList from "./ToyList";
import DeliveryFilter from "./DeliveryFilter";

const drawerWidth = 340;

export default function ToysLanding() {
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [zipCodes, setZipCodes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchToys = async () => {
      let queryParams = [];
      if (delivery !== "All") {
        queryParams.push(`delivery_method=${encodeURIComponent(delivery)}`);
      }
      if (selectedCategories.length > 0) {
        queryParams.push(
          `categories=${encodeURIComponent(selectedCategories.join(","))}`
        );
      }
      if (zipCodes.length > 0) {
        queryParams.push(`zipCodes=${encodeURIComponent(zipCodes.join(","))}`);
      }

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}toys/${queryString}`);
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
  }, [delivery, selectedCategories, zipCodes]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const apiUrl = `http://localhost:8000/api/v1/search/${encodeURIComponent(searchKeyword)}`;
      try {
        const response = await axios.get(apiUrl);
        if (response.data && Array.isArray(response.data.dataToyListing)) {
          setToys(response.data.dataToyListing);
        } else {
          console.error(
            "Expected 'dataToyListing' to be an array, received:",
            response.data
          );
          setToys([]);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setToys([]);
      }
    };

    if (searchKeyword.trim() !== "") {
      fetchSearchResults();
    } else {
      setToys([]);
    }
  }, [searchKeyword]);

  return (
    <Box sx={{ display: "flex" }} backgroundColor="#fdfdfd">
      <CssBaseline />

      {/* side nav bar */}
      <Drawer
        variant="permanent"
        sx={{
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
            <GoogleMaps
              onLocationSelect={(zipCodes) => {
                setZipCodes(zipCodes);
              }}
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
              <ToyListMap />
            </Grid>
          ) : (
            <ToyList toys={toys} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

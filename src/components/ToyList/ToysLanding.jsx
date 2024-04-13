import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Typography,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GoogleMaps from "./GoogleMaps";
import Create from "./Create";
import Search from "./Search";
import ToyCard from "./ToyCard";
import ToyListMap from "./ToyListMap";
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";

const drawerWidth = 340;

export default function ToysLanding() {
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchToys();
  }, [delivery, locationId]);

  const fetchToys = async () => {
    let queryParams = [];
    if (delivery !== "All") {
      queryParams.push(`delivery_method=${encodeURIComponent(delivery)}`);
    }
    if (locationId) {
      queryParams.push(`location=${encodeURIComponent(locationId)}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/toys${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch toys from the server.");
      }
      const data = await response.json();
      setToys(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setToys([]);
    }
  };

  return (
    <Box sx={{ display: "flex" }} backgroundColor="#fdfdfd">
      <CssBaseline />
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
            <Search />
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
          <Grid item xs={12} sm={12} my={1}>
            <GoogleMaps
              onLocationSelect={(selectedValue) => {
                setLocationId(selectedValue?.place_id || "");
              }}
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} mt={2} mb={2}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Delivery Method</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                label="Delivery Method"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pickup">Pick up</MenuItem>
                <MenuItem value="Delivery">Drop off</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category />
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
            toys.map((toy) => (
              <Grid
                item
                // spacing={2}
                m={1}
                key={toy._id}
                sx={{
                  flexGrow: 1,
                }}
              >
                <ToyCard
                  title={toy.title}
                  // image={toy.image}
                  location={toy.zip_code}
                />
                {error && (
                  <Typography color="error" m={2}>
                    {error}
                  </Typography>
                )}
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

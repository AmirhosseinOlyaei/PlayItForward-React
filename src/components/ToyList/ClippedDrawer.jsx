import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GoogleMaps from "./GoogleMaps";
import Create from "./Create";
import Search from "./Search";
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Categories from "./Categories";
import ToyCard from "./ToyCard";
import { toysData } from "./toysData";

const drawerWidth = 340;

export default function ClippedDrawer() {
  const [radius, setRadius] = useState(5);
  const [toys, setToys] = useState(toysData);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
      >
        <List>
          <Typography variant="caption" gutterBottom letterSpacing={1} m={3}>
            PlayItForward
          </Typography>
        </List>

        {/* ------ */}
        <Grid container spacing={2} m={0}>
          <Grid item xs={12} sm={11}>
            <Grid item xs={11} sm={12} mb={2}>
              <Create />
            </Grid>
            <Grid item xs={12} sm={12} my={2}>
              <Search />
            </Grid>
            <Divider />
            <Grid item xs={12} sm={12} my={2}>
              <Typography variant="h6">Filter by:</Typography>
              <Grid item xs={12} sm={12} my={1}>
                <GoogleMaps />
              </Grid>
              <Grid item xs={12} sm={12} my={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Radius</InputLabel>
                  <Select
                    labelId="select-label"
                    id="simple-select"
                    value={radius}
                    fullWidth
                    label="Radius"
                    onChange={(event) => setRadius(event.target.value)}
                  >
                    <MenuItem value="1">Within 1 miles</MenuItem>
                    <MenuItem value="2">Within 2 miles</MenuItem>
                    <MenuItem value="5">Within 5 miles</MenuItem>
                    <MenuItem value="10">Within 10 miles</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />

            {/* categories */}
            <Grid item xs={12} sm={12}>
              <Categories />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>

      {/* Main section */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {toys.map((toy) => (
              <Grid item xs={2} sm={4} md={4} key={toy.id}>
                <ToyCard
                  title={toy.title}
                  image={toy.image}
                  location={toy.location}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

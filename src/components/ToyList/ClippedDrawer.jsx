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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ToyCard from "./ToyCard";
import ToyListMap from "./ToyListMap";

import { toysData } from "./toysData";
import CategoryMultipleSelectChip from "./CategoryMultipleSelectChip";

const drawerWidth = 340;

export default function ClippedDrawer() {
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState(toysData);
  const [viewType, setViewType] = useState(false);
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
        {/* <List>
          <Typography variant="caption" gutterBottom letterSpacing={1} m={3}>
            PlayItForward
          </Typography>
        </List> */}

        {/* side nav contents */}
        <Grid container spacing={2} m={0}>
          <Grid item xs={12} sm={11}>
            <Grid item xs={12} sm={12} mt={1}>
              <Search />
            </Grid>
            <Grid item xs={11} sm={12} my={2}>
              <Create />
            </Grid>
            <Divider />
            <Grid item xs={12} sm={12} my={2}>
              <Typography variant="h6">Filters</Typography>
              <Grid item xs={12} sm={12} my={1}>
                <GoogleMaps />
              </Grid>

              {/* delivery */}
              <Grid item xs={12} sm={12} my={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Delivery Method</InputLabel>
                  <Select
                    labelId="select-label"
                    id="simple-select"
                    value={delivery}
                    fullWidth
                    label="Delivery Method"
                    onChange={(event) => {
                      setDelivery(event.target.value);
                      fetchToys({ deliveryMethod: event.target.value });
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pick up">Pick up</MenuItem>
                    <MenuItem value="Drop off">Drop off</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />

            {/* categories */}
            <Grid item xs={12} sm={12} my={2}>
              <CategoryMultipleSelectChip />
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} my={2}>
            <Typography variant="h6">View</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={viewType}
                    onChange={() => setViewType(!viewType)}
                  />
                }
                label={viewType ? "Map" : "Toy Cards"}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Drawer>

      {/* Main section */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {viewType ? (
              <ToyListMap />
            ) : (
              toys.map((toy) => (
                <Grid item xs={2} sm={4} md={4} key={toy.id}>
                  <ToyCard
                    title={toy.title}
                    image={toy.image}
                    location={toy.location}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GoogleMaps from "./GoogleMaps";
import Create from "./Create";
import Search from "./Search";
import { useState } from "react";
import {
  Box,
  Drawer,
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
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";

const drawerWidth = 340;

export default function ToysLanding() {
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState(toysData);
  const [viewType, setViewType] = useState(false);
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
          },
        }}
      >
        {/* <Toolbar /> */}
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
              <Category />
            </Grid>
            <Divider />
            {/* <Grid item xs={12} sm={12} my={2}>
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
            </Grid> */}
          </Grid>
        </Grid>
      </Drawer>

      {/* Main section */}
      <Grid container spacing={0} m={0}>
        <Grid item xs={12} sm={12} m={0}>
          <CustomToolbar viewType={viewType} setViewType={setViewType} />
        </Grid>
        <Grid
          container
          spacing={0}
          columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
          mx={2}
        >
          {viewType ? (
            <Grid item xs={12} sm={12} m={1}>
              <ToyListMap />
            </Grid>
          ) : (
            toys.map((toy) => (
              <Grid
                item
                spacing={2}
                m={1}
                key={toy.id}
                sx={{
                  flexGrow: 1,
                }}
              >
                <ToyCard
                  title={toy.title}
                  image={toy.image}
                  location={toy.location}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Categories from "./Categories";
import ToyCard from "./ToyCard";

const drawerWidth = 340;

export default function ClippedDrawer() {
  const [radius, setRadius] = useState(5);

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

        {/* --------- */}
        <Box>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main section */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ToyCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Icon,
  Checkbox,
} from "@mui/material";
import Create from "./Create";
import GoogleMaps from "./GoogleMaps";
import Search from "./Search";

const drawerWidth = 340;

const categories = ["Toys", "Games"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [radius, setRadius] = React.useState<number>(5);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        // coloooooooooooooooooooooooooooooor
        // sx={{ bgcolor: "pink" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PlayItForward
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <Typography variant="caption" gutterBottom letterSpacing={1} m={3}>
            PlayItForward
          </Typography>
        </List>

        {/* search */}
        <Grid container spacing={2} m={0}>
          <Grid item xs={12} sm={11}>
            {/* new listing */}
            <Grid item xs={11} sm={12} mb={2}>
              <Create />
            </Grid>

            <Grid item xs={12} sm={12} my={2}>
              <Search />
            </Grid>

            {/* Filter Options -  https://mui.com/material-ui/react-autocomplete/#system-GoogleMaps.js */}
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
                    onChange={(event) =>
                      setRadius(event.target.value as number)
                    }
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

            {/* category */}
            <Grid item xs={12} sm={12}>
              <List>
                <Typography variant="h6">Toys Category</Typography>
                {[
                  "Art & Craft",
                  "Books",
                  "Cars",
                  "Dolls",
                  "Plush",
                  "Sports",
                  "Playsets",
                  "Games & Puzzles",
                  "Musical instruments",
                  "Miscellaneous",
                ].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox edge="start" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Toy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Alaska, USA
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add To Favorite</Button>
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Main>
    </Box>
  );
}

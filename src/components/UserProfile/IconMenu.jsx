import * as React from "react";
import {
  Divider,
  Box,
  List,
  ListItem,
  Button,
  ListItemButton,
  Grid,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Send from "@mui/icons-material/Send";
import Person2 from "@mui/icons-material/Person2";
import ListIcon from "@mui/icons-material/List";
import MailIcon from "@mui/icons-material/Mail";
import Create from "../ToyList/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Drawer from "@mui/material/Drawer";
import Link from "react-router-dom";

const menuOptions = [
  { id: 0, text: "My Listings", icon: <ListIcon />, link: "/listings" },
  { id: 1, text: "Favorites", icon: <FavoriteIcon />, link: "/favorites" },
  { id: 2, text: "Messages", icon: <MailIcon />, link: "/messages" },
  { id: 3, text: "Profile", icon: <Person2 />, link: "/personal" },
];
function IconMenu({ activeTab }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 340,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 340,
          boxSizing: "border-box",
          marginTop: "86px",
        },
      }}
    >
      <Box sx={{ overflow: "auto", p: 2, pt: 4 }} sm={12}>
        <Grid item xs={12} sm={11}>
          <Create />
        </Grid>
        <Divider sx={{ my: 2 }} />
        <List>
          {menuOptions.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                key={item.text}
                disablePadding
                //sx={item.id == activeTab ? { bgcolor: "#CAE6FC" } : ""}
                sx={{ backgroundColor: item.id == activeTab ? "#CAE6FC" : "" }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default IconMenu;

import * as React from "react";
import {
  Divider,
  Box,
  List,
  ListItem,
  Button,
  ListItemButton,
  Link,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Bookmark from "@mui/icons-material/Bookmark";
import Person2 from "@mui/icons-material/Person2";
import ListIcon from "@mui/icons-material/List";
import MailIcon from "@mui/icons-material/Mail";
import Create from "../../ToyList/Create";

import Drawer from "@mui/material/Drawer";

const menuOptions = [
  { text: "My Listings", icon: <ListIcon />, link: "/listings" },
  { text: "Favorites", icon: <Bookmark />, link: "/favorites" },
  { text: "Messages", icon: <MailIcon />, link: "/messages" },
  { text: "Personal Information", icon: <Person2 />, link: "/personal" },
];
function IconMenu() {
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
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Create />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {menuOptions.map(({ text, icon, link }) => (
            <Link
              key={text}
              href={link}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
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

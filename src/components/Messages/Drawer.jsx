import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import Badge from "@mui/material/Badge";

const drawerWidth = 140;

const DrawerSidebar = ({
  onButtonClick,
  sentMessageCount,
  inboxMessageCount,
}) => {
  const handleButtonClick = (type) => {
    onButtonClick(type);
  };

  return (
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
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Inbox", "Sent"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleButtonClick(text.toLowerCase())}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <Badge badgeContent={inboxMessageCount} color="secondary">
                      <InboxIcon />
                    </Badge>
                  ) : (
                    <Badge badgeContent={sentMessageCount} color="secondary">
                      <OutboxRoundedIcon />
                    </Badge>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerSidebar;

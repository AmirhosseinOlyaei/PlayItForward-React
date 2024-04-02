import * as React from 'react';
import {Divider, Box, List, ListItem, Button, ListItemButton} from '@mui/material';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Bookmark from '@mui/icons-material/Bookmark';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Send from '@mui/icons-material/Send';
import Person2 from '@mui/icons-material/Person2';
import ListIcon from '@mui/icons-material/List';
import MailIcon from '@mui/icons-material/Mail';

import Drawer from '@mui/material/Drawer';


const menuOptions = [
  { text: "My Listings", icon: <ListIcon /> },
  { text: "Favorites", icon: <Bookmark /> },
  { text: "Messages", icon: <MailIcon /> },
  { text: "Personal Information", icon: <Person2 /> },
]
function IconMenu() {
  return (
    

    <Drawer
        variant="permanent"
        sx={{
          width: 340,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 340, boxSizing: 'border-box', marginTop: "64px" },
        }}
      >
        
        <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem  disablePadding>
              <ListItemButton>
                <Button variant="contained">Create New Listing</Button>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
          <List>
            {menuOptions.map(({text, icon}) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      // <MenuList sx={{ width: 250 }}>
      //   <MenuItem>
      //     <ListItemIcon>
      //       <List fontSize="small" />
      //     </ListItemIcon>
      //     <ListItemText>My Listings</ListItemText>
      //   </MenuItem>
      //   <MenuItem>
      //     <ListItemIcon>
      //       <Bookmark fontSize="small" />
      //     </ListItemIcon>
      //     <ListItemText>Favorites</ListItemText>
      //   </MenuItem>
      //   <MenuItem>
      //     <ListItemIcon>
      //       <Badge badgeContent={4} color="primary">
      //         <Send fontSize="small" />
      //       </Badge>
      //     </ListItemIcon>
      //     <ListItemText>Messages</ListItemText>
      //   </MenuItem>
      //   <MenuItem>
      //     <ListItemIcon>
      //       <Person2 fontSize="small" />
      //     </ListItemIcon>
      //     <ListItemText>Personal Information</ListItemText>
      //   </MenuItem>
      // </MenuList>
  );
}

export default IconMenu;
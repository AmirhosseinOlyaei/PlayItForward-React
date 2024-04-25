import * as React from 'react';
import {Divider, Box, List, ListItem, Button, ListItemButton, Link} from '@mui/material';
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
import Create from '../ToyList/Create';

import Drawer from '@mui/material/Drawer';


const menuOptions = [
  { id: 0, text: "My Listings", icon: <ListIcon />, link: "/listings" },
  { id: 1, text: "Favorites", icon: <Bookmark />, link: "/favorites" },
  { id: 2, text: "Messages", icon: <MailIcon />, link: "/messages" },
  { id: 3, text: "Personal Information", icon: <Person2 />, link: "/personal" },
]
function IconMenu({activeTab}) {
  

  return (
    

    <Drawer
        variant="permanent"
        sx={{
          width: 340,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 340, boxSizing: 'border-box', marginTop: "86px" },
        }}
      >
        
        <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem  disablePadding>
              <ListItemButton>
                <Create/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
          <List>
            {menuOptions.map((item) => (
            <Link key={item.text} href={item.link} sx={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem key={item.text} disablePadding sx = { item.id ==  activeTab ? ({ bgcolor: '#CAE6FC', }) : ""}>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>  
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
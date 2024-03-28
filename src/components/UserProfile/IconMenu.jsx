import * as React from 'react';
import Divider from '@mui/material/Divider';
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
import List from '@mui/icons-material/List';
import { Person } from '@mui/icons-material';
import { Badge } from '@mui/material';

export default function IconMenu() {
  return (
      <MenuList sx={{ width: 250 }}>
        <MenuItem>
          <ListItemIcon>
            <List fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Listings</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Bookmark fontSize="small" />
          </ListItemIcon>
          <ListItemText>Favorites</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Badge badgeContent={4} color="primary">
              <Send fontSize="small" />
            </Badge>
          </ListItemIcon>
          <ListItemText>Messages</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Person2 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Personal Information</ListItemText>
        </MenuItem>
      </MenuList>
  );
}
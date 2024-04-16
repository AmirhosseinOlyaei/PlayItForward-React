import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopy from '@mui/icons-material/ContentCopy';
import MailIcon from '@mui/icons-material/Mail'

export default function ShareMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {

    setAnchorEl(null); 
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<ShareIcon/>}
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "rgba(33, 150, 243, 0.8)", // Recommended color from Material-UI docs
          color: "white", margin: "10px 0", height: "42px",
          "&:hover": {
            backgroundColor: "rgba(33, 150, 243, 1)", // Recommended color from Material-UI docs
          },
          "& .MuiButton-startIcon": {
            color: "white",
          },
        }}
      >
        </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} href="mailto:"><MailIcon color="disabled"/>Mail</MenuItem>
        <MenuItem onClick={handleCopy}><ContentCopy color="disabled" />Copy link</MenuItem>
      </Menu>
    </div>
  );
}
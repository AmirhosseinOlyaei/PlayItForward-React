import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const SuccessAlert = ({ open, onClose }) => {
  const handleYes = () => {
    onClose();
  };
  const handleNo = () => {
    hystory.push("/toys");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "green" }}>Success!</DialogTitle>
      <DialogContent>
        <Typography>
          Your toy listing has been submitted successfully. Do you want to
          create one more listing?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} variant="contained" color="primary">
          Yes
        </Button>
        <Link to="/toys">
          <Button onClick={handleNo} variant="contained" color="secondary">
            No
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessAlert;

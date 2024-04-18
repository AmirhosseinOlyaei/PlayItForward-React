import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ActionButton = ({ linkTo, text, startIcon, fullWidth, onClick }) => {
  return (
    <Link href={linkTo}>
      <Button
        onClick={onClick}
        fullWidth={fullWidth}
        variant="contained"
        // color="primary"
        startIcon={startIcon}
        size="medium"
        sx={{
          backgroundColor: "rgba(33, 150, 243, 0.8)", // Recommended color from Material-UI docs
          color: "white",
          margin: "10px 0",
          height: "42px",
          "&:hover": {
            backgroundColor: "rgba(33, 150, 243, 1)", // Recommended color from Material-UI docs
          },
          "& .MuiButton-startIcon": {
            color: "white",
          },
        }}
      >
        {text}
      </Button>
    </Link>
  );
};
export default ActionButton;

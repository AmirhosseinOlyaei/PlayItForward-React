import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ActionButton = ({
  link,
  text,
  startIcon,
  fullWidth,
  btnWidth,
  onClick,
  ...props
}) => {
  const buttonStyle = {
    backgroundColor: "rgba(33, 150, 243, 0.8)", // Recommended color from Material-UI docs
    color: "white",
    margin: "10px 0",
    height: "42px",
    width: btnWidth,

    "&:hover": {
      backgroundColor: "rgba(33, 150, 243, 1)", // Recommended color from Material-UI docs
    },
    "& .MuiButton-startIcon": {
      color: "white",
    },
  }
  return (
    <Link to={link} >
      <Button
        onClick={onClick}
        fullWidth={fullWidth}
        variant="contained"
        size="large"
        sx={buttonStyle}
        {...props}
      >
        {startIcon} {text}
      </Button>
    </Link>
  );
};
export default ActionButton;

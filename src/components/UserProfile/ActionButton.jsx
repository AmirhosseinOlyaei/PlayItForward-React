import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ActionButton = ({
  link,
  text,
  startIcon,
  fullWidth,
  onClick,
  ...props
}) => {
  return (
    <Link to={link}>
      <Button
        onClick={onClick}
        fullWidth={fullWidth}
        variant="contained"
        // color="primary"

        size="large"
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
        {...props}
      >
        {startIcon} {text}
      </Button>
    </Link>
  );
};
export default ActionButton;

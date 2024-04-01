// create a toy listing
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <>
      <Link to="/create">
        <Button
          variant="contained"
          // color="primary"
          startIcon={<AddIcon />}
          fullWidth
          size="large"
          sx={{
            backgroundColor: "rgba(33, 150, 243, 0.8)", // Recommended color from Material-UI docs
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 1)", // Recommended color from Material-UI docs
            },
            "& .MuiButton-startIcon": {
              color: "white",
            },
          }}
        >
          Create new listing
        </Button>
      </Link>
    </>
  );
};
export default Create;

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
            backgroundColor: "rgba(180, 40, 75, 0.8)", // Updated color
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(180, 40, 75, 1)", // Updated color
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

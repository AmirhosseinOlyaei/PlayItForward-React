// create a toy listing
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <>
      <Link to="/create">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          size="large"
        >
          Create new listing
        </Button>
      </Link>
    </>
  );
};
export default Create;

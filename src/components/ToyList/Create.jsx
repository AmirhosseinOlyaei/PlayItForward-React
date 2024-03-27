// create a toy listing
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Create = () => {
  return (
    <Grid item xs={11} sm={11} mb={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        fullWidth
        size="large"
      >
        Create new listing
      </Button>
    </Grid>
  );
};
export default Create;

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ToyCard(props) {
  const handleShareClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL to clipboard", err);
      });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.image} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.location}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControl sx={{ mr: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isFavorite}
                onChange={() => props.handleFavoriteClick(props.id)}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            }
            label="Add To Favorite"
          />
        </FormControl>
        <Button size="small" onClick={handleShareClick}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

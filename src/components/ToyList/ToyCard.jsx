import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ToyCard({ title, image, location }) {
  console.log(title, image, location); // Add this line to check the props

  return (
    <Card sx={{ maxWidth: 345 }}>
      {image && <CardMedia sx={{ height: 140 }} image={image} title={title} />}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
}

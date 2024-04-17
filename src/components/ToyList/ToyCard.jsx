// src/components/ToyList/ToyCard.jsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ToyCard({ title, imageUrl, location }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultImage = "https://via.placeholder.com/1920x1080/eee?text=16:9";
  const imageSrc = imageUrl || defaultImage;

  return (
    <Card
      sx={{
        minWidth: 250,
        flexBasis: isSmallScreen ? "100%" : "345px",
        flexGrow: 1,
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          objectFit: "cover",
        }}
        image={imageSrc}
        loading="lazy"
        title={title}
      />
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

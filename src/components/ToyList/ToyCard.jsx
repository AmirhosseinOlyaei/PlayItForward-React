import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ToyCard({ title, image, location }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: isSmallScreen ? 200 : 345, // limits width on larger screens, expands to fill space on smaller screens
        flexBasis: isSmallScreen ? "100%" : "345px", // same as above, but sets initial width
        flexGrow: 1, // allows the card to expand to fill available space horizontally on larger screens
      }}
    >
      {image && (
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
            objectFit: "cover",
          }}
          image={image}
          title={title}
        />
      )}
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

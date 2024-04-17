// src/components/ToyList/ToyCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ToyCard({ toyId, title, imageUrl, location }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // Create an instance of navigate

  const defaultImage = "https://via.placeholder.com/1920x1080/eee?text=16:9";
  const imageSrc = imageUrl || defaultImage;

  const handleClick = () => {
    navigate(`/toys/${toyId}`);
  };

  return (
    <Card
      sx={{
        minWidth: 250,
        flexBasis: isSmallScreen ? "100%" : "345px",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <CardActionArea onClick={handleClick}>
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
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            noWrap
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis", // Add ellipsis when text is too long
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// src/components/ToyList/ToyCard.jsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ToyCard({
  toyId,
  title,
  imageUrl,
  location,
  onCardClick,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultImage = "https://via.placeholder.com/1920x1080/eee?text=16:9";
  const imageSrc = imageUrl || defaultImage;

  return (
    <Card
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <CardActionArea onClick={() => onCardClick(toyId)}>
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
          {/* <Typography variant="body2" color="text.secondary">
            {location}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

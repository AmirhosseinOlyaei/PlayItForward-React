import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, InfoBox } from "@react-google-maps/api";
import { Box, CardActionArea, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ToyListMap = ({ toysData }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const googleMapsApiKey = `${GOOGLE_MAPS_API_KEY}`;

  useEffect(() => {
    const getLatLng = async (zip) => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: zip,
            key: googleMapsApiKey,
          },
        }
      );

      return response.data.results.length > 0
        ? response.data.results[0].geometry.location
        : null;
    };

    const fetchLocations = async () => {
      const newLocations = [];

      for (var toy of toysData) {
        const location = await getLatLng(toy.zip_code);
        if (!location) continue;
        toy.lat = location.lat;
        toy.lng = location.lng;
        newLocations.push(toy);
      }

      setLocations(newLocations);
    };

    fetchLocations();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 135px)" }}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={locations[0]}
        zoom={6}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoBox
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          >
            <Card sx={{ width: 345 }}>
              <IconButton
                size="small"
                onClick={() => setSelectedLocation(null)}
                style={{ float: "right" }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>

              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                title={selectedLocation.title}
                subheader={selectedLocation.description}
              />

              <CardMedia
                component="img"
                height="200"
                width="200"
                image={selectedLocation.image}
                alt="toy image"
              />
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </InfoBox>
        )}
      </GoogleMap>
    </Box>
  );
};

export default ToyListMap;

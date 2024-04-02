import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, InfoBox } from "@react-google-maps/api";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ToyListMap = ({ toysData }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationPromises = toysData.map(async (toy) => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                address: toy.zipCode,
                key: GOOGLE_MAPS_API_KEY,
              },
            }
          );

          if (
            response.data.status !== "OK" ||
            !response.data.results[0] ||
            !response.data.results[0].geometry
          ) {
            throw new Error("Location not found");
          }

          const location = response.data.results[0].geometry.location;
          return { ...toy, lat: location.lat, lng: location.lng };
        } catch (error) {
          console.error(`Failed to fetch location for toy ${toy.id}:`, error);
          return null;
        }
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const validLocations = resolvedLocations.filter(
        (location) => location !== null
      );
      setLocations(validLocations);
    };

    fetchLocations();
  }, [toysData]);

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 220px)" }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={locations[0] || { lat: 0, lng: 0 }}
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
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
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
      </LoadScript>
    </Box>
  );
};

export default ToyListMap;

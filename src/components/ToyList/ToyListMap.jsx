// src/components/ToyList/ToyListMap.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api";
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ToyListMap = ({ toysData }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const googleMapsApiKey = `${GOOGLE_MAPS_API_KEY}`;

  useEffect(() => {
    const getLatLng = async (zip) => {
      try {
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
      } catch (error) {
        console.error("Failed to fetch geocode for zip:", zip, error);
        return null; // Handle errors gracefully by returning null if an API call fails
      }
    };

    const fetchLocations = async () => {
      const promises = toysData.map((toy) =>
        getLatLng(toy.zip_code).then((location) => {
          return location
            ? { ...toy, lat: location.lat, lng: location.lng }
            : null;
        })
      );
      const results = await Promise.all(promises);
      const newLocations = results.filter((location) => location !== null); // Filter out any null responses
      setLocations(newLocations);
    };

    fetchLocations();
  }, [toysData]); // Added dependency to re-run the effect if toysData changes

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

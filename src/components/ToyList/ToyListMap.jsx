import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api";
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardActionArea,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ToyListMap = ({ toysData }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      const promises = toysData.map((toy) => getLatLng(toy.zip_code));
      const results = await Promise.all(promises);
      setLocations(
        results
          .map((result, index) =>
            result ? { ...toysData[index], ...result } : null
          )
          .filter((loc) => loc)
      );
    };
    fetchLocations();
  }, [toysData]);

  const getLatLng = async (zip) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: { address: zip, key: GOOGLE_MAPS_API_KEY },
      }
    );
    return response.data.results.length > 0
      ? response.data.results[0].geometry.location
      : null;
  };

  const handleMarkerClick = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const handleMapClick = useCallback(() => {
    if (selectedLocation) {
      setSelectedLocation(null);
    }
  }, [selectedLocation]);

  const toggleFavorite = useCallback((event, id) => {
    event.stopPropagation();
    setFavorites(
      (prev) =>
        new Set(
          prev.has(id)
            ? [...prev].filter((favId) => favId !== id)
            : [...prev, id]
        )
    );
  }, []);

  const handleShareClick = useCallback((event, id) => {
    event.stopPropagation();
    const url = `${window.location.origin}/toys/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy URL: ", err));
  }, []);

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 135px)" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={
          locations.length > 0 ? locations[0] : { lat: 39.5, lng: -98.35 }
        }
        zoom={6}
        onClick={handleMapClick}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location)}
          />
        ))}
        {selectedLocation && (
          <InfoBox
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          >
            <Card sx={{ width: 345, position: "relative" }}>
              <CardActionArea
                onClick={() => navigate(`/toys/${selectedLocation.id}`)}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title={selectedLocation.title}
                  subheader={selectedLocation.description}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedLocation.image}
                  alt="toy image"
                />
              </CardActionArea>
              <IconButton
                aria-label="close"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedLocation(null);
                }}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={(event) =>
                    toggleFavorite(event, selectedLocation.id)
                  }
                >
                  <FavoriteIcon
                    color={
                      favorites.has(selectedLocation.id) ? "error" : "inherit"
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={(event) =>
                    handleShareClick(event, selectedLocation.id)
                  }
                >
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

// src/components/ToyList/ToyListMap.jsx
import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import toast, { Toaster } from "react-hot-toast";
import LettersAvatar from "../ListingDetail/LettersAvatar";
import { getUserContext } from "../../context/userContext";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ToyListMap = ({ toysData }) => {
  const user = getUserContext();
  const authorizedUser = user ? user._id : "";

  const apiUrl = import.meta.env.VITE_API_URL;
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const currentFavoritesRef = useRef(favorites);
  const setCurrentHitsRefState = (data) => {
    currentFavoritesRef.current = data;
    setFavorites(data);
  };

  const navigate = useNavigate();

  //get the current user's favorites .. store in state
  const getUserFavorites = async () => {
    try {
      const response = await axios.get(`${apiUrl}/favorites/${authorizedUser}`);
      setCurrentHitsRefState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLocationsAsync = async () => {
      try {
        const promises = toysData.map((toy) => getLatLng(toy.zip_code));
        const results = await Promise.all(promises);
        setLocations(
          results
            .map((result, index) =>
              result ? { ...toysData[index], ...result } : null
            )
            .filter((loc) => loc)
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocationsAsync();

    if (user) {
      getUserFavorites();
    }
  }, [toysData]);

  const checkIfToyExistsInFavorite = (arr, id) => {
    return arr.find((item) => item.toy_listing_id._id === id);
  };

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

  async function addFavorite(id) {
    const response = await fetch(`${apiUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toy_listing_id: id,
        user_id: authorizedUser,
      }),
    });
  }

  const handleMapClick = useCallback(() => {
    if (selectedLocation) {
      setSelectedLocation(null);
    }
  }, [selectedLocation]);

  const toggleFavorite = useCallback(async (event, id) => {
    event.stopPropagation();
    var fav = checkIfToyExistsInFavorite(currentFavoritesRef.current, id);
    if (!fav) {
      await addFavorite(id);
      await getUserFavorites();
    } else {
      await deleteFavorite(fav._id);
      await getUserFavorites();
    }
  }, []);

  async function deleteFavorite(favId) {
    const response = await fetch(`${apiUrl}/favorites/${favId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleShareClick = useCallback((event, id) => {
    event.stopPropagation();
    const url = `${window.location.origin}/toys/${id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => console.error("Failed to copy URL: ", err));
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
            >
              <Card sx={{ width: 345, position: "relative" }}>
                <CardActionArea
                  onClick={() => navigate(`/toys/${selectedLocation._id}`)}
                >
                  <CardHeader
                    avatar={
                      <LettersAvatar
                        firstName={selectedLocation.listed_by_id.first_name}
                        lastName={selectedLocation.listed_by_id.last_name}
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: 20,
                        }}
                      />
                    } // {Avatar aria-label="recipe">C</Avatar>}
                    title={selectedLocation.title}
                    subheader={selectedLocation.description}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={selectedLocation.imageUrl}
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
                  {user && (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={(event) =>
                        toggleFavorite(event, selectedLocation._id)
                      }
                    >
                      <FavoriteIcon
                        color={
                          checkIfToyExistsInFavorite(
                            favorites,
                            selectedLocation._id
                          )
                            ? "error"
                            : "inherit"
                        }
                      />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="share"
                    onClick={(event) =>
                      handleShareClick(event, selectedLocation._id)
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
    </>
  );
};

export default ToyListMap;

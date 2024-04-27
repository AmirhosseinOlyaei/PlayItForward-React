// ffprac-team4-front/src/components/CreateListing/LeftDrawer.jsx
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Button,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useLocation } from "react-router-dom";
import GoogleZip from "./GoogleZip";
import FetchSelectData from "./FetchSelectData";
import SuccessAlert from "./SuccessAlert";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 340;
const apiUrl = import.meta.env.VITE_API_URL;

const LeftDrawer = ({
  onTitleChange,
  title,
  onDescriptionChange,
  description,
  category,
  onCategoryChange,
  condition,
  onConditionChange,
  delivery,
  onDeliveryChange,
  onFileChange,
  selectedFile,
  onClearPhoto,
  onValueChangeLocation,
  value,
  onToyChange,
  toy,
  handleFetchedFile,
  userId,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("selectedFile", selectedFile);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiUrl}/toys/${id}`)
        .then((response) => {
          const toy = response.data;
          onTitleChange(toy.title);
          onDescriptionChange(toy.description);
          onCategoryChange(toy.category);
          onConditionChange(toy.condition);
          onDeliveryChange(toy.delivery_method);
          //onValueChangeLocation(toy.zip_code);
          onToyChange(toy);
          handleFetchedFile(new File([toy.imageUrl], `${toy.title}`).name);
          onFileChange(new File([toy.imageUrl], `${toy.title}`));
          setEditMode(true);
        })
        .catch((error) => {
          console.error("Error fetching toy data:", error);
        });
    }
  }, [id]);

  const handleZipCodeChange = (newValue) => {
    setZipCode(newValue);
  };
  const handleInputChangeTitle = (e) => {
    const newTitle = e.target.value;
    onTitleChange(newTitle);
  };
  const handleInputDescriptionChange = (e) => {
    const newDescription = e.target.value;
    onDescriptionChange(newDescription);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Unsupported file format. Please upload a JPEG, PNG, WebP, GIF, or SVG image."
      );
      return;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxFileSize) {
      alert("File size should not exceed 5 MB.");
      return;
    }

    onFileChange(file);
  };

  const maxLength = 30; // Maximum length for the file name including the three dots (...)

  const truncatedFileName = (fileName) => {
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength - 3)}...`
      : fileName;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !title ||
      !category ||
      !condition ||
      !delivery ||
      !description ||
      !zipCode ||
      !selectedFile
    ) {
      setError(true);
      return;
    }
    editMode ? axiosPutListing() : axiosPostListing();
    setError(false);
  };

  const axiosPutListing = async () => {
    const imageData = new FormData();
    imageData.append("file", selectedFile);
    const response = await axios.post(`${apiUrl}/images/upload`, imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    //const ImageUrl = response.data.url;
    const newImageUrl = response.data;
    console.log("newImageUrl", newImageUrl);

    const postData = {
      title,
      description,
      category,
      condition,
      delivery_method: delivery,
      zip_code: zipCode,
      imageUrl: selectedFile.type === "" ? toy.imageUrl : newImageUrl.url,
    };
    await axios
      .put(`${apiUrl}/toys/${id}`, postData)
      .then((res) => {
        setAlertOpen(true);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating toy:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const axiosPostListing = async () => {
    const imageData = new FormData();
    imageData.append("file", selectedFile);
    const response = await axios.post(`${apiUrl}/images/upload`, imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data.url;
    console.log("imageUrl", imageUrl);
    const postData = {
      title,
      description,
      category,
      condition,
      delivery_method: delivery,
      zip_code: zipCode,
      imageUrl: imageUrl,
      status: "available",
      listed_by_id: userId,
    };
    await axios
      .post(`${apiUrl}/toys`, postData)
      .then((response) => {
        console.log("Listing created successfully:", response.data);
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error("Error creating listing:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    window.location.reload();
    setEditMode(false);
    if (!editMode) {
      window.location.href = "/create";
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSmallScreen ? "100%" : drawerWidth,
        borderRight: isSmallScreen ? "none" : null,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isSmallScreen ? "100%" : drawerWidth,
          borderRight: isSmallScreen ? "none" : null,
          boxSizing: "border-box",
          marginTop: "86px",
          height: "calc(100vh - 100px)",
        },
      }}
      anchor="left"
    >
      <Box sx={{ overflow: "auto", mx: 2 }}>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Toy for Listing
        </Typography>
        <Divider sx={{ marginTop: 1.2, marginBottom: 2 }} />
        <Box
          sx={{ "& .MuiTextField-root": { marginTop: 3 } }}
          noValidate
          autoComplete="off"
        >
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box>
              <Button
                component="label"
                id="upload-input"
                role={undefined}
                variant="contained"
                size="large"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  marginTop: 2,
                  marginBottom: 1.2,
                  backgroundColor: "rgba(33, 150, 243, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 1)",
                  },
                }}
                fullWidth
              >
                Upload photo
                <VisuallyHiddenInput
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </Button>

              {selectedFile && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "41ch",
                    marginBottom: "12px",
                    fontSize: "15px",
                    gap: "5px",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ ml: 0.5 }}
                  >
                    {/* {selectedFile.name} */}
                    {selectedFile
                      ? truncatedFileName(selectedFile.name)
                      : "No file selected"}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onClearPhoto()}
                    sx={{ padding: 0, mr: 0, mb: 1, mt: 1 }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={title}
              onChange={handleInputChangeTitle}
              fullWidth
              InputProps={{
                style: {
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#1e1e1e",
                },
              }}
            />
            <GoogleZip
              onValueChangeLocation={onValueChangeLocation}
              value={value}
              onZipCodeChange={handleZipCodeChange}
              editMode={editMode}
            />
            <FetchSelectData
              category={category}
              onCategoryChange={onCategoryChange}
              condition={condition}
              onConditionChange={onConditionChange}
              delivery={delivery}
              onDeliveryChange={onDeliveryChange}
            />
            <TextField
              type="text"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleInputDescriptionChange}
              fullWidth
              InputProps={{
                style: {
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#1e1e1e",
                  maxLength: 1000,
                },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ marginTop: "15px", mr: 0.5 }}>
                Please fill in all fields.
              </Alert>
            )}
            <Divider sx={{ marginTop: "40px" }} />
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                marginTop: "30px",
                background: "#ff6600",
                bottom: "5px",
                "&:hover": { backgroundColor: "#ffa162" },
              }}
              fullWidth
            >
              {editMode ? "Save Changes" : "Publish"}
            </Button>
          </form>
          <SuccessAlert
            open={alertOpen}
            onClose={handleAlertClose}
            editMode={editMode}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default LeftDrawer;

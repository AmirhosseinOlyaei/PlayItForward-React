import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, Grid, TextField, Input } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import GoogleZip from "./GoogleZip";
import FetchSelectData from "./FetchSelectData";
import Alert from "@mui/material/Alert";
import SuccessAlert from "./SuccessAlert";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
}) => {
  console.log("selectedFile", selectedFile);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchToyData = () => {
      if (id) {
        axios
          .get(`${apiUrl}/toys/${id}`)
          .then((response) => {
            const toy = response.data;
            const fetchedFileName = new File([toy.imageUrl], `${toy.title}.jpg`)
              .name;
            console.log("FETCHEDFile", fetchedFileName);

            onTitleChange(toy.title);
            onDescriptionChange(toy.description);
            onCategoryChange(toy.category);
            onConditionChange(toy.condition);
            onDeliveryChange(toy.delivery_method);
            //onValueChangeLocation(toy.zip_code);
            onToyChange(toy);
            onFileChange(new File([toy.imageUrl], `${toy.title}.jpg`));
            handleFetchedFile(fetchedFileName);

            console.log("toy", toy);

            setEditMode(true);
          })
          .catch((error) => {
            console.error("Error fetching toy data:", error);
          });
      }
    };

    fetchToyData();
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
    onFileChange(e.target.files[0]);
    //console.log("handleFileInputChange", e.target.files[0]);
  };

  const maxLength = 32; // Maximum length for the file name including the three dots (...)

  const truncatedFileName = (fileName) => {
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength - 3)}...`
      : fileName;
  };

  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    console.log("Form data:", {
      title,
      category,
      condition,
      delivery,
      description,
      zipCode,
      selectedFile,
    });
    if (
      !title ||
      !category ||
      !condition ||
      !delivery ||
      !description ||
      !zipCode ||
      !selectedFile
    ) {
      //alert("Please fill in all fields.");
      setError(true);
    } else {
      console.log("");
      editMode ? axiosPutListing() : axiosPostListing();
      setError(false);
    }
  };

  // Send PUT request to update data in the database
  const axiosPutListing = async () => {
    // Send POST request to /images endpoint to upload the image

    const imageData = new FormData();
    imageData.append("image", selectedFile);
    console.log("selectedFile", selectedFile);
    const response = await axios.post(`${apiUrl}/images/upload`, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("POST Response:", response.data);
    const newImageUrl = response.data;
    const postData = {
      title: title,
      description: description,
      category: category,
      condition: condition,
      delivery_method: delivery,
      zip_code: zipCode,
      //zip_code: value === undefined ? toy.zip_code : zipCode,
      imageUrl:
        selectedFile.type === "image/jpeg"
          ? newImageUrl.file.url
          : toy.imageUrl,
    };
    await axios
      .put(`${apiUrl}/toys/${id}`, postData)
      .then((res) => {
        console.log("PUT Response:", res.data);
        setAlertOpen(true);
        setEditMode(false);
        console.log("Toy status updated successfully:", response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };

  const axiosPostListing = async () => {
    // Send POST request to /images endpoint to upload the image
    const imageData = new FormData();
    imageData.append("image", selectedFile);
    console.log("selectedFile", selectedFile);
    const response = await axios.post(`${apiUrl}/images/upload`, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // After successfully uploading the image Send POST request to /toys endpoint with itle, condition... and image URL
    // Assuming the backend responds with an object containing the image URL
    const imageUrl = response.data;
    console.log("Image URL:", imageUrl);

    const postData = {
      title: title,
      description: description,
      category: category,
      condition: condition,
      delivery_method: delivery,
      zip_code: zipCode,
      imageUrl: imageUrl.file.url,
      status: "available",
      listed_by_id: {
        _id: "6609a2873eaffef95345b9fb",
        email: "user3@example.com",
        first_name: "Emma",
        last_name: "Johnson",
        profile_picture: "https://example.com/profiles/user3.jpg",
      },
    };
    await axios
      .post(`${apiUrl}/toys`, postData)
      .then((response) => {
        console.log(response);
        //alert("Listing created successfully!");
        setAlertOpen(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    window.location.reload();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        display: "flex",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "86px",
          height: "calc(100vh - 90px)",
        },
      }}
      anchor="left"
    >
      <Box sx={{ overflow: "auto", ml: 1 }}>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Toy for Listing
        </Typography>
        <Divider sx={{ marginTop: 1.2, marginBottom: 2 }} />
        <Box
          sx={{
            "& .MuiTextField-root": { marginTop: 3, width: "40ch" },
          }}
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
                  marginTop: 1,
                  marginBottom: 2,
                  width: "38.3ch",
                  backgroundColor: "rgba(33, 150, 243, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 1)",
                  },
                }}
              >
                Upload photo
                <VisuallyHiddenInput
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </Button>

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
                variant="body1"
                color="textSecondary"
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ ml: 0.5 }}
                >
                  {selectedFile ? truncatedFileName(selectedFile.name) : ""}
                </Typography>

                {selectedFile && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onClearPhoto()}
                    sx={{ padding: 0, mr: 0, mb: 1 }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
              {/* )} */}
            </Box>
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={title}
              onChange={handleInputChangeTitle}
              InputProps={{
                style: {
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#1e1e1e",
                },
              }}
              // InputLabelProps={{
              //   style: {
              //     color: title ? null : "red",
              //   },
              // }}
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
              // InputLabelProps={{
              //   style: { color: description ? null : "red" },
              // }}
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
            <Divider
              sx={{
                marginTop: "40px",
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{
                marginTop: "30px",
                width: "38.3ch",
                background: "#ff6600",
                //position: "fixed",
                bottom: "5px",
                "&:hover": {
                  backgroundColor: "#ffa162",
                },
              }}
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

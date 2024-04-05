import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, Grid, TextField, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import GoogleMaps from "../ToyList/GoogleMaps";
import axios from "axios";
import GoogleZip from "./GoogleZip";
import FetchSelectData from "./FetchSelectData";

const drawerWidth = 340;

const categories = [
  "Action Figures",
  "Board Games",
  "Building Blocks",
  "Card Games",
  "Cars",
  "Dolls",
  "Plush",
  "Playsets",
  "Sports Toys",
  "Art & Craft",
  "Games & Puzzles",
  "Books",
  "Musical instruments",
  "Miscellaneous",
];
const conditions = ["New", "Like-new", "Lightly-used", "Heavily-used"];
const deliveryMethods = ["Pickup", "Delivery"];

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
}) => {
  // const [formData, setFormData] = useState({
  //   title: title,
  //   zip_code: value,
  //   category: category,
  //   condition: condition,
  //   delivery_method: delivery,
  //   description: description,
  // });

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

  console.log("zipCodefromIndex", zipCode);

  const handleZipCodeChange = (newValue) => {
    setZipCode(newValue);
  };
  const handleInputChangeTitle = (e) => {
    const newTitle = e.target.value;
    //setTitle(newTitle);
    onTitleChange(newTitle);
  };
  const handleInputDescriptionChange = (e) => {
    const newDescription = e.target.value;
    onDescriptionChange(newDescription);
  };
  const handleInputChangeCategory = (event) => {
    onCategoryChange(event.target.value);
  };
  const handleInputChangeCondition = (event) => {
    onConditionChange(event.target.value);
  };
  const handleInputChangeDelivery = (e) => {
    onDeliveryChange(e.target.value);
  };

  const handleFileInputChange = (e) => {
    onFileChange(e.target.files[0]);
  };
  // const handleUpload = () => {
  //   // You can handle file upload logic here
  //   console.log("Selected file:", selectedFile);
  // };

  const maxLength = 32; // Maximum length for the file name including the three dots (...)

  const truncatedFileName = (fileName) => {
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength - 3)}...`
      : fileName;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form data:", {
      title,
      category,
      condition,
      delivery,
      description,
      zipCode,
    });
    if (!title || !category || !condition || !delivery || !description) {
      alert("Please fill in all fields.");
    } else {
      console.log("");
      axiosPostListing();
    }
  };

  const axiosPostListing = async () => {
    const postData = {
      title: title,
      description: description,
      category: category,
      condition: condition,
      delivery_method: delivery,
      zip_code: zipCode,
      pictures: "https://source.unsplash.com/random/200x200?toy",
      status: "available",
    };
    await axios
      .post("http://localhost:8000/api/v1/toys", postData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          display: "flex",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "86px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ overflow: "auto", m: 1 }}>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Item for Listing
          </Typography>
          <Divider sx={{ marginTop: 1.2, marginBottom: 4 }} />

          <Box>
            <label htmlFor="upload-input">
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
            </label>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "41ch",
                marginBottom: "10px",
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
                  sx={{ padding: 0, mr: 0 }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            {/* )} */}
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { marginTop: 3, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                type="text"
                label="Title"
                value={title}
                onChange={handleInputChangeTitle}
              />
              <GoogleZip
                onValueChangeLocation={onValueChangeLocation}
                value={value}
                onZipCodeChange={handleZipCodeChange}
                // zipCode={zipCode}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ marginTop: 3.0, minWidth: "40ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="categoryselect"
                    value={category}
                    label="Category"
                    onChange={handleInputChangeCategory}
                  >
                    {categories.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value={"Art and Craft"}>Art and Craft</MenuItem>
                   <MenuItem value={"cars"}>cars</MenuItem>
                   <MenuItem value={"books"}>books</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
              <FormControl sx={{ marginTop: 3.0, minWidth: "40ch" }}>
                <InputLabel id="condition-select-label">Condition</InputLabel>
                <Select
                  labelId="condition-select-label"
                  id="condition-select"
                  value={condition}
                  label="Condition"
                  onChange={handleInputChangeCondition}
                >
                  {conditions.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"Used"}>Used</MenuItem>
                  <MenuItem value={"Like new"}>Like new</MenuItem> */}
                </Select>
              </FormControl>
              <FormControl sx={{ marginTop: 3.0, minWidth: "40ch" }}>
                <InputLabel id="delivery-select-label">Delivery</InputLabel>
                <Select
                  labelId="delivery-select-label"
                  id="delivery-select"
                  value={delivery}
                  label="Delivery"
                  onChange={handleInputChangeDelivery}
                >
                  {deliveryMethods.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={"Pickup"}>Pickup</MenuItem>
                  <MenuItem value={"Delivery"}>Delivery</MenuItem> */}
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={handleInputDescriptionChange}
                inputProps={{ maxLength: 1000 }}
              />

              <Divider sx={{ marginTop: "30px" }} />

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  marginTop: "30px",
                  width: "38.3ch",
                  background: "#ff6600",
                }}
              >
                Publish
              </Button>
            </form>
          </Box>
        </Box>
        <FetchSelectData />
      </Drawer>
    </>
  );
};
export default LeftDrawer;

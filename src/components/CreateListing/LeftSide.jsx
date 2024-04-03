import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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

const drawerWidth = 340;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LeftSide = ({
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
  onValueChangeZip,
  value,
}) => {
  const [formData, setFormData] = useState({
    title: title,
    category: category,
    condition: condition,
    delivery: delivery,
    description: description,
  });

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
  //Object to implement User
  // const userData = {
  //   zipCode: "11230",
  //   title: "ExampleTitle",
  //   category: "Select from DB",
  //   condition: "Select from DB",
  //   delivery: "Select from DB",
  //   description: "The Toy is very good",
  //   sellerName: "James Games",
  // };

  //To fill and storage ZipCode from User

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

  // const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInputChange = (e) => {
    onFileChange(e.target.files[0]);
    // setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    // You can handle file upload logic here
    console.log("Selected file:", selectedFile);
  };

  const maxLength = 37; // Maximum length for the file name including the three dots (...)

  const truncatedFileName = (fileName) => {
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength - 3)}...`
      : fileName;
  };

  const handleSubmitPublish = (event) => {
    event.preventDefault();
    //   try {
    //       // Send a POST request to the backend API with form data
    //       const response = await fetch'http://localhost:8000/api/v1/,
    //       { method: 'POST',
    //       body: JSON.stringify({ title, category, condition, delivery, description }),
    //       headers: { 'Content-Type': 'application/json'
    //       },
    //       });
    //       // Handle response
    //       const result = await response.json();
    //       console.log(result);
    //       });
    //     } catch (error) {
    //       console.error('Error submitting data:', error);
    //       alert('Error submitting data');
    //     }
    //   };
  };

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // if (loading) return <p>Loading...</p>;

  const mongoUrl = import.meta.env.MONGODB_URI;
  const baseUrl = "http://localhost:8000/api/v1/";
  fetch(baseUrl).then((res) => res.json().then((data) => console.log(data)));

  // const api = axios.create({
  //   baseURL: process.env.MONGODB_URI,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const fetchDataFromMongoDB = async () => {
  //   try {
  //     const response = await api.get("/api/data"); // Adjust endpoint as needed
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Error fetching data from MongoDB");
  //   }
  // };

  return (
    <>
      <Drawer
        sx={{
          marginTop: "64px",
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
        {/* <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div> */}
        <Box sx={{ overflow: "auto", m: 1 }}>
          <Typography variant="h5">Create Listing</Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <Box>
            <label htmlFor="upload-input">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ marginTop: 1, marginBottom: 2, width: "41ch" }}
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
            {/* {selectedFile && ( */}
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
              <Typography variant="body1" color="textSecondary">
                {selectedFile ? truncatedFileName(selectedFile.name) : ""}
              </Typography>

              {selectedFile && (
                <IconButton
                  aria-label="delete"
                  onClick={() => onClearPhoto()}
                  sx={{ padding: 0 }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            {/* )} */}
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { marginTop: 1.8, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <GoogleZip onValueChangeZip={onValueChangeZip} value={value} />
            {/* <TextField
              type="text"
              id="outlined-basic"
              label="Zip Code"
              value={zipCode}
              onChange={handleInputChangeZipCode}
              title="5 digit zip code"
              inputProps={{ maxLength: 5 }}
              helperText="5 digit zip code"
              required
            /> */}

            <form noValidate autoComplete="off" onSubmit={handleSubmitPublish}>
              <TextField
                id="outlined-basic"
                type="text"
                label="Title"
                value={title}
                onChange={handleInputChangeTitle}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ marginTop: 1.8, minWidth: "40ch" }}>
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
                    <MenuItem value={"Art and Craft"}>Art and Craft</MenuItem>
                    <MenuItem value={"cars"}>cars</MenuItem>
                    <MenuItem value={"books"}>books</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <FormControl sx={{ marginTop: 1.8, minWidth: "40ch" }}>
                <InputLabel id="condition-select-label">Condition</InputLabel>
                <Select
                  labelId="condition-select-label"
                  id="condition-select"
                  value={condition}
                  label="Condition"
                  onChange={handleInputChangeCondition}
                >
                  <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"Used"}>Used</MenuItem>
                  <MenuItem value={"Like new"}>Like new</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ marginTop: 1.8, minWidth: "40ch" }}>
                <InputLabel id="delivery-select-label">Delivery</InputLabel>
                <Select
                  labelId="delivery-select-label"
                  id="delivery-select"
                  value={delivery}
                  label="Delivery"
                  onChange={handleInputChangeDelivery}
                >
                  <MenuItem value={"Pickup"}>Pickup</MenuItem>
                  <MenuItem value={"Delivery"}>Delivery</MenuItem>
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

              <Divider sx={{ marginTop: "20px" }} />

              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "20px", width: "41ch", background: "#ff6600" }}
              >
                Publish
              </Button>
            </form>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
export default LeftSide;

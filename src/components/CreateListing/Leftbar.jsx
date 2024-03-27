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
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const drawerWidth = 365;

const Leftbar = () => {
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
  const userData = {
    zipCode: "11230",
    title: "ExampleTitle",
    category: "Select from DB",
    condition: "Select from DB",
    delivery: "Select from DB",
    description: "The Toy is very good",
    sellerName: "James Games",
  };

  const [zipCode, setZipCode] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery, setDelivery] = useState("");
  const [description, setDescription] = useState("");

  //To fill and storage ZipCode from User
  const handleInputChangeZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const handleInputChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeCondition = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeDelivery = (e) => {
    setDelivery(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    // You can handle file upload logic here
    console.log("Selected file:", selectedFile);
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
            backgroundColor: "#fff0",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", m: 1 }}>
          <Typography variant="h5">Create Listing</Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <div>
            <label htmlFor="upload-input">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ marginTop: 1, marginBottom: 2, width: "343px" }}
              >
                Upload photo
                <VisuallyHiddenInput
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </label>
            {selectedFile && (
              <Typography
                variant="body1"
                color="textSecondary"
                style={{
                  // marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "15px",
                }}
              >
                {selectedFile.name}
                <IconButton aria-label="delete">
                  <ClearIcon />
                </IconButton>
              </Typography>
            )}
          </div>
          <Box
            sx={{
              "& .MuiTextField-root": { marginTop: 1.8, width: "43ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              id="outlined-basic"
              label="Zip Code"
              value={zipCode}
              onChange={handleInputChangeZipCode}
              title="5 digit zip code"
              inputProps={{ maxLength: 5 }}
              helperText="5 digit zip code"
              required
            />

            <TextField
              id="outlined-basic"
              type="text"
              label="Title"
              value={title}
              onChange={handleInputChangeTitle}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ marginTop: 1.8, minWidth: 343 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="categoryselect"
                  value={category}
                  label="Category"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={"Art and Craft"}>Art and Craft</MenuItem>
                  <MenuItem value={"cars"}>cars</MenuItem>
                  <MenuItem value={"books"}>books</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl sx={{ marginTop: 1.8, minWidth: 343 }}>
              <InputLabel id="condition-select-label">Condition</InputLabel>
              <Select
                labelId="condition-select-label"
                id="condition-select"
                value={condition}
                label="Condition"
                onChange={handleChangeCondition}
              >
                <MenuItem value={"new"}>New</MenuItem>
                <MenuItem value={"used"}>Used</MenuItem>
                <MenuItem value={"like new"}>Like new</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginTop: 1.8, minWidth: 343 }}>
              <InputLabel id="delivery-select-label">Delivery</InputLabel>
              <Select
                labelId="delivery-select-label"
                id="delivery-select"
                value={delivery}
                label="Delivery"
                onChange={handleChangeDelivery}
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
              onChange={handleChangeDescription}
              inputProps={{ maxLength: 1000 }}
            />
          </Box>
          <Divider sx={{ marginTop: "20px" }} />

          <Button
            variant="contained"
            sx={{ marginTop: "20px", width: "343px", background: "#ff6600" }}
          >
            Publish
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Leftbar;

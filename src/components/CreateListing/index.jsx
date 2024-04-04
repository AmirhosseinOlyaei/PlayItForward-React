import Box from "@mui/material/Box";
import { Container, Button, Input } from "@mui/material";
import { useState } from "react";
import LeftDrawer from "./LeftDrawer";
import ToyListingPreview from "./ToyListingPreview";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery, setDelivery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [googleValue, setGoogleValue] = useState(null);
  const [value, setValue] = useState(null);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const handleConditionChange = (newCondition) => {
    setCondition(newCondition);
  };
  const handleDeliveryChange = (newDelivery) => {
    setDelivery(newDelivery);
  };

  const handleFileChange = (newFile) => {
    setSelectedFile(newFile);
  };
  const handleClearPhoto = () => {
    setSelectedFile(null);
  };
  const handleInputChange = (newvalue) => {
    setGoogleValue(newvalue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Container sx={{ display: "flex" }}> */}
      <LeftDrawer
        onTitleChange={handleTitleChange}
        title={title}
        onDescriptionChange={handleDescriptionChange}
        description={description}
        onCategoryChange={handleCategoryChange}
        category={category}
        onConditionChange={handleConditionChange}
        condition={condition}
        onDeliveryChange={handleDeliveryChange}
        delivery={delivery}
        onFileChange={handleFileChange}
        selectedFile={selectedFile}
        onClearPhoto={handleClearPhoto}
        onValueChangeZip={handleValueChange}
        value={value}
        onInputChange={handleInputChange}
        googleValue={googleValue}
      />

      <ToyListingPreview
        title={title}
        description={description}
        condition={condition}
        delivery={delivery}
        selectedFile={selectedFile}
        googleValue={googleValue}
        value={value}
      />

      {/* <RightCardForm
        title={title}
        description={description}
        condition={condition}
        delivery={delivery}
        selectedFile={selectedFile}
        googleValue={googleValue}
        value={value}
      /> */}

      {/* </Container> */}
    </Box>
  );
};

export default CreateListing;

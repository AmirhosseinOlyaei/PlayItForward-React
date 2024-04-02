import styles from "./CreateListing.module.css";
import { Container, Button, Input } from "@mui/material";
import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const CreateListing = ({ onInputChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery, setDelivery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [googleValue, setGoogleValue] = useState(null);

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
    <Container sx={{ display: "flex" }}>
      <LeftSide
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onCategoryChange={handleCategoryChange}
        onConditionChange={handleConditionChange}
        onDeliveryChange={handleDeliveryChange}
        onFileChange={handleFileChange}
        onClearPhoto={handleClearPhoto}
        onInputChange={handleInputChange}
        selectedFile={selectedFile}
        title={title}
        description={description}
        category={category}
        condition={condition}
        delivery={delivery}
      />
      <RightSide
        title={title}
        description={description}
        condition={condition}
        delivery={delivery}
        selectedFile={selectedFile}
        googleValue={googleValue}
      />
    </Container>
  );
};

export default CreateListing;

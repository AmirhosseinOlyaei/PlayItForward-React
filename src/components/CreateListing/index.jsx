import styles from "./CreateListing.module.css";
import { Container, Button, Input } from "@mui/material";
import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery, setDelivery] = useState("");
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

  return (
    <Container sx={{ display: "flex" }}>
      <LeftSide
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onCategoryChange={handleCategoryChange}
        onConditionChange={handleConditionChange}
        onDeliveryChange={handleDeliveryChange}
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
      />
    </Container>
  );
};

export default CreateListing;

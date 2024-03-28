import { Container, Button, Input } from "@mui/material";
import Leftbar from "./Leftbar";
import Rightfeed from "./Rightfeed";
import { useState } from "react";

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
      <Leftbar
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
      <Rightfeed
        title={title}
        description={description}
        condition={condition}
        delivery={delivery}
      />
    </Container>
  );
};

export default CreateListing;

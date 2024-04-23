import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const apiUrl = import.meta.env.VITE_API_URL;

export default function FetchSelectData({
  category,
  onCategoryChange,
  condition,
  onConditionChange,
  delivery,
  onDeliveryChange,
}) {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [deliveriesMethod, setDeliveriesMethod] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch names list for selector Catgory
        const response1 = await fetch(`${apiUrl}/toys/enums/category`);
        const data1 = await response1.json();
        setCategories(data1);

        // Fetch names list for selector Conditions
        const response2 = await fetch(`${apiUrl}/toys/enums/condition`);
        const data2 = await response2.json();
        setConditions(data2);

        // Fetch names list for selector Delivery_Method
        const response3 = await fetch(`${apiUrl}/toys/enums/delivery_method`);
        const data3 = await response3.json();
        setDeliveriesMethod(data3);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChangeCategory = (event) => {
    onCategoryChange(event.target.value);
  };
  const handleInputChangeCondition = (event) => {
    onConditionChange(event.target.value);
  };
  const handleInputChangeDelivery = (e) => {
    onDeliveryChange(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginTop: 3.0, minWidth: "40ch" }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          id="category"
          name="category"
          labelId="category-select-label"
          value={category}
          label="Category"
          onChange={handleInputChangeCategory}
          // SelectLabelProps={{
          //   style: category ? "red" : null,
          // }}
        >
          {categories.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ marginTop: 3.0, minWidth: "40ch" }} fullWidth>
        <InputLabel id="condition-select-label">Condition</InputLabel>
        <Select
          id="condition"
          labelId="condition-select-label"
          name="condition"
          value={condition}
          label="Condition"
          onChange={handleInputChangeCondition}
        >
          {conditions.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: 3.0, minWidth: "40ch" }} fullWidth>
        <InputLabel id="delivery-select-label">Delivery Method</InputLabel>
        <Select
          labelId="delivery-select-label"
          name="delivery"
          id="delivery-select-label"
          value={delivery}
          label="Delivery Method"
          onChange={handleInputChangeDelivery}
        >
          {deliveriesMethod.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

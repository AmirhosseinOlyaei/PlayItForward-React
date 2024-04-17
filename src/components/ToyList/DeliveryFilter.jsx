// src/components/ToyList/DeliveryFilter.jsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function DeliveryFilter({ delivery, setDelivery }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-delivery-label">Delivery Method</InputLabel>
      <Select
        labelId="select-delivery-label"
        id="delivery-select"
        value={delivery}
        label="Delivery Method"
        onChange={(event) => setDelivery(event.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pickup">Pick up</MenuItem>
        <MenuItem value="Delivery">Drop off</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DeliveryFilter;

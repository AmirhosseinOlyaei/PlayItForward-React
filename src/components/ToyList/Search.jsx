// src/components/ToyList/Search.jsx
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ onSearchChange }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onSearchChange(newValue);
    }, 2000); // 500 ms delay
    setTimer(newTimer);
  };

  return (
    <TextField
      fullWidth
      label="Search Toys"
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

// // src/components/ToyList/Search.jsx
import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ onSearchChange }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Set focus on the input field when the component is rendered
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    onSearchChange(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      fullWidth
      label="Search Toys"
      variant="outlined"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown} // Use onKeyDown instead of onKeyPress
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={inputRef}
    />
  );
}

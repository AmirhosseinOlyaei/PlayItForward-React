// src/components/ToyList/Category.jsx
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Typography,
} from "@mui/material";

const categories = [
  "Arts & Crafts",
  "Books",
  "Cars",
  "Dolls",
  "Clothes",
  "Plush",
  "Sports",
  "Playsets",
  "Health",
  "Educational Toys",
  "Outdoor Play",
  "Games",
  "Puzzles",
  "Electronic Toys",
  "Action Figures",
  "Building Blocks",
  "Musical instruments",
  "Baby and Toddler Toys",
  "Costumes and Pretend Play",
  "Miscellaneous",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCategories, theme) {
  return {
    fontWeight:
      selectedCategories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Category({ setSelectedCategories }) {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategoriesState] = useState([]);

  const handleChange = (event) => {
    const value =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    setSelectedCategoriesState(value);
    setSelectedCategories(value);
  };

  return (
    <div>
      <Typography variant="h6" my={1.5}>
        Categories
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Toy</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Toy" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedCategories, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Category;

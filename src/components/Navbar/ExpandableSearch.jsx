// src/components/Navbar/ExpandableSearch.jsx
import React, { useState } from "react";
import { IconButton, InputBase, Paper, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery(""); // Optionally clear search query on collapse
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ClickAwayListener onClickAway={handleCollapse}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: isExpanded ? 240 : 48,
          transition: "width 300ms ease-in-out",
        }}
      >
        <IconButton type="button" onClick={handleExpand} sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
        {isExpanded && (
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            autoFocus
            value={searchQuery}
            onChange={handleSearchChange}
          />
        )}
      </Paper>
    </ClickAwayListener>
  );
}

export default ExpandableSearch;

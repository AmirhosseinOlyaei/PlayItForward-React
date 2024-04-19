// // src/components/Navbar/ExpandableSearch.jsx
// import React, { useState } from "react";
// import { IconButton, InputBase, Paper, ClickAwayListener } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// function ExpandableSearch() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleExpand = () => {
//     setIsExpanded(true);
//   };

//   const handleCollapse = () => {
//     setIsExpanded(false);
//     setSearchQuery(""); // Optionally clear search query on collapse
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <ClickAwayListener onClickAway={handleCollapse}>
//       <Paper
//         component="form"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           width: isExpanded ? 240 : 44,
//           borderRadius: 20,
//           transition: "width 300ms ease-in-out",
//         }}
//       >
//         <IconButton
//           type="button"
//           onClick={handleExpand}
//           sx={{ pl: "10px", py: "1px" }}
//         >
//           <SearchIcon />
//         </IconButton>
//         {isExpanded && (
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search…"
//             inputProps={{ "aria-label": "search" }}
//             autoFocus
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         )}
//       </Paper>
//     </ClickAwayListener>
//   );
// }

// export default ExpandableSearch;

import React, { useState } from "react";
import { IconButton, InputBase, Paper, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function ExpandableSearch({ onSearchChange }) {
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

  const handleSearch = () => {
    onSearchChange(searchQuery);
    handleCollapse(); // Optional: collapse after search
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleCollapse}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: isExpanded ? 240 : 44,
          borderRadius: 20,
          transition: "width 300ms ease-in-out",
          overflow: "hidden", // Ensures the content does not overflow during transition
          bgcolor: "#f5f5f5",
        }}
      >
        <IconButton
          type="button"
          onClick={handleExpand}
          sx={{ pl: "10px", py: "1px" }}
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>
        {isExpanded && (
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Toys"
            autoFocus
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        )}
      </Paper>
    </ClickAwayListener>
  );
}

export default ExpandableSearch;

import React from "react";
import {
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MapIcon from "@mui/icons-material/Map";

function CustomToolbar({ viewType, setViewType }) {
  const handleChange = (event, newView) => {
    setViewType(newView === "map");
  };

  return (
    <Toolbar>
      <ToggleButtonGroup
        orientation="horizontal"
        value={viewType ? "map" : "module"}
        exclusive
        onChange={handleChange}
      >
        <Tooltip title="Grid View">
          <ToggleButton value="module" aria-label="grid view">
            <ViewModuleIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Map View">
          <ToggleButton value="map" aria-label="map view">
            <MapIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

export default CustomToolbar;

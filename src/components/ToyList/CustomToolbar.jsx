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
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <ToggleButtonGroup
        orientation="horizontal"
        sx={{ width: "100%" }}
        value={viewType ? "map" : "module"}
        exclusive
        onChange={handleChange}
      >
        <Tooltip title="Grid View" placement="bottom">
          <ToggleButton
            value="module"
            aria-label="grid view"
            sx={{ width: "50%" }}
          >
            <ViewModuleIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Map View" placement="bottom">
          <ToggleButton value="map" aria-label="map view" sx={{ width: "50%" }}>
            <MapIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

export default CustomToolbar;

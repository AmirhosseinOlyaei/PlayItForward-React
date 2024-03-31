import React from "react";
import {
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MapIcon from "@mui/icons-material/Map";

function GridView() {
  return <div>Grid View Content</div>;
}

function MapView() {
  return <div>Map View Content</div>;
}

function CustomToolbar() {
  const [view, setView] = React.useState("module");

  const handleChange = (event, newView) => {
    setView(newView);
  };

  return (
    <>
      <Toolbar>
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
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
      {view === "module" ? <GridView /> : <MapView />}
    </>
  );
}

export default CustomToolbar;

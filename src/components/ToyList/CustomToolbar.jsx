import React from "react";
import { Toolbar, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

function CustomToolbar() {
  const [view, setView] = React.useState("module");

  const handleChange = (event, newView) => {
    setView(newView);
  };

  return (
    <Toolbar>
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

export default CustomToolbar;

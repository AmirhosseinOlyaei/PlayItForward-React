// Not being utilized

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function RadiusSelector({ radius, setRadius }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Radius</InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
        value={radius}
        fullWidth
        label="Radius"
        onChange={(event) => setRadius(event.target.value)}
      >
        <MenuItem value="1">Within 1 miles</MenuItem>
        <MenuItem value="2">Within 2 miles</MenuItem>
        <MenuItem value="5">Within 5 miles</MenuItem>
        <MenuItem value="10">Within 10 miles</MenuItem>
      </Select>
    </FormControl>
  );
}

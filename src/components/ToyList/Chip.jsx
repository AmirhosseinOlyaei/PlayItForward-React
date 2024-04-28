import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Chips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={`{toys.length} toys found`} />
      <Chip label="Chip Outlined" variant="outlined" />
    </Stack>
  );
}

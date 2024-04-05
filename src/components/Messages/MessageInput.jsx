import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function MessageInput({ recipient, onSend }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ position: "sticky", bottom: 0, bgcolor: "background.paper", p: 2 }}
    >
      <Grid item xs={9}>
        <TextField
          label={`Reply to ${recipient}`}
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
        />
      </Grid>
      <Grid item xs={3} style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default MessageInput;

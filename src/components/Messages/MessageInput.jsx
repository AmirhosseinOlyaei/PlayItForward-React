import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function MessageInput({ recipient, onSend, fetchMessages }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "6609a2873eaffef95345b9fc",
          toy_id: "660c4de20dab29b8bab994fc",
          date: new Date().toISOString(),
          subject: `Message to ${recipient}`,
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setMessage("");
      onSend(message);
      // fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
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
          disabled={loading || message.trim() === ""}
          onClick={handleSendMessage}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Grid>
    </Grid>
  );
}
export default MessageInput;

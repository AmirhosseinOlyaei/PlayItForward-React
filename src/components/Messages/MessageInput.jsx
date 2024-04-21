import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function MessageInput({ recipient, currentMessage, onSend, fetchMessages }) {
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
          user_id_from: "6609a2873eaffef95345b9fa",
          user_id_to: "6609a2873eaffef95345b9f9",
          toy_listing_id: "660c4de20dab29b8bab994f8",
          date: new Date().toISOString(),
          subject: `Re:${currentMessage.subject}`,
          content: `${message}<br/>---------------<br/>${currentMessage.content}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Wait for the fetchMessages to complete
      await fetchMessages();

      // setMessage("");
      onSend(message);
      setLoading(false);
      // Clear message after a brief delay to ensure UI updates
      setTimeout(() => {
        setMessage("");
      }, 100);
      // setMessage("");
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
      <Grid item xs={12} sm={12} md={12} lg={10}>
        <TextField
          label={`Reply to ${recipient}`}
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
          disabled={!currentMessage}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || message.trim() === "" || !currentMessage}
          onClick={handleSendMessage}
          style={
            message.trim() !== ""
              ? { backgroundColor: "rgba(33, 150, 253, 0.8)" }
              : null
          }
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Grid>
    </Grid>
  );
}
export default MessageInput;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Paper } from "@mui/material";
import MessageInput from "./MessageInput";

const MailContent = ({ message }) => {
  const [sentMessages, setSentMessages] = useState([]);
  const [open, setOpen] = useState({ reply: false, delete: false });

  const handleSend = (messageContent) => {
    setSentMessages([
      ...sentMessages,
      { sender: message.name, ...messageContent },
    ]);
    setOpen({ ...open, reply: true });
  };

  const handleSnackbarClose = (action) => {
    setOpen({ ...open, [action]: false });
  };

  if (!message) {
    return <Typography>No message selected</Typography>;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 600,
        borderRadius: "sm",
        p: 2,
        mb: 3,
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar src="message.avatar" srcSet="message.avatar2x" />
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" textColor="text.primary" mb={0.5}>
              {message.name}
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              {message.date}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "32px",
            flexDirection: "row",
            gap: 1.5,
          }}
        >
          <Button
            size="sm"
            variant="plain"
            color="neutral"
            startIcon={<ReplyRoundedIcon />}
            onClick={() => setOpen({ ...open, reply: true })}
          >
            Reply
          </Button>
          <Snackbar
            color="success"
            open={open.reply}
            onClose={() => handleSnackbarClose("reply")}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Your message has been sent."
            action={
              <Button
                onClick={() => handleSnackbarClose("reply")}
                size="small"
                variant="text"
                color="inherit"
                // size="sm"
                // variant="soft"
                // color="neutral"
              >
                Dismiss
              </Button>
            }
          />

          <Button
            size="sm"
            variant="plain"
            color="danger"
            startIcon={<DeleteRoundedIcon />}
            onClick={() => setOpen({ ...open, delete: true })}
          >
            Delete
          </Button>
          <Snackbar
            color="danger"
            open={open.delete}
            onClose={() => handleSnackbarClose("delete")}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Your message has been deleted."
            action={
              <Button
                onClick={() => handleSnackbarClose("delete")}
                size="small"
                variant="text"
                color="inherit"
                // size="sm"
                // variant="soft"
                // color="neutral"
              >
                Dismiss
              </Button>
            }
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography
          level="title-lg"
          textColor="text.primary"
          endDecorator={
            <Chip component="span" size="sm" variant="outlined" color="warning">
              Personal
            </Chip>
          }
        >
          {message.title}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: "inline-block" }}
            >
              From
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
                {message.email}
              </Chip>
            </Tooltip>
          </div>
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: "inline-block" }}
            >
              to
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
                {message.recipientEmail}
              </Chip>
            </Tooltip>
          </div>
        </Box>
      </Box>
      <Divider />
      <Typography level="body-sm" mt={2} mb={2}>
        {message.body}
      </Typography>
      <Divider />
      <MessageInput recipient={message.name} onSend={handleSend} />
    </Paper>
  );
};

export default MailContent;

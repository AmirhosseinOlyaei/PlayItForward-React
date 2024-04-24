import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Paper } from "@mui/material";
import MessageInput from "./MessageInput";
import BackgroundLetterAvatars from "./Avatar";
import StarRating from "./StartRating";
import toast, { Toaster } from "react-hot-toast";

const MailContent = ({ message, fetchMessages, onDelete, loggedInUserId }) => {
  const [sentMessages, setSentMessages] = useState([]);
  const [open, setOpen] = useState({
    reply: false,
    delete: false,
    showRating: false,
    ratingToastDisplayed: false,
  });

  const showRatingToast = () => {
    console.log("showRatingToast function called.");

    if (
      !open.ratingToastDisplayed &&
      message.user_id_from._id !== loggedInUserId
    ) {
      setOpen((prevOpen) => ({ ...prevOpen, ratingToastDisplayed: true }));
      toast(
        (t) => (
          <div>
            Would you like to rate the user?
            <button
              onClick={() => handleRatingSubmit(t.id, true)}
              style={{
                backgroundColor: "rgba(33, 150, 253, 0.8)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "1px",
                border: "none",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => handleRatingDismiss(t.id)}
              style={{
                backgroundColor: "rgba(33, 150, 253, 0.8)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
              }}
            >
              No
            </button>
          </div>
        ),
        { id: "rating-toast" }
      );
    }
  };

  const handleRatingSubmit = (toastId, showRating) => {
    toast.dismiss(toastId);
    if (showRating) {
      setOpen({ ...open, showRating: true });
      const senderNameElement = document.getElementById("sender-name");
      if (senderNameElement) {
        senderNameElement.removeEventListener("mouseenter", showRatingToast);
      }
    }
  };

  const handleRatingDismiss = (toastId) => {
    toast.dismiss(toastId);
    setOpen({ ...open, ratingToastDisplayed: false });
  };
  useEffect(() => {
    console.log("useEffect hook executed");
    const senderNameElement = document.getElementById("sender-name");
    if (senderNameElement) {
      senderNameElement.addEventListener("mouseenter", showRatingToast);

      return () => {
        senderNameElement.removeEventListener("mouseenter", showRatingToast);
      };
    }
  }, [message, loggedInUserId]);

  // useEffect(() => {
  //   if (message) {
  //     fetchSenderDetails(message.user_id_from)
  //       .then((senderData) => setSender(senderData))
  //       .catch((error) =>
  //         console.error("Error fetching sender details:", error)
  //       );

  //     fetchReceiverDetails(message.user_id_to)
  //       .then((receiverData) => setReceiver(receiverData))
  //       .catch((error) =>
  //         console.error("Error fetching receiver details:", error)
  //       );
  //   }
  // }, [message]);

  // const fetchSenderDetails = async (userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/users/$(userId)`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching sender details:", error);
  //   }
  // };

  // const fetchReceiverDetails = async (userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/users/$(userId)`);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching receiver details:", error);
  //   }
  // };

  const handleSend = (messageContent) => {
    const senderName = `${message.user_id_from.first_name} ${message.user_id_from.last_name}`;
    const messageWithSender = `${senderName}: ${message.content}`;
    setSentMessages([
      ...sentMessages,
      { sender: message.subject, messageWithSender, ...messageContent },
    ]);
    setOpen({ ...open, reply: true });
  };

  const handleSnackbarClose = (action) => {
    setOpen({ ...open, [action]: false });
  };

  const handleDelete = () => {
    onDelete(message._id);
    setOpen({ ...open, delete: true });
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        console.log("Email copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying email to clipboard:", error);
      });
  };

  return (
    <>
      <Toaster />
      <Paper
        variant="outlined"
        sx={{
          minHeight: 800,
          borderRadius: "sm",
          p: 2,
          mb: 3,
          mt: 8,
          position: "relative",
        }}
      >
        {!message ? (
          <>
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
                <Avatar />
                <Box sx={{ ml: 2 }}>
                  <Typography level="title-sm" mb={0.5}>
                    Name
                  </Typography>
                  <Typography level="body-xs">Date</Typography>
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
                <Button size="sm" variant="plain" color="danger" disabled>
                  Delete
                </Button>
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
                enddecorator={
                  <Chip
                    component="span"
                    size="sm"
                    variant="outlined"
                    color="warning"
                    label="Personal"
                  />
                }
              >
                Subject
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

                  <Chip
                    label="sender's first and last name"
                    size="sm"
                    variant="soft"
                    color="primary"
                    style={{ backgroundColor: "rgba(33, 150, 253, 0.8)" }}
                    onClick={() => {}}
                  />
                </div>
                <div>
                  <Typography
                    component="span"
                    level="body-sm"
                    sx={{ mr: 1, display: "inline-block" }}
                  >
                    to
                  </Typography>

                  <Chip
                    label="receiver's first and last name"
                    size="sm"
                    variant="soft"
                    color="primary"
                    style={{ backgroundColor: "rgba(33, 150, 253, 0.8)" }}
                    onClick={() => {}}
                  />
                </div>
              </Box>
            </Box>
            <Divider />
            <Typography level="body-sm" mt={2} mb={2}>
              Content
            </Typography>
            <Divider />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                mt: 4,
                p: 2,
              }}
            >
              <MessageInput recipient="Name" />
            </Box>
          </>
        ) : (
          <>
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
                <BackgroundLetterAvatars
                  firstName={message.user_id_from.first_name}
                  lastName={message.user_id_from.last_name}
                />
                <Box sx={{ ml: 2 }} id="sender-name">
                  <Typography level="title-sm" mb={0.5}>
                    {message.user_id_from.first_name}{" "}
                    {message.user_id_from.last_name}
                  </Typography>
                  {open.showRating && (
                    <StarRating
                      onClose={handleRatingDismiss}
                      message={message}
                      loggedInUserId={loggedInUserId}
                      setOpen={setOpen}
                      open={open}
                    />
                  )}
                  <Typography level="body-xs">
                    {new Date(message.sent_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "32px",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                  padding: 0,
                }}
              >
                <ListItemButton onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItemButton>
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
                enddecorator={
                  <Chip
                    component="span"
                    size="sm"
                    variant="outlined"
                    color="warning"
                    label="Personal"
                  />
                }
              >
                {message.subject}
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
                    <Chip
                      label={`${message.user_id_from.first_name} ${message.user_id_from.last_name}`}
                      size="sm"
                      variant="soft"
                      color="primary"
                      style={{ backgroundColor: "rgba(33, 150, 253, 0.8)" }}
                      onClick={() =>
                        handleCopyEmail(message.user_id_from.email)
                      }
                    />
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
                    <Chip
                      label={`${message.user_id_to.first_name} ${message.user_id_to.last_name}`}
                      size="sm"
                      variant="soft"
                      color="primary"
                      style={{ backgroundColor: "rgba(33, 150, 253, 0.8)" }}
                      onClick={() => handleCopyEmail(message.user_id_to.email)}
                    />
                  </Tooltip>
                </div>
              </Box>
            </Box>
            <Divider />
            <Typography level="body-sm" mt={2} mb={2}>
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
            </Typography>
            <Divider />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                mt: 4,
                p: 2,
              }}
            >
              <MessageInput
                currentMessage={message}
                recipient={`${message.user_id_from.first_name} ${message.user_id_from.last_name}`}
                onSend={handleSend}
                fetchMessages={fetchMessages}
                loggedInUserId={loggedInUserId}
              />
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default MailContent;

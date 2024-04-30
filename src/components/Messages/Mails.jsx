import React, { useState, useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/material/ListItemButton";
import SearchMessage from "./SearchMessage";
import BackgroundLetterAvatars from "./Avatar";
import UserContext from "../../context/userContext";

const Mails = ({
  index,
  onSearchChange,
  filteredMessages,
  onMessageSelect,
}) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);
  const user = useContext(UserContext);

  const handleMessageSelect = (message, index) => {
    const updatedMessages = [...filteredMessages];
    updatedMessages[index].read = true;
    onMessageSelect(updatedMessages[index]);
    setSelectedMessageIndex(index);
  };
  debugger;
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 600,
        borderRadius: "sm",
        p: 2,
        mb: 3,
        mt: 8,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <SearchMessage onSearchChange={onSearchChange} />
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 0 }}>
        <List
          sx={{
            [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
              {
                borderLeft: "2px solid",
                borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
              },
          }}
        >
          {filteredMessages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem index={index}>
                <ListItemButton
                  onClick={() => handleMessageSelect(message, index)}
                  selected={selectedMessageIndex === index}
                  sx={{
                    p: 2,
                    backgroundColor:
                      selectedMessageIndex === index
                        ? "var(--joy-palette-primary-selected)"
                        : "inherit",
                  }}
                >
                  <Divider sx={{ alignSelf: "flex-start" }}>
                    {message.user_id_from.profile_picture ? (
                      <Avatar
                        src={message.user_id_from.profile_picture}
                        variant="rounded"
                        style={{ width: 54, height: 54, borderRadius: 27 }}
                        alt="profile picture"
                      />
                    ) : (
                      <BackgroundLetterAvatars
                        firstName={message.user_id_from.first_name}
                        lastName={message.user_id_from.last_name}
                      />
                    )}
                  </Divider>
                  <Box sx={{ pl: 2, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography level="body-xs">
                          {message.user_id_from.first_name}{" "}
                          {message.user_id_from.last_name}
                        </Typography>
                        <Box
                          sx={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "99px",
                            bgcolor: message.color,
                          }}
                        />
                      </Box>
                      <Typography level="body-xs">
                        {new Date(message.sent_date).toLocaleDateString()},{" "}
                        {new Date(message.sent_date).toLocaleTimeString([], {
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </Typography>
                    </Box>
                    <div>
                      <Typography
                        level="title-sm"
                        sx={{ mb: 0.5, fontWeight: "bold" }}
                      >
                        {message.subject}
                      </Typography>
                      <Typography level="body-sm">
                        <div
                          dangerouslySetInnerHTML={{ __html: message.content }}
                        />
                      </Typography>
                    </div>
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: 0 }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Mails;

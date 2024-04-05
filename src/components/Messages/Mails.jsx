import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/material/ListItemButton";
import SearchMessage from "./SearchMessage";

export default function Mails({
  index,
  onSearchChange,
  filteredMessages,
  onMessageSelect,
}) {
  const handleMessageSelect = (message) => {
    onMessageSelect(message);
  };

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
            // <React.Fragment key={index}>

            <>
              <ListItem index={index}>
                <ListItemButton
                  onClick={() => handleMessageSelect(message)}
                  {...(index === 0 && {
                    selected: true,
                    color: "neutral",
                  })}
                  sx={{ p: 2 }}
                >
                  <Divider sx={{ alignSelf: "flex-start" }}>
                    <Avatar
                      alt=""
                      src="https://avatar.iran.liara.run/public/62"
                    />
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
                        <Typography level="body-xs">Doina F</Typography>
                        <Box
                          sx={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "99px",
                            bgcolor: message.color,
                          }}
                        />
                      </Box>
                      <Typography level="body-xs" textColor="text.tertiary">
                        {new Date(message.sent_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <div>
                      <Typography level="title-sm" sx={{ mb: 0.5 }}>
                        {message.subject}
                      </Typography>
                      <Typography level="body-sm">{message.content}</Typography>
                    </div>
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: 0 }} />
              {/* // </React.Fragment> */}
            </>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

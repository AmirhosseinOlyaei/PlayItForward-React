import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Mails from "./Mails";
import MailContent from "./MailContent";

const drawerWidth = 140;
const inboxMessages = [
  {
    id: 1,
    name: "Alex Jonnold",
    avatar: "https://i.pravatar.cc/40?img=3",
    avatar2x: "https://i.pravatar.cc/80?img=3",
    date: "21 Oct 2022",
    title: "Details for our Yosemite Park hike",
    body: "Hello, my friend! So, it seems that we are getting there…",
    color: "warning.400",
  },
  {
    id: 2,
    name: "Pete Sand",
    avatar: "https://i.pravatar.cc/40?img=4",
    avatar2x: "https://i.pravatar.cc/80?img=4",
    date: "06 Jul 2022",
    title: "Tickets for our upcoming trip",
    body: "Good day, mate! It seems that our tickets just arrived…",
    color: "success.400",
  },
  {
    id: 3,
    name: "Kate Gates",
    avatar: "https://i.pravatar.cc/40?img=5",
    avatar2x: "https://i.pravatar.cc/80?img=5",
    date: "16 May 2022",
    title: "Brunch this Saturday?",
    body: "Hey! I'll be around the city this weekend, how about a…",
    color: "primary.500",
  },
  {
    id: 4,
    name: "John Snow",
    avatar: "https://i.pravatar.cc/40?img=7",
    avatar2x: "https://i.pravatar.cc/80?img=7",
    date: "10 May 2022",
    title: "Exciting News!",
    body: "Hello there! I have some exciting news to share with you...",
    color: "danger.500",
  },
];

const sentMessages = [
  {
    id: 1,
    name: "Doina F",
    avatar: "https://i.pravatar.cc/40?img=3",
    avatar2x: "https://i.pravatar.cc/80?img=3",
    date: "21 Oct 2022",
    title: "Details for our Yosemite Park hike",
    body: "Hello, my friend! So, it seems that we are getting there…",
    color: "warning.400",
  },
  {
    id: 2,
    name: "Amir O",
    avatar: "https://i.pravatar.cc/40?img=4",
    avatar2x: "https://i.pravatar.cc/80?img=4",
    date: "06 Jul 2022",
    title: "Tickets for our upcoming trip",
    body: "Good day, mate! It seems that our tickets just arrived…",
    color: "success.400",
  },
  {
    id: 3,
    name: "Hanna A",
    avatar: "https://i.pravatar.cc/40?img=5",
    avatar2x: "https://i.pravatar.cc/80?img=5",
    date: "16 May 2022",
    title: "Brunch this Saturday?",
    body: "Hey! I'll be around the city this weekend, how about a…",
    color: "primary.500",
  },
  {
    id: 4,
    name: "Alevtina B",
    avatar: "https://i.pravatar.cc/40?img=7",
    avatar2x: "https://i.pravatar.cc/80?img=7",
    date: "10 May 2022",
    title: "Exciting News!",
    body: "Hello there! I have some exciting news to share with you...",
    color: "danger.500",
  },
  {
    id: 5,
    name: "Almira K",
    avatar: "https://i.pravatar.cc/40?img=7",
    avatar2x: "https://i.pravatar.cc/80?img=7",
    date: "10 May 2022",
    title: "Exciting News!",
    body: "Hello there! I have some exciting news to share with you...",
    color: "danger.500",
  },
];
export default function Layout() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // if (filter === "") {
    //   if (type === "inbox") {
    //     setMessages(inboxMessages);
    //   } else if (type === "sent") {
    //     setMessages(sentMessages);
    //   }
    // } else {
    setMessages(
      messages.filter(
        (message) =>
          message.title.toLowerCase().includes(filter.toLowerCase()) ||
          (message.sender &&
            message.sender.toLowerCase().includes(filter.toLowerCase())) ||
          (message.recipient &&
            message.recipient.toLowerCase().includes(filter.toLowerCase())),
      ),
    );
    //}
  }, filter);

  const handleButtonClick = (type) => {
    if (type === "inbox") {
      setMessages(inboxMessages);
    } else if (type === "sent") {
      setMessages(sentMessages);
    }
  };

  const handleSearchChange = (value) => {
    setFilter(value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Inbox", "Sent"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleButtonClick(text.toLowerCase())}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <OutboxRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flex: 1, p: 3 }}>
        <Mails
          data={messages}
          onSearchChange={handleSearchChange}
          filteredMessages={messages}
        />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <MailContent />
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box> */}
    </Box>
  );
}

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerSidebar from "./Drawer";
import Mails from "./Mails";
import MailContent from "./MailContent";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("data", data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (value) => {
    setFilter(value);
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    console.log("handle select message", message);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Mails
          data={messages}
          onSearchChange={handleSearchChange}
          filteredMessages={messages}
          onMessageSelect={handleMessageSelect}
        />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <MailContent message={selectedMessage} />
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box> */}
    </Box>
  );
};

export default Messages;

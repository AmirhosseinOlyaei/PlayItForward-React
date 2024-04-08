import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerSidebar from "./Drawer";
import Mails from "./Mails";
import MailContent from "./MailContent";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    fetchMessages();
    setLoggedInUserId("6609a2873eaffef95345b9fc");
  }, []);

  // Added useEffect to observe that React state updates are asynchronous, and the updated value might not be available synchronously after calling the state setter function.

  // useEffect(() => {
  //   console.log("Filtered messages:", filteredMessages);
  // }, [filteredMessages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("Fetched messages", data);
      setMessages(data);
      setFilteredMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (value) => {
    console.log("filter value", value);
    if (value === "inbox") {
      setFilteredMessages(
        messages.filter((message) => message.user_id_to === loggedInUserId)
      );
      console.log("filtered inboxmessages", filteredMessages);
    } else if (value === "sent") {
      setFilteredMessages(
        messages.filter((message) => message.user_id_from === loggedInUserId)
      );
      console.log("filtered sent messages", filteredMessages);
    } else {
      setFilteredMessages(messages);
    }
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    console.log("handle select message", message);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerSidebar onButtonClick={handleSearchChange} />
      <Box sx={{ flex: 1, p: 3 }}>
        <Mails
          data={messages}
          onSearchChange={handleSearchChange}
          filteredMessages={filteredMessages}
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

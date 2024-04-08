import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerSidebar from "./Drawer";
import Mails from "./Mails";
import MailContent from "./MailContent";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("");
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

  useEffect(() => {
    if (loggedInUserId !== null) {
      updateFilteredMessages();
    }
  }, [filter, messages, loggedInUserId]);

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

  const updateFilteredMessages = () => {
    if (filter === "sent" && loggedInUserId !== null) {
      setFilteredMessages(
        messages.filter((message) => message.user_id_from === loggedInUserId)
      );
    } else if (filter === "inbox" && loggedInUserId !== null) {
      setFilteredMessages(
        messages.filter((message) => message.user_id_to === loggedInUserId)
      );
    } else if (filter === "") {
      setFilteredMessages(
        messages.filter(
          (message) =>
            message.user_id_to === loggedInUserId ||
            message.user_id_from === loggedInUserId
        )
      );
    } else {
      setFilteredMessages(
        messages.filter((message) => {
          const subject = message.subject ? message.subject.toLowerCase() : "";
          const content = message.content ? message.content.toLowerCase() : "";

          return (
            subject.includes(filter.toLowerCase()) ||
            content.includes(filter.toLowerCase())
          );
        })
      );
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

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerSidebar from "./Drawer";
import Mails from "./Mails";
import MailContent from "./MailContent";
import { getUserContext } from "../../context/userContext";
const Messages = () => {
  const { user } = getUserContext();
  const { id } = useParams();
  const loggedInUserId = user ? user._id : "";
  const loggedInUserName = user ? user.nickname : "";
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sentMessageCount, setSentMessageCount] = useState(0);
  const [inboxMessageCount, setInboxMessageCount] = useState(0);

  useEffect(() => {
    fetchMessages();
  }, [loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId !== null) {
      updateFilteredMessages();
    }
  }, [filter, messages, loggedInUserId]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMessages = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);

      const response = await fetch(
        `${apiUrl}/messages?userId=${loggedInUserId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();

      let sortedMessages = data.sort(
        (a, b) => new Date(b.sent_date) - new Date(a.sent_date)
      );

      if (id) {
        sortedMessages = sortedMessages.filter(
          (message) => message.toy_listing_id._id === id
        );
      }

      setMessages(sortedMessages);

      setFilteredMessages(
        sortedMessages.filter(
          (message) => message.user_id_to._id === loggedInUserId
        )
      );

      const sentCount = sortedMessages.filter(
        (message) => message.user_id_from._id === loggedInUserId
      ).length;

      const inboxCount = sortedMessages.filter(
        (message) => message.user_id_to._id === loggedInUserId
      ).length;

      setSentMessageCount(sentCount);
      setInboxMessageCount(inboxCount);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFilteredMessages = () => {
    if (filter === "sent" && loggedInUserId !== null) {
      filterSentMessages();
    } else if (filter === "inbox" && loggedInUserId !== null) {
      filterInboxMessages();
    } else if (filter === "") {
      filterInboxMessages();
    } else {
      filterBySearch();
    }
  };

  const filterSentMessages = () => {
    setFilteredMessages(
      messages.filter((message) => message.user_id_from?._id === loggedInUserId)
    );
  };

  const filterInboxMessages = () => {
    setFilteredMessages(
      messages.filter((message) => message.user_id_to?._id === loggedInUserId)
    );
  };

  const filterBySearch = () => {
    const searchTerm = filter.toLowerCase();
    setFilteredMessages(
      messages.filter((message) => {
        const { user_id_to, user_id_from, subject, content } = message;
        const toFirstName = user_id_to?.first_name?.toLowerCase() || "";
        const toLastName = user_id_to?.last_name?.toLowerCase() || "";
        const fromFirstName = user_id_from?.first_name?.toLowerCase() || "";
        const fromLastName = user_id_from?.last_name?.toLowerCase() || "";

        return (
          (user_id_to?._id === loggedInUserId &&
            (toFirstName.includes(searchTerm) ||
              toLastName.includes(searchTerm) ||
              subject?.toLowerCase().includes(searchTerm) ||
              content?.toLowerCase().includes(searchTerm))) ||
          (user_id_from?._id === loggedInUserId &&
            (fromFirstName.includes(searchTerm) ||
              fromLastName.includes(searchTerm) ||
              subject?.toLowerCase().includes(searchTerm) ||
              content?.toLowerCase().includes(searchTerm)))
        );
      })
    );
  };

  const handleSearchChange = (value) => {
    setFilter(value);
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  const deleteMessage = async (_id) => {
    try {
      const response = await fetch(`${apiUrl}/messages/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      // Update the messages array and filteredMessages array
      const updatedMessages = messages.filter((message) => message._id !== _id);
      setMessages(updatedMessages);
      setFilteredMessages(
        filteredMessages.filter((message) => message._id !== _id)
      );

      // Recalculate message counts
      const sentCount = updatedMessages.filter(
        (message) => message.user_id_from._id === loggedInUserId
      ).length;
      const inboxCount = updatedMessages.filter(
        (message) => message.user_id_to._id === loggedInUserId
      ).length;
      setSentMessageCount(sentCount);
      setInboxMessageCount(inboxCount);

      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerSidebar
        onButtonClick={handleSearchChange}
        sentMessageCount={sentMessageCount}
        inboxMessageCount={inboxMessageCount}
      />
      <Box sx={{ flex: 1, p: 3 }}>
        <Mails
          data={messages}
          onSearchChange={handleSearchChange}
          filteredMessages={filteredMessages}
          onMessageSelect={handleMessageSelect}
        />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <MailContent
          loggedInUserId={loggedInUserId}
          loggedInUserName={loggedInUserName}
          message={selectedMessage}
          onDelete={deleteMessage}
          fetchMessages={fetchMessages}
        />
      </Box>
    </Box>
  );
};

export default Messages;

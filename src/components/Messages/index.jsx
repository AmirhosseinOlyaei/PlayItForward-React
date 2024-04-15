import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerSidebar from "./Drawer";
import Mails from "./Mails";
import MailContent from "./MailContent";

const loggedInUserId = "6609a2873eaffef95345b9fa";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
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
      const url = `http://localhost:8000/api/v1/messages?userId=${loggedInUserId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("Fetched messages", data);

      setMessages(
        data.filter(
          (message) =>
            message.user_id_from._id === loggedInUserId ||
            message.user_id_to._id === loggedInUserId
        )
      );
      setFilteredMessages(
        data.filter(
          (message) =>
            message.user_id_from._id === loggedInUserId ||
            message.user_id_to._id === loggedInUserId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const updateFilteredMessages = () => {
  //   if (filter === "sent" && loggedInUserId !== null) {
  //     setFilteredMessages(
  //       messages.filter(
  //         (message) =>
  //           message.user_id_from && message.user_id_from._id === loggedInUserId
  //       )
  //     );
  //   } else if (filter === "inbox" && loggedInUserId !== null) {
  //     setFilteredMessages(
  //       messages.filter(
  //         (message) =>
  //           message.user_id_to && message.user_id_to._id === loggedInUserId
  //       )
  //     );
  //   } else if (filter === "") {
  //     setFilteredMessages(
  //       messages.filter(
  //         (message) =>
  //           (message.user_id_to && message.user_id_to._id === loggedInUserId) ||
  //           (message.user_id_from &&
  //             message.user_id_from._id === loggedInUserId)
  //       )
  //     );
  //   } else {
  //     setFilteredMessages(
  //       messages.filter((message) => {
  //         const fromFirstName = message.user_id_from.first_name
  //           ? message.user_id_from.first_name.toLowerCase()
  //           : "";
  //         const fromLastName = message.user_id_from.last_name
  //           ? message.user_id_from.last_name.toLowerCase()
  //           : "";
  //         const toFirstName = message.user_id_to.first_name
  //           ? message.user_id_to.first_name.toLowerCase()
  //           : "";
  //         const toLastName = message.user_id_to.last_name
  //           ? message.user_id_to.last_name.toLowerCase()
  //           : "";
  //         const subject = message.subject ? message.subject.toLowerCase() : "";
  //         const content = message.content ? message.content.toLowerCase() : "";

  //         return (
  //           fromFirstName.includes(filter.toLowerCase()) ||
  //           fromLastName.includes(filter.toLowerCase()) ||
  //           toFirstName.includes(filter.toLowerCase()) ||
  //           toLastName.includes(filter.toLowerCase()) ||
  //           subject.includes(filter.toLowerCase()) ||
  //           content.includes(filter.toLowerCase())
  //         );
  //       })
  //     );
  //   }
  // };

  const updateFilteredMessages = () => {
    if (filter === "sent" && loggedInUserId !== null) {
      filterSentMessages();
    } else if (filter === "inbox" && loggedInUserId !== null) {
      filterInboxMessages();
    } else if (filter === "") {
      filterAllMessages();
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

  const filterAllMessages = () => {
    setFilteredMessages(
      messages.filter(
        (message) =>
          message.user_id_to?._id === loggedInUserId ||
          message.user_id_from?._id === loggedInUserId
      )
    );
  };

  const filterBySearch = () => {
    const searchTerm = filter.toLowerCase();
    setFilteredMessages(
      messages.filter((message) => {
        const { user_id_from, user_id_to, subject, content } = message;
        const fromFirstName = user_id_from?.first_name?.toLowerCase() || "";
        const fromLastName = user_id_from?.last_name?.toLowerCase() || "";
        const toFirstName = user_id_to?.first_name?.toLowerCase() || "";
        const toLastName = user_id_to?.last_name?.toLowerCase() || "";
        return (
          fromFirstName.includes(searchTerm) ||
          fromLastName.includes(searchTerm) ||
          toFirstName.includes(searchTerm) ||
          toLastName.includes(searchTerm) ||
          subject?.toLowerCase().includes(searchTerm) ||
          content?.toLowerCase().includes(searchTerm)
        );
      })
    );
  };

  const handleSearchChange = (value) => {
    setFilter(value);
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    console.log("handle select message", message);
  };

  const deleteMessage = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/messages/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      setMessages(messages.filter((message) => message._id !== _id));
      setFilteredMessages(
        filteredMessages.filter((message) => message._id !== _id)
      );

      setSelectedMessage(null);

      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
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
        <MailContent
          message={selectedMessage}
          onDelete={deleteMessage}
          fetchMessages={fetchMessages}
        />
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box> */}
    </Box>
  );
};

export default Messages;

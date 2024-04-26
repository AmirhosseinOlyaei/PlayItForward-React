import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import ActionButton from "./ActionButton";

const StatusToggle = ({ toy, toys, setToys }) => {
  const [status, setStatus] = useState("");
  const [statusToGone, setStatusToGone] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const toyToUpdate = toys.find((t) => t._id === toy._id);
    if (toyToUpdate) {
      setStatus(toyToUpdate.status);
    }
  }, [toy._id, toys]);

  const toggleStatus = async () => {
    try {
      const newStatus = status === "available" ? "reserved" : "available";
      const response = await axios.put(`${apiUrl}/toys/${toy._id}`, {
        status: newStatus,
      });
      // Update the status of the toy in the array of toys in the component state
      const updatedToys = toys.map((t) => {
        if (t._id === toy._id) {
          return { ...t, status: newStatus };
        }
        return t;
      });

      setToys(updatedToys);
      setStatus(newStatus); // Update local state after updating the array of toys. Update status in the component state after successful API call

      console.log("Toy status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating toy status:", error);
    }
  };

  const toggleStatusToGone = async () => {
    try {
      const newStatus = "gone";
      const response = await axios.put(`${apiUrl}/toys/${toy._id}`, {
        status: newStatus,
      });
      // Update the status of the toy in the array of toys in the component state
      const updatedToys = toys.map((t) => {
        if (t._id === toy._id) {
          return { ...t, status: newStatus };
        }
        return t;
      });

      setToys(updatedToys);
      setStatusToGone(newStatus); // Update local state after updating the array of toys. Update status in the component state after successful API call

      console.log("Toy status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating toy status:", error);
    }
  };
  return (
    <>
      <ActionButton
        text={"Mark as Gone"}
        link={"/"}
        startIcon={""}
        onClick={toggleStatusToGone}
      />

      <ActionButton
        text={
          toy.status === "available" ? "Mark as reserved" : "Mark as available"
        }
        link={"/"}
        startIcon={""}
        // sx={{ ml: 2 }}
        onClick={toggleStatus}
      />
    </>
  );
};

export default StatusToggle;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export default function StarRating({ message, loggedInUserId, setOpen, open }) {
  const [value, setValue] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    setRating(newValue);
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/stars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id_given_to: message.user_id_from._id,
          number_of_stars: value,
          user_id_given_by: loggedInUserId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      const responseData = await response.json();
      console.log("Rating submitted successfully:", responseData);
      setOpen({ ...open, showRating: false });
      toast.success("Rating submitted successfully", { duration: 2000 });

      localStorage.setItem(`rated_${message.user_id_from._id}`, "true");
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.", {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (open.showRating) {
      setValue(0);
      setRating(0);
    }
  }, [open.showRating]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div>
        <Rating
          name="user-rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <Button onClick={handleRatingSubmit}>Submit</Button>
      </div>
    </Box>
  );
}

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
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/stars/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id_given_to: message.user_id_from._id,
          number_of_stars: value,
          user_id_given_by: loggedInUserId,
          toy_listing_id: message.toy_listing_id._id,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message, {
          duration: 2000,
        });
        setOpen({ ...open, showRating: false });
        return;
      }

      const responseData = await response.json();
      console.log("Rating submitted successfully:", responseData);
      setOpen({ ...open, showRating: false });
      toast.success("Rating submitted successfully", { duration: 2000 });
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(error.message, {
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > div": {
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <div>
        <Rating
          name="user-rating"
          value={rating}
          onChange={handleRatingChange}
          sx={{
            marginRight: "10px",
            alignSelf: "flex-start",
          }}
        />
        <Button
          onClick={handleRatingSubmit}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "rgba(33, 150, 253, 0.8)",
            height: "24px",
            alignSelf: "flex-start",
          }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}

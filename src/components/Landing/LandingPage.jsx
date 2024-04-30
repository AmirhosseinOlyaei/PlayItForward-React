// src/components/Landing/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box, CssBaseline } from "@mui/material";

export default function LandingPage() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          textAlign: "center",
          backgroundImage: `url('/a.jpeg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed", // This will fix the background image during scroll
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          Welcome to PlayItForward
        </Typography>

        <Button
          component={Link}
          to="/toys"
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: "20px",
            typography: {
              fontSize: "1.25rem",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          Browse Toy Listing
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            borderRadius: "20px",
            color: "white",
            typography: {
              fontSize: "1.25rem",
            },
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}

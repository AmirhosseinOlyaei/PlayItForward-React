// src/components/LoginPage/SignInSide.jsx
import React from "react";
import axios from "axios";
import SharedForm from "./SharedForm";
import SharedLayout from "./SharedLayout";
import GoogleIcon from "./GoogleIcon";
import { Button, Divider, Typography, Box } from "@mui/material";

const SignInButtonGoogle = () => {
  const handleAuth = () => {
    window.location.href = import.meta.env.VITE_AUTH_URL;
  };

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        mt: 3,
        mb: 3,
        height: "50px",
        width: "100%",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "white"
            : "linear-gradient(135deg, #8E54E9 0%, #4776E6 100%)",
        color: (theme) => theme.palette.grey[700],
        "&:hover": {
          background: (theme) =>
            theme.palette.mode === "light"
              ? "white"
              : "linear-gradient(135deg, #B74AEA 0%, #786FEC 100%)",
        },
      }}
      onClick={handleAuth}
    >
      <Typography
        variant="button"
        sx={{
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        Continue with Google
      </Typography>
    </Button>
  );
};

export default function SignInSide() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCredentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/auth/signin`,
        userCredentials
      );
      const { token, user } = response.data;
      // Store the token and user details as needed
      alert("Logged in successfully");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <SharedLayout title="Sign in">
      <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <SignInButtonGoogle />
        <Divider sx={{ width: "100%", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>
        <SharedForm
          fields={[
            {
              id: "email",
              label: "Email Address",
              name: "email",
              autoComplete: "email",
              autoFocus: true,
              required: true,
            },
            {
              id: "password",
              label: "Password",
              name: "password",
              autoComplete: "current-password",
              type: "password",
              required: true,
            },
          ]}
          handleSubmit={handleSubmit}
          submitButtonText="Sign In"
          bottomLinkText="Creating an account? Sign Up"
          bottomLinkHref="/signup"
          forgotPasswordLink="/forgot-password"
        />
      </Box>
    </SharedLayout>
  );
}

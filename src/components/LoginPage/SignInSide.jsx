// src/components/LoginPage/SignInSide.jsx
import React, { useContext } from "react";
import axios from "axios";
import SharedForm from "./SharedForm";
import SharedLayout from "./SharedLayout";
import GoogleIcon from "./GoogleIcon";
import { Button, Divider, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext"; // Import UserContext
import toast, { Toaster } from "react-hot-toast";

const SignInButtonGoogle = () => {
  const handleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
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
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use UserContext to set the user

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCredentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      console.log("first");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        userCredentials,
        { withCredentials: true } // Ensure cookies are included in the request
      );
      console.log("second");
      const { user } = response.data;
      console.log("third");

      // Update the user context
      setUser(user);

      console.log("forth");
      toast.success("Logged in successfully");
      console.log("fifth");

      // Redirect to the homepage
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Invalid email or password. Please try again.");
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
      <Toaster />
    </SharedLayout>
  );
}

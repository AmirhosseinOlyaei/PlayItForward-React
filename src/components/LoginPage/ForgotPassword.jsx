// src/components/LoginPage/ForgotPassword.jsx
import React from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Link,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AppLogoIcon from "./AppLogoIcon";
import toast, { Toaster } from "react-hot-toast";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/forgot-password`,
        { email }
      );
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("Error during password reset. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 86px)" }}
        mt={10.7}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/AppLogo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AppLogoIcon style={{ width: "100%", height: "auto" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Link
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Back to Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

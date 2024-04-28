import React, { useState, useEffect } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Paper,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GoogleIcon from "./GoogleIcon";
import TermsAndConditions from "./TermsAndConditions";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        PlayItForward
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignInButton = () => {
  const handleAuth = () => {
    window.location.href = import.meta.env.VITE_AUTH_URL;
  };

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        mt: 3,
        mb: 6,
        height: "50px",
        width: "325px",
        background: (theme) =>
          theme.palette.mode === "light"
            ? // ? "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)"
              "white"
            : "linear-gradient(135deg, #8E54E9 0%, #4776E6 100%)",
        color: "gray",
        "&:hover": {
          background: (theme) =>
            theme.palette.mode === "light"
              ? // ? "linear-gradient(135deg, #786FEC 0%, #B74AEA 100%)"
                "white"
              : "linear-gradient(135deg, #B74AEA 0%, #786FEC 100%)",
        },
        boxShadow: (theme) => `0px 10px 10px -5px ${theme.palette.grey[700]}`,
        "&:active": {
          boxShadow: (theme) =>
            `inset 0px 2px 4px 0px ${theme.palette.grey[800]}`,
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

const defaultTheme = createTheme();

export default function SignInSide() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [isNewUser, setIsNewUser] = useState(false);
  // const [showTermsDialog, setShowTermsDialog] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await fetch("/api/v1/user");
  //       const data = await response.json();
  //       const isNewUser = data?.isNewUser;
  //       if (isNewUser !== undefined) {
  //         setIsNewUser(isNewUser);
  //       } else {
  //         // Handle undefined/null case
  //         console.error("isNewUser value is undefined or null");
  //       }
  //     } catch (error) {
  //       // Handle error (e.g., redirect to login page)
  //       console.error("Error checking authentication status:", error);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  // const handleAgree = () => {
  //   // Redirect to toys page
  //   navigate("/toys");
  // };

  // const handleDisagree = () => {
  //   // Redirect back to login page
  //   navigate("/login");
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 86px)" }}
        mt={10.7}
        position={"fixed"}
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
              <img
                src="/AppLogo.png"
                alt="App Logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography component="p" variant="body1" sx={{ mt: 3, mb: 2 }}>
              Welcome to PlayItForward!
            </Typography>
            <SignInButton />
            <Grid item marginBottom={2}>
              <Button variant="outlined" onClick={handleClickOpen}>
                {" Terms and Conditions "}
              </Button>
              <TermsAndConditions open={open} handleClose={handleClose} />
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

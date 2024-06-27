// src/components/LoginPage/SignInSide.jsx
import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  createTheme,
  ThemeProvider,
  Divider,
} from "@mui/material";
import GoogleIcon from "./GoogleIcon";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        PlayItForward
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
        mb: 4,
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

const defaultTheme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // Add your login logic here
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 86px)" }}
        mt={10.7}
        // position={"fixed"}
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
            <Box
              sx={{
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <SignInButtonGoogle />
              <Divider sx={{ width: "100%", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

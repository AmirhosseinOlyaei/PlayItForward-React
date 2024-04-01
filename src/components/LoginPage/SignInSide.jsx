import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "./GoogleIcon";
import { Toolbar } from "@mui/material";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const handleAuth = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Toolbar sx={{ height: "90px" }} /> */}

      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 93px)" }}
        mt={9}
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
            height: "100%",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              my: "auto",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
            <Typography component="p" variant="p" sx={{ mt: 3, mb: 2 }}>
              Welcome to PlayItForward!
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                // color="primary"
                fullWidth
                onClick={handleAuth}
                sx={{
                  mt: 3,
                  mb: 2,
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
                  },
                }}
              >
                Continue with Google
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

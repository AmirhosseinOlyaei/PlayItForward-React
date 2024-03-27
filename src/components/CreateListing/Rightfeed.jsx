import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const Rightfeed = () => {
  const userData = {
    zipCode: "11230",
    title: "ExampleTitle",
    condition: "New",
    delivery: "Pickup",
    details:
      "The Toy is very good. And I am think you will be happy to have it. Please contact me.",
    sellerName: "James Games",
    listingDate: new Date().toLocaleDateString(),
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1.5,
        },

        marginTop: "32px",
        flexGrow: 2,
        border: "1px solid lightgrey",
        borderRadius: "5px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        Preview
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "85vh",
          border: "1px solid lightgrey",
        }}
      >
        <CardActionArea sx={{ backgroundColor: "#f0f0f0" }}>
          <CardMedia
            component="img"
            image="https://source.unsplash.com/featured/?toys"
            alt="Toy picture"
          />
        </CardActionArea>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            borderLeft: "1px solid lightgrey",
            width: "300px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ mb: 0.5, fontWeight: "bold" }}
            >
              Toy name here
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Listed on {userData.listingDate} in {userData.zipCode}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Details
            </Typography>

            {/* <div>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                Condition
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData.condition}
              </Typography>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                Delivery method
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData.delivery}
              </Typography>
            </div> */}
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">Condition</Typography>
                  <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                    Delivery method
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    {userData.condition}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.7 }}
                  >
                    {userData.delivery}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {userData.details}
            </Typography>
            <Divider sx={{ marginTop: 2, width: "290px" }} />
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
              Seller information
            </Typography>
            <Typography variant="body1">{userData.sellerName}</Typography>
          </CardContent>

          <Button
            variant="contained"
            disabled
            sx={{
              marginTop: "20px",
              width: "290px",
              border: "2px solid lightgrey",
            }}
          >
            Message
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Rightfeed;

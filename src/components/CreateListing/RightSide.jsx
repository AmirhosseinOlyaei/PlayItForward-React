import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GoogleMaps from "../ToyList/GoogleMaps";

const RightSide = ({
  title,
  description,
  condition,
  delivery,
  selectedFile,
  googleValue,
}) => {
  const userData = {
    zipCode: "11230",
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

        marginTop: "64px",
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
          {selectedFile ? (
            <CardMedia
              component="img"
              image={URL.createObjectURL(selectedFile)}
              alt="Toy picture"
            />
          ) : (
            <CardMedia
              component="img"
              alt="Toy picture"
              sx={{
                height: "500px",
                width: "500px",
              }}
            />
          )}
          {/* <CardMedia
            component="img"
            //image="https://source.unsplash.com/featured/?toys"
            image={selectedFile ? URL.createObjectURL(selectedFile) : null}
            // : "https://source.unsplash.com/featured/?toys"}
            alt="Toy picture"
            //sx={{ display: "flex" }}
          /> */}
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
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Listed on {userData.listingDate} in {googleValue}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Details
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Typography variant="body1">Condition</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {condition}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Delivery method
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {delivery}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.5, fontSize: "15px" }}
            >
              {description}
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
export default RightSide;

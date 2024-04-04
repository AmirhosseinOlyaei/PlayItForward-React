import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PhotoSizeSelectActualTwoToneIcon from "@mui/icons-material/PhotoSizeSelectActualTwoTone";

const ToyListingPreview = ({
  title,
  description,
  condition,
  delivery,
  selectedFile,
  value,
}) => {
  const userData = {
    zipCode: "11230",
    sellerName: "James Games",
    listingDate: new Date().toLocaleDateString(),
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "86vh" }}
    >
      <Box
        component="main"
        sx={{
          alignItems: "center",
          flexGrow: 1,
          p: 3,
          marginTop: "105px",
          border: "1px solid lightgrey",
          borderRadius: "5px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
          //height: "84vh",
          marginLeft: "20px",
          marginRight: "20px",
          maxWidth: "1000px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        // sx={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   "& > :not(style)": {
        //     m: 1.5,
        //   },

        //
        //   flexGrow: 2,
        //   border: "1px solid lightgrey",
        //   borderRadius: "5px",
        //   boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
        // }}
      >
        <Typography variant="h6" sx={{ m: 2 }}>
          Preview
        </Typography>

        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "80vh",
            border: "1px solid lightgrey",
            maxWidth: "1000px",
            // maxHeight: "95vh",
            // overflow: "auto",
          }}
        >
          <CardActionArea sx={{ backgroundColor: "#f0f0f0" }}>
            {selectedFile ? (
              <CardMedia
                component="img"
                image={URL.createObjectURL(selectedFile)}
                //alt="Toy picture"
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <span style={{ fontSize: 20 }}>
                  <PhotoSizeSelectActualTwoToneIcon
                    sx={{ fontSize: 60, color: "grey" }}
                  />
                </span>
              </Box>
            )}
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
                sx={{ mb: 0.5 }}
              >
                Listed on {userData.listingDate}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {value ? value.description : null}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
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
    </Grid>
  );
};
export default ToyListingPreview;

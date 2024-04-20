import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./UserProfile.module.css";
import { ButtonGroup, Divider, Box } from "@mui/material";
import ActionButton from "./ActionButton";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";

export default function ImgMediaCard({ toy, toys, setToys, url }) {
  const toyLising = {
    user_id: 1,
    given_to_user_id: 2,
    title: "Little Lego cars",
    description:
      "5 items, multiple colors, size about 2 inches  each, lego original",
    condition: "Like new",
    delivery_method: "Pickup",
    pictures:
      "https://geekculture.co/wp-content/uploads/2020/05/tigermiyaw-8-1200x817.jpg",
    category: "Cars",
    zip_code: 94040,

    created_by_id: 1,
    create_date: "2024-11-03",
    modified_date: "2024-11-03",
    modified_by_id: 1,
  };
  return (
    <Card sx={{ maxWidth: 845, padding: "20px", margin: "20px" }}>
      <Typography
        variant="body1"
        color={
          toy.status === "available"
            ? "green"
            : toy.status === "reserved"
            ? "blue"
            : "red"
        }
        sx={{ mb: 2, textAlign: "right", fontWeight: "bold" }}
      >
        {toy.status}
      </Typography>

      <div className={styles.detailsRow}>
        <CardMedia
          component="img"
          alt="No picture"
          sx={{ width: "160px", height: "180px" }}
          image={toy.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {toy.title}
          </Typography>

          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>
              <Typography variant="body2">
                <b>Category</b>
              </Typography>
            </div>
            <div>
              <Typography variant="body2">{toy.category}</Typography>
            </div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>
              <Typography variant="body2">
                <b>Condition</b>
              </Typography>
            </div>
            <div>
              <Typography variant="body2">{toy.condition}</Typography>
            </div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>
              <Typography variant="body2">
                <b>Description</b>
              </Typography>
            </div>
            <div>
              <Typography variant="body2">{toy.description}</Typography>
            </div>
          </div>
        </CardContent>
      </div>
      <Box
        sx={{
          margin: "5px 0",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "570px",
          minWidth: "570px",
        }}
      >
        <StatusToggle toy={toy} toys={toys} setToys={setToys} />
        {/* <ActionButton text={"Mark as Gone"} linkTo={"/"} startIcon={""} /> */}
        {/* <ActionButton text={"Mark as Reserved"} linkTo={"/"} startIcon={""} /> */}
        <ActionButton link="/messages" text="" startIcon={<MailIcon />} />
        <ActionButton link="" text="" startIcon={<ShareIcon />} />
        <ActionButton link={`/create?id=${toy._id}`} text={"Edit"} />

        {/* <Link to={`/create?id=${toy._id}`}>
          <Button
            variant="contained"
            sx={{
              ml: 0,
              mt: 1.2,
              height: "43px",
              backgroundColor: "rgba(33, 150, 243, 0.8)",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 1)",
              },
            }}
          >
            Edit
          </Button>
        </Link> */}
      </Box>
    </Card>
  );
}

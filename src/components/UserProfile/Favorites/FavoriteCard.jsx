import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./UserProfile.module.css";
import { Box, Popover, Chip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import ActionButton from "../ActionButton";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FavoriteCard({
  toy,
  toyId,
  deleteFromFavorite,
  favToyId,
}) {
  const navigate = useNavigate(); // Create an instance of navigate
  const handleClick = () => {
    navigate(`/toys/${toyId}`);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 3000);
    }
  }, [isOpen]);
  return (
    <>
      <Toaster />
      <Card sx={{ maxWidth: 845, padding: "20px", margin: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Chip
            label={
              toy.status === "available"
                ? "Available"
                : toy.status === "reserved"
                ? "Reserved"
                : "Gone"
            }
            sx={{
              backgroundColor:
                toy.status === "available"
                  ? "green"
                  : toy.status === "reserved"
                  ? "#ED0000"
                  : "grey",
              color: "white",
              margin: "10px 10px 0 0",
              padding: "0px 10px",
              width: "110px",
              textWrap: "wrap",
              fontSize: "14px",
            }}
          />
        </Box>

        <div className={styles.detailsRow}>
          <CardMedia
            onClick={handleClick}
            component="img"
            alt="No picture"
            sx={{ width: "160px", height: "186px", mr: 2 }}
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
            <div>
              <Box
                sx={{
                  margin: "5px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "408px",
                  minWidth: "408px",
                  mt: 2,
                }}
              >
                <ActionButton
                  link=""
                  text="Delete from Favorites"
                  onClick={() => deleteFromFavorite(favToyId)}
                />
                <ActionButton
                  link={`/messages/${toy._id}`}
                  text=""
                  startIcon={<MailIcon />}
                />
                <CopyToClipboard
                  text={`${window.location.origin}/toys/${toy._id}`}
                  onCopy={() => toast.success("Link copied to clipboard")}
                >
                  <ActionButton text="" startIcon={<ShareIcon />} />
                </CopyToClipboard>
                <Popover
                  open={isOpen}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorEl={anchorEl}
                >
                  <Typography sx={{ p: 2 }}>
                    The link is copied to clipboard.
                  </Typography>
                </Popover>
              </Box>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}

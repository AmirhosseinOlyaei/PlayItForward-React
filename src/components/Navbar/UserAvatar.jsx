import { Avatar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import LettersAvatar from "../ListingDetail/LettersAvatar";
const UserAvatar = ({ user, handleMenuClick }) => {
  if (!user)
    return (
      <IconButton
        color="inherit"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuClick}
        sx={{
          p: 1,
          bgcolor: "rgba(255, 255, 255, 0.12)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.24)",
          },
        }}
      >
        <MenuIcon sx={{ fontSize: 39 }} />
      </IconButton>
    );
  return (
    <>
      {user.profile_picture ? (
        <Avatar
          onClick={handleMenuClick}
          src={user.profile_picture}
          variant="rounded"
          style={{ width: 54, height: 54, borderRadius: 27 }}
          alt="profile picture"
        />
      ) : (
        <LettersAvatar
          style={{ width: "54px", height: "54px", fontSize: "24px" }}
          firstName={user.first_name}
          lastName={user.last_name}
          onClick={handleMenuClick}
        />
      )}
    </>
  );
};

export default UserAvatar;

import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(firstName, lastName) {
  const name = `${firstName} ${lastName}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

export default function BackgroundLetterAvatars({ firstName, lastName, onClick }) {
  return (
    <>
      <Avatar {...stringAvatar(firstName, lastName)} onClick={onClick} />
    </>
  );
}

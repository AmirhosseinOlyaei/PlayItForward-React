import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export default function Categories() {
  const categories = [
    "Arts & Crafts",
    "Books",
    "Cars",
    "Clothes",
    "Plush",
    "Sports",
    "Playsets",
    "Health",
    "Educational Toys",
    "Outdoor Play",
    "Board Games & Puzzles",
    "Video Games",
    "Electronic Toys",
    "Action Figures and Dolls",
    "Building Sets",
    "Musical instruments",
    "Baby and Toddler Toys",
    "Costumes and Pretend Play",
    "Miscellaneous",
  ];
  return (
    <List>
      <Typography variant="h6">Toys Category</Typography>
      {categories.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

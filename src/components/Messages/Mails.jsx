import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/material/ListItemButton";
import SearchMessage from "./SearchMessage";

const data = [
  {
    name: "Alex Jonnold",
    avatar: "https://i.pravatar.cc/40?img=3",
    avatar2x: "https://i.pravatar.cc/80?img=3",
    date: "21 Oct 2022",
    title: "Details for our Yosemite Park hike",
    body: "Hello, my friend! So, it seems that we are getting there…",
    color: "warning.400",
  },
  {
    name: "Pete Sand",
    avatar: "https://i.pravatar.cc/40?img=4",
    avatar2x: "https://i.pravatar.cc/80?img=4",
    date: "06 Jul 2022",
    title: "Tickets for our upcoming trip",
    body: "Good day, mate! It seems that our tickets just arrived…",
    color: "success.400",
  },
  {
    name: "Kate Gates",
    avatar: "https://i.pravatar.cc/40?img=5",
    avatar2x: "https://i.pravatar.cc/80?img=5",
    date: "16 May 2022",
    title: "Brunch this Saturday?",
    body: "Hey! I'll be around the city this weekend, how about a…",
    color: "primary.500",
  },
  {
    name: "John Snow",
    avatar: "https://i.pravatar.cc/40?img=7",
    avatar2x: "https://i.pravatar.cc/80?img=7",
    date: "10 May 2022",
    title: "Exciting News!",
    body: "Hello there! I have some exciting news to share with you...",
    color: "danger.500",
  },
];

export default function Mails() {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 600,
        borderRadius: "sm",
        p: 2,
        mb: 3,
        mt: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <SearchMessage />
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 0 }}>
        <List
          sx={{
            [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
              {
                borderLeft: "2px solid",
                borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
              },
          }}
        >
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemButton
                  {...(index === 0 && {
                    selected: true,
                    color: "neutral",
                  })}
                  sx={{ p: 2 }}
                >
                  <Divider sx={{ alignSelf: "flex-start" }}>
                    <Avatar alt="" srcSet={item.avatar2x} src={item.avatar} />
                  </Divider>
                  <Box sx={{ pl: 2, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography level="body-xs">{item.name}</Typography>
                        <Box
                          sx={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "99px",
                            bgcolor: item.color,
                          }}
                        />
                      </Box>
                      <Typography level="body-xs" textColor="text.tertiary">
                        {item.date}
                      </Typography>
                    </Box>
                    <div>
                      <Typography level="title-sm" sx={{ mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography level="body-sm">{item.body}</Typography>
                    </div>
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ m: 0 }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

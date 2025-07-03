import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BrushIcon from "@mui/icons-material/Brush";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// In Sidebar.js
const menu = [
  { text: "Notes", icon: <NoteIcon />, to: "/" },
  { text: "Ebook for Children", icon: <MenuBookIcon />, to: "/ebooks" }, // update text and path
  { text: "Draw", icon: <BrushIcon />, to: "/draw" },
  { text: "Games", icon: <DeleteOutlineIcon />, to: "/games" },
];
  

function Sidebar() {
  const location = useLocation();
  return (
    <Box
      sx={{
        width: 230,
        height: "100vh",
        bgcolor: "#2D2542",
        color: "white",
        p: 3,
        borderRadius: "2rem 0 0 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 5, ml: 1, fontFamily: "Inter, sans-serif" }}
      >
        Note
        <br />
        Tracker
      </Typography>
      <List sx={{ width: "100%" }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.to}
            sx={{
              borderRadius: "12px",
              mb: 1,
              background:
                location.pathname === item.to
                  ? "rgba(255,255,255,0.18)"
                  : "none",
              color: location.pathname === item.to ? "#fff" : "#cfc9e6",
              "&:hover": { background: "rgba(255,255,255,0.10)" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ ".MuiTypography-root": { fontWeight: 500 } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function WelcomeBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const seenBanner = localStorage.getItem("seenWelcomeBanner");
    if (seenBanner === "true") setOpen(false);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("seenWelcomeBanner", "true");
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFE082",
        color: "#2D2542",
        py: 2,
        px: { xs: 2, md: 0 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0 0 32px 32px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        mb: 4,
        position: "relative",
      }}
    >
      <img
        src="/image/Learn with us.png"
        alt="Welcome"
        height={50}
        style={{ marginRight: 20 }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
          fontSize: { xs: "1.1rem", md: "1.45rem" },
        }}
      >
        🎉 Welcome to Note Tracker for Kids! <br className="hide-mobile" />
        Let’s read, play, draw & grow together! 🌈✨
      </Typography>
      <IconButton
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: "#2D2542",
        }}
        size="small"
        onClick={handleClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default WelcomeBanner;

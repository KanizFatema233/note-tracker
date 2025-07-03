// src/pages/CanvasPage.js
import React, { useRef } from "react";
import { Box, Button, Stack, Typography, Slider } from "@mui/material";
import { ReactSketchCanvas } from "react-sketch-canvas";

const colors = [
  "#2D2542",
  "#FF9100",
  "#36C1FF",
  "#F8485E",
  "#60C33B",
  "#FFFFFF",
  "#000000",
];

function CanvasPage() {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = React.useState("#2D2542");
  const [brushRadius, setBrushRadius] = React.useState(4);

  // Download image
  const handleDownload = async () => {
    const exportImage = await canvasRef.current.exportImage("png");
    const link = document.createElement("a");
    link.href = exportImage;
    link.download = "drawing.png";
    link.click();
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: 700, color: "#2D2542" }}
      >
        Kids’ Drawing Canvas 🎨
      </Typography>
      <ReactSketchCanvas
        ref={canvasRef}
        width="420px"
        height="340px"
        style={{
          borderRadius: 16,
          boxShadow: "0 2px 24px rgba(0,0,0,0.09)",
          marginBottom: 20,
          background: "#FFF9E0",
        }}
        strokeColor={brushColor}
        strokeWidth={brushRadius}
        allowOnlyPointerType="all"
      />
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Typography>Brush:</Typography>
        {colors.map((c) => (
          <Button
            key={c}
            onClick={() => setBrushColor(c)}
            sx={{
              minWidth: 0,
              width: 32,
              height: 32,
              bgcolor: c,
              border: c === "#FFFFFF" ? "1px solid #ccc" : "none",
              borderRadius: "50%",
              p: 0,
              outline: brushColor === c ? "2px solid #2D2542" : "none",
            }}
          ></Button>
        ))}
        <Typography>Size:</Typography>
        <Slider
          value={brushRadius}
          onChange={(_, v) => setBrushRadius(v)}
          min={1}
          max={16}
          sx={{ width: 80 }}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => canvasRef.current.undo()}
          sx={{ borderRadius: "12px" }}
        >
          Undo
        </Button>
        <Button
          variant="outlined"
          onClick={() => canvasRef.current.clearCanvas()}
          sx={{ borderRadius: "12px" }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
          sx={{
            borderRadius: "12px",
            bgcolor: "#FF9100",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Download
        </Button>
      </Stack>
    </Box>
  );
}

export default CanvasPage;

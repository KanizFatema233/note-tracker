import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, CardMedia, Button, Stack } from "@mui/material";
import ebooks from "../data/ebooksData";

function BookPreview() {
  const { ebookId } = useParams();
  const ebook = ebooks.find((e) => e.id === ebookId);

  if (!ebook) return <Typography sx={{ m: 4 }}>Ebook not found.</Typography>;

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 3,
          borderRadius: "22px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.09)",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
        >
          {ebook.title} — Book Preview
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 3, justifyContent: "center" }}
        >
          {ebook.images &&
            ebook.images.slice(0, 2).map((img, idx) => (
              <CardMedia
                key={idx}
                component="img"
                image={img}
                alt={`Book Preview ${idx + 1}`}
                sx={{
                  width: 140,
                  height: 180,
                  borderRadius: 2,
                  objectFit: "cover",
                  border: "1px solid #eee",
                }}
              />
            ))}
        </Stack>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#2D2542",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: 600,
            px: 4,
            py: 1.1,
            mb: 2,
            width: "100%",
          }}
          href={ebook.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF Preview
        </Button>
        <Button
          component={Link}
          to={`/ebooks/${ebookId}`}
          variant="outlined"
          sx={{
            borderRadius: "12px",
            width: "100%",
          }}
        >
          Back to Ebook Details
        </Button>
      </Card>
    </Box>
  );
}

export default BookPreview;

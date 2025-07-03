import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import ebooks from "../data/ebooksData";

function EbookList() {
  return (
    <Box sx={{ mt: 4, ml: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#2D2542", mb: 3 }}
      >
        Ebook for Children
      </Typography>
      <Grid container spacing={2}>
        {ebooks.map((book) => (
          <Grid item xs={12} sm={6} md={3} key={book.id}>
            <Card
              sx={{
                borderRadius: 3,
                minHeight: 340,
                maxWidth: 230,
                mx: "auto",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 0,
              }}
            >
              <CardMedia
                component="img"
                image={book.image}
                alt={book.title}
                sx={{
                  height: 220,
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mb: 0.5, fontSize: 16 }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: "#666",
                    fontSize: 13,
                    minHeight: 36,
                  }}
                >
                  {book.description.length > 60
                    ? book.description.slice(0, 60) + "..."
                    : book.description}
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#FF9100",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    ৳ {book.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FFE082",
                      color: "#2D2542",
                      fontWeight: 600,
                      borderRadius: "10px",
                      fontSize: 13,
                      px: 2,
                      py: 0.5,
                      minWidth: 0,
                    }}
                    component={Link}
                    to={`/ebooks/${book.id}`}
                  >
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EbookList;

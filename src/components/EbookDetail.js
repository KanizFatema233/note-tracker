import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import ebooks from "../data/ebooksData";

function EbookDetail() {
  const { ebookId } = useParams();
  const ebook = ebooks.find((e) => e.id === ebookId);
  const [quantity, setQuantity] = useState(1);
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    transactionId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!ebook) return <Typography sx={{ m: 4 }}>Ebook not found.</Typography>;

  const handleChange = (e) =>
    setBilling({ ...billing, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          width: "900px",
          p: 3,
          borderRadius: "28px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.09)",
        }}
      >
        {/* Left: Buy/Info section */}
        <Box
          sx={{
            flex: "0 0 330px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mr: 5,
          }}
        >
          <CardMedia
            component="img"
            image={ebook.image}
            alt={ebook.title}
            sx={{
              width: 220,
              height: 270,
              borderRadius: 4,
              mb: 2,
              objectFit: "cover",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {ebook.title}
          </Typography>

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              variant="outlined"
              sx={{
                minWidth: "32px",
                width: "32px",
                p: 0,
                borderRadius: "8px",
                fontWeight: 700,
                mr: 1,
              }}
            >
              -
            </Button>
            <Typography
              sx={{
                mx: 1,
                width: 30,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {quantity}
            </Typography>
            <Button
              onClick={() => setQuantity((q) => q + 1)}
              variant="outlined"
              sx={{
                minWidth: "32px",
                width: "32px",
                p: 0,
                borderRadius: "8px",
                fontWeight: 700,
                ml: 1,
                mr: 2,
              }}
            >
              +
            </Button>
            <Typography
              variant="h6"
              sx={{
                color: "#FF9100",
                fontWeight: 700,
                ml: 2,
                fontSize: "1.18rem",
              }}
            >
              ৳ {ebook.price * quantity}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#2D2542",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "16px",
              px: 4,
              py: 1.2,
              mb: 2,
              mt: 1,
            }}
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Buy Now
          </Button>
          {/* Preview Book Button (goes to dedicated preview page) */}
          <Button
            component={Link}
            to={`/preview/${ebook.id}`}
            variant="outlined"
            sx={{ mb: 2, borderRadius: "12px" }}
          >
            Preview Book
          </Button>
        </Box>

        {/* Right: Full description, NO gallery here */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2D2542", mb: 2 }}
          >
            Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {ebook.description}
          </Typography>
          {/* Billing/Order form section */}
          <Box
            id="buy-section"
            component="form"
            sx={{ mt: 3, bgcolor: "#FFF9E0", borderRadius: 2, p: 3 }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Billing Info
            </Typography>
            <TextField
              label="Your Name"
              name="name"
              value={billing.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Email"
              name="email"
              type="email"
              value={billing.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>bKash Number:</strong> 01XXXXXXXXX
              <br />
              <span style={{ color: "#888" }}>
                Send payment, then enter your transaction ID below.
              </span>
              <br />
              <span style={{ color: "#555", fontWeight: 600 }}>
                Total: ৳ {ebook.price * quantity} ({quantity} copies)
              </span>
            </Typography>
            <TextField
              label="bKash Transaction ID"
              name="transactionId"
              value={billing.transactionId}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#2D2542",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "16px",
                px: 4,
                py: 1.2,
                mt: 1,
              }}
            >
              Submit & Request Ebook
            </Button>
            {submitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Thank you! We'll email your ebook to:{" "}
                <strong>{billing.email}</strong>
                <br />
                Quantity: <strong>{quantity}</strong>, Total paid:{" "}
                <strong>৳ {ebook.price * quantity}</strong>
              </Alert>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default EbookDetail;

import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Button, Grid } from "@mui/material";

// Animal emojis to match in pairs (must be an even number)
const animalEmojis = ["🦁", "🐼", "🐸", "🐵", "🐰", "🐻"];
const cardsData = [...animalEmojis, ...animalEmojis]; // Double the array for pairs

// Shuffle function
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function AnimalMatchingGame() {
  const [cards, setCards] = useState(shuffle(cardsData));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves((m) => m + 1);
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, cards[first]]);
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards]);

  const handleFlip = (idx) => {
    if (disabled) return;
    if (
      flipped.length < 2 &&
      !flipped.includes(idx) &&
      !matched.includes(cards[idx])
    ) {
      setFlipped((f) => [...f, idx]);
    }
  };

  const handleRestart = () => {
    setCards(shuffle(cardsData));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const allMatched = matched.length === animalEmojis.length;

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 2, color: "#2D2542" }}
      >
        Animal Matching Game 🧩
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Match the pairs of animals. Try to finish with the least moves!
      </Typography>
      <Grid container spacing={2} sx={{ width: 340, mb: 2 }}>
        {cards.map((emoji, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(emoji);
          return (
            <Grid item xs={4} key={idx}>
              <Card
                onClick={() => handleFlip(idx)}
                sx={{
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  bgcolor: isFlipped ? "#FFE082" : "#EEE4FC",
                  cursor: isFlipped || disabled ? "default" : "pointer",
                  borderRadius: "18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  userSelect: "none",
                  transition: "background 0.2s",
                }}
                elevation={isFlipped ? 8 : 2}
              >
                {isFlipped ? emoji : "❓"}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Typography sx={{ mb: 2 }}>
        Moves: <b>{moves}</b>
      </Typography>
      {allMatched ? (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#36B37E", fontWeight: 700, mb: 2 }}
          >
            🎉 Great job! You matched all animals!
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: "12px" }}
            onClick={handleRestart}
          >
            Play Again
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          sx={{ borderRadius: "12px" }}
          onClick={handleRestart}
        >
          Restart
        </Button>
      )}
    </Box>
  );
}

export default AnimalMatchingGame;

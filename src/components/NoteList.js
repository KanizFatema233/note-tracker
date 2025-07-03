import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const pastelColors = ["#FFF7D1", "#FDE6E6", "#EEE4FC", "#F9EFFF"];

function NoteList({ user }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchNotes = async () => {
      const q = query(collection(db, "notes"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const notesArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    };
    fetchNotes();
  }, [user]);

  return (
    <Box sx={{ mt: 4, ml: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#2D2542" }}>
          Notes
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/new"
          sx={{
            bgcolor: "#FFE082",
            color: "#2D2542",
            fontWeight: 600,
            borderRadius: "16px",
            px: 4,
            py: 1.2,
            fontSize: "1.1rem",
            boxShadow: "none",
            "&:hover": { bgcolor: "#FFECB3" },
          }}
        >
          + New Note
        </Button>
      </Box>
      <Grid container spacing={3}>
        {notes.map((note, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
            <Card
              sx={{
                bgcolor: pastelColors[idx % pastelColors.length],
                borderRadius: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                minHeight: 130,
                cursor: "pointer",
                transition: "transform 0.12s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              component={Link}
              to={`/note/${note.id}`}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#2D2542" }}
                >
                  {note.title || "Untitled"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#3E3857" }}>
                  {(note.text || "").length > 80
                    ? note.text.slice(0, 80) + "..."
                    : note.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NoteList;

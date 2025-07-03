import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path is correct!

const pastelColors = ["#FFF7D1", "#FDE6E6", "#EEE4FC", "#F9EFFF"];

function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    // Fetch the note from Firestore
    const fetchNote = async () => {
      const ref = doc(db, "notes", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setNote({ id: snap.id, ...snap.data() });
      else setNote(null);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteDoc(doc(db, "notes", note.id));
      navigate("/");
    } catch (err) {
      alert("Failed to delete note: " + err.message);
    }
  };

  if (!note) return <Typography>Note not found.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "90vh",
        p: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 540,
          width: "100%",
          bgcolor: pastelColors[2],
          borderRadius: "28px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.09)",
          p: 2,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2D2542" }}>
              {note.title || "Untitled"}
            </Typography>
            <Box>
              <IconButton
                component={Link}
                to={`/edit/${note.id}`}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error">
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ my: 2, color: "#3E3857" }}>
            {note.text}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {note.media &&
              note.media.map((m, idx) => (
                <Box key={idx}>
                  {m.type.startsWith("image") && (
                    <img
                      src={m.data}
                      alt=""
                      height={100}
                      style={{
                        borderRadius: 12,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.09)",
                      }}
                    />
                  )}
                  {m.type.startsWith("video") && (
                    <video
                      src={m.data}
                      height={100}
                      style={{ borderRadius: 12, background: "#eee" }}
                      controls
                    />
                  )}
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NoteView;

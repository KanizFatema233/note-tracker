import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";


const pastelColors = ["#FFF7D1", "#FDE6E6", "#EEE4FC", "#F9EFFF"];

function NoteEditor({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", text: "", media: [] });
  const isEditing = Boolean(id);

  // Load note for editing
  useEffect(() => {
    if (id) {
      // Fetch the note from Firestore
      const fetchNote = async () => {
        const ref = doc(db, "notes", id);
        const snap = await getDoc(ref);
        if (snap.exists()) setNote(snap.data());
      };
      fetchNote();
    }
  }, [id]);

  const handleChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });

  const handleMedia = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = (ev) =>
            res({ name: file.name, data: ev.target.result, type: file.type });
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      })
    ).then((arr) => {
      setNote({ ...note, media: [...note.media, ...arr] });
    });
  };

  const removeMedia = (idx) => {
    setNote({ ...note, media: note.media.filter((_, i) => i !== idx) });
  };

  const handleSave = async () => {
    if (!user) return;
    if (isEditing) {
      // Update the existing note
      await updateDoc(doc(db, "notes", id), {
        ...note,
        userId: user.uid,
        updated: Date.now(),
      });
    } else {
      // Create a new note
      await addDoc(collection(db, "notes"), {
        ...note,
        userId: user.uid,
        created: Date.now(),
      });
    }
    navigate("/");
  };

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
          bgcolor: pastelColors[0],
          borderRadius: "28px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.09)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#2D2542", mb: 2 }}
          >
            {isEditing ? "Edit Note" : "New Note"}
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={note.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2, bgcolor: "#FFFBE9", borderRadius: 2 }}
            inputProps={{ style: { fontWeight: 600, fontSize: "1.15rem" } }}
          />
          <TextField
            label="Content"
            name="text"
            value={note.text}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            sx={{ mb: 2, bgcolor: "#FFFBE9", borderRadius: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              component="label"
              sx={{
                bgcolor: "#FFE082",
                color: "#2D2542",
                fontWeight: 600,
                borderRadius: "16px",
                px: 3,
                py: 1,
                mr: 2,
                mb: 1,
                "&:hover": { bgcolor: "#FFECB3" },
              }}
            >
              Add Image/Video
              <input
                type="file"
                multiple
                hidden
                onChange={handleMedia}
                accept="image/*,video/*"
              />
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            {note.media &&
              note.media.map((m, idx) => (
                <Box key={idx} sx={{ position: "relative" }}>
                  {m.type.startsWith("image") && (
                    <img
                      src={m.data}
                      alt=""
                      height={60}
                      style={{
                        borderRadius: 8,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                      }}
                    />
                  )}
                  {m.type.startsWith("video") && (
                    <video
                      src={m.data}
                      height={60}
                      style={{ borderRadius: 8, background: "#eee" }}
                      controls
                    />
                  )}
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "#fff8",
                      zIndex: 2,
                    }}
                    onClick={() => removeMedia(idx)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
          </Box>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: "#2D2542",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "16px",
              px: 3,
              py: 1.2,
              fontSize: "1.05rem",
              mt: 1,
              "&:hover": { bgcolor: "#443066" },
            }}
            fullWidth
          >
            Save Note
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NoteEditor;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import NoteView from "./components/NoteView";
import Sidebar from "./components/Sidebar";
import EbookList from "./components/EbookList";
import EbookDetail from "./components/EbookDetail";
import LoginForm from "./components/LoginForm";
import BookPreview from "./components/BookPreview";
import CanvasPage from "./pages/Canvaspage";
import AnimalMatchingGame from "./pages/AnimalMatchingGame";
import WelcomeBanner from "./components/WelcomeBanner"; // <--- Add this import

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  if (!user) {
    // Not logged in: show login/register form
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFFCF2",
        }}
      >
        <LoginForm
          onLogin={setUser}
          user={user}
          onLogout={() => signOut(auth)}
        />
      </Box>
    );
  }

  // Logged in: show full app with welcome banner
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#FFFCF2",
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          {/* Welcome Banner at the top */}
          <WelcomeBanner />
          {/* Optional: Logout button at top right */}
          <Box sx={{ textAlign: "right", p: 2 }}>
            <button
              onClick={() => signOut(auth)}
              style={{
                fontWeight: "bold",
                padding: "8px 18px",
                borderRadius: "8px",
                background: "#EEE2FE",
                color: "#2D2542",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </Box>
          <Routes>
            <Route path="/" element={<NoteList user={user} />} />
            <Route path="/new" element={<NoteEditor user={user} />} />
            <Route path="/edit/:id" element={<NoteEditor user={user} />} />
            <Route path="/note/:id" element={<NoteView user={user} />} />
            <Route path="/ebooks" element={<EbookList user={user} />} />
            <Route path="/preview/:ebookId" element={<BookPreview />} />

            <Route path="/draw" element={<CanvasPage />} />
            <Route path="/games" element={<AnimalMatchingGame />} />

            <Route
              path="/ebooks/:ebookId"
              element={<EbookDetail user={user} />}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

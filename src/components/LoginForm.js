import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Fade,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const pastelBg = "linear-gradient(120deg, #fbeaff 0%, #ffe6ec 100%)";

function LoginForm({ onLogin, onLogout, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(auth.currentUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLogin(auth.currentUser);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: pastelBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 5,
            borderRadius: 5,
            boxShadow: "0 4px 32px rgba(30,20,90,0.12)",
            minWidth: 340,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Welcome, {user.email}!
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, fontWeight: 600 }}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: pastelBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Fade in timeout={900}>
        <Card
          sx={{
            width: 370,
            borderRadius: "2.3rem",
            p: 3,
            boxShadow: "0 4px 32px rgba(44,30,90,0.16)",
            bgcolor: "#fffafd",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "0.3s",
          }}
        >
          <CardContent sx={{ width: "100%", textAlign: "center" }}>
            <img
              alt="Welcome"
              src="https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_1280.png"
              style={{
                width: 62,
                height: 62,
                marginBottom: 12,
                opacity: 0.89,
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.7, color: "#2D2542" }}
            >
              {registering ? "Create an Account" : "Login to Continue"}
            </Typography>
            <Typography sx={{ mb: 3, color: "#8060c2" }}>
              {registering
                ? "Sign up to get started!"
                : "Welcome back, please login."}
            </Typography>

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2, borderRadius: 2, bgcolor: "#f7f2fc" }}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2, borderRadius: 2, bgcolor: "#f7f2fc" }}
              autoComplete={registering ? "new-password" : "current-password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={registering ? handleRegister : handleLogin}
              sx={{
                bgcolor: "#6740c6",
                fontWeight: 600,
                borderRadius: "1rem",
                py: 1.3,
                mb: 2,
                mt: 1,
                boxShadow: "0 2px 12px rgba(103,64,198,0.06)",
                fontSize: "1rem",
              }}
            >
              {registering ? "Register" : "Login"}
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{
                color: "#6740c6",
                fontWeight: 600,
                fontSize: "0.99rem",
                borderRadius: "1rem",
                mb: 1,
                textTransform: "none",
                "&:hover": { bgcolor: "#f7f2fc" },
              }}
              onClick={() => setRegistering((r) => !r)}
            >
              {registering
                ? "Already have an account? Login"
                : "No account? Register"}
            </Button>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
}

export default LoginForm;

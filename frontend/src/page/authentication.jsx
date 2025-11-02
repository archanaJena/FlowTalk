import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SnackbarContent from "@mui/material/SnackbarContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);

        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
        setName("");
      }
    } catch (err) {
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('authbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <CssBaseline />

        {/* Glass Morphism Authentication Box */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "#4e4a4a66",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "transparent",
                position: "relative",
                top: "-20px",
              }}
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: 33 }} />
            </Avatar>

            {/* Toggle Buttons */}
            <div>
              <Button
                variant={formState === 0 ? "contained" : ""}
                onClick={() => setFormState(0)}
                sx={{
                  mr: 2,
                  bgcolor: formState === 0 ? "#facc15" : "transparent",
                  color: formState === 0 ? "black" : "white",
                  "&:hover": {
                    bgcolor:
                      formState === 0 ? "#facc15" : "rgba(255,255,0,0.1)",
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? "contained" : ""}
                onClick={() => setFormState(1)}
                sx={{
                  bgcolor: formState === 1 ? "#facc15" : "transparent",
                  color: formState === 1 ? "black" : "white",
                  "&:hover": {
                    bgcolor:
                      formState === 1 ? "#f5d742" : "rgba(255,255,0,0.1)",
                  },
                }}
              >
                Sign Up
              </Button>
            </div>

            {/* Form Section */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Full Name"
                  label="Full Name"
                  name="Full Name"
                  value={name}
                  autoFocus
                  autoComplete="off"
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#facc15" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#fff" },
                      "&:hover fieldset": { borderColor: "#facc15" },
                      "&.Mui-focused fieldset": { borderColor: "#facc15" },
                    },
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                autoComplete="off"
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#facc15" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#facc15" },
                    "&.Mui-focused fieldset": { borderColor: "#facc15" },
                  },
                }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                autoComplete="off"
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#facc15" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#facc15" },
                    "&.Mui-focused fieldset": { borderColor: "#facc15" },
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />

              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {error}
              </p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#facc15",
                  color: "#1f1f1f",
                  "&:hover": {
                    bgcolor: "rgba(255,255,0,0.1)",
                    color: "#fff",
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login " : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Go Back Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              textTransform: "none",
              fontSize: "16px",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
                borderColor: "#facc15",
                color: "#facc15",
              },
            }}
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
        </Box>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          }}
          message={message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </ThemeProvider>
  );
}

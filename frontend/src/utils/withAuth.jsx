import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        // User is authenticated → stop loading
        setLoading(false);
      } else {
        // User not authenticated → show loader for 1.8s before redirect
        const timeout = setTimeout(() => {
          navigate("/auth", { replace: true });
        }, 4800); // 1800ms = 1.8 seconds

        // Cleanup timeout if component unmounts
        return () => clearTimeout(timeout);
      }
    }, [navigate]);

    if (loading) {
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.411), rgba(0,0,0,0.411)), url("/connectbg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: "20px",
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              color: "white",
            }}
          >
            <CircularProgress sx={{ color: "#fac117", mb: 3 }} />
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              Checking Authentication...
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Please wait while we verify your session.
            </Typography>
          </Paper>
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

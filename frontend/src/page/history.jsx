import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0,0,0,0.7)), url('/connectbg.jpg') center/cover no-repeat",
      }}
    >
      {/* Home Icon */}
      <IconButton
        onClick={() => routeTo("/home")}
        sx={{
          color: "white",
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
        }}
      >
        <HomeIcon />
      </IconButton>

      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        History
      </Typography>

      {/* History Cards */}
      {meetings.length !== 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {meetings.map((e, i) => (
            <Card
              key={i}
              sx={{
                width: { xs: "100%", sm: "45%", md: "40%" },
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  <strong>Code:</strong> {e.meetingCode}
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  <strong>Date:</strong> {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography align="center" sx={{ mt: 4, opacity: 0.7 }}>
          No history available.
        </Typography>
      )}
    </Box>
  );
}

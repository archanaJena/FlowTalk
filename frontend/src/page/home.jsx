import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import withAuth from "../utils/withAuth";
import "../styles/home.css";

function HomeComponent() {
  const navigate = useNavigate();
  const { addToUserHistory, user, userHistory = [] } = useContext(AuthContext);
  const [meetingCode, setMeetingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      toast.error("Please enter a meeting code!");
      return;
    }
    setLoading(true);
    await addToUserHistory(meetingCode);
    setTimeout(() => {
      navigate(`/${meetingCode}`);
      setLoading(false);
    }, 800);
  };

  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/${code}`);
  };

  return (
    <div className="home-container">
      <Toaster />
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navheader">
          <h2 className="no-cursor-effect">Flowtalk</h2>
        </div>

        <div className="nav-actions">
          <button onClick={() => navigate("/history")} className="history-btn">
            ⏱ History
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="dashboard">
        {/* LEFT SIDE */}
        <section className="left-section">
          <h1 className="main-heading">
            Video Calls That Feel Like{" "}
            <span className="emp">Real Conversations</span>
          </h1>
          <p className="subtext">
            Welcome back! Join an existing meeting or create a new one below.
          </p>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter Meeting Code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <div className="grp-button">
                <button
                  className="join-btn"
                  onClick={handleJoinVideoCall}
                  disabled={loading}
                >
                  🎥 Join Meeting
                </button>
                <button className="new-btn" onClick={generateMeetingCode}>
                  ＋ New Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Recent Meetings */}
          {userHistory.length > 0 && (
            <div className="recent-section">
              <div className="recent-header">
                <h3>Recent Meetings</h3>
                <span className="view-all">View All</span>
              </div>
              <div className="recent-list">
                {userHistory.slice(0, 4).map((code, i) => (
                  <div
                    key={i}
                    className="recent-card"
                    onClick={() => navigate(`/${code}`)}
                  >
                    <div className="recent-icon">🎦</div>
                    <div className="recent-text">
                      <p className="meeting-code">{code}</p>
                      <p className="meeting-sub">Meeting {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT SIDE */}
      </main>
    </div>
  );
}

export default withAuth(HomeComponent);

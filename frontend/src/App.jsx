import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./page/landing";
import Authentication from "./page/authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./page/videomeet.jsx";
import HomeComponent from "./page/home.jsx";
import History from "./page/history.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/:url" element={<VideoMeetComponent />} />
            <Route path="/history" element={<History />} />
            <Route path="/home" element={<HomeComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

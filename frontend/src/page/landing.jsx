import React from "react";
import "../App.css";
import SplashCursor from "../utils/cursor";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();
  return (
    <div className="landingPageContainer">
      <SplashCursor />
      <nav>
        <div className="navheader">
          <h2 className="no-cursor-effect">Flowtalk</h2>
        </div>
        <div className="navlist">
          <p
            className="no-cursor-effect"
            onClick={() => {
              router("/lobby");
            }}
          >
            Join as Guest
          </p>
          <p
            className="no-cursor-effect"
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div role="button">
            <p
              className="no-cursor-effect"
              onClick={() => {
                router("/auth");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="heroContent">
          <h1>Connect with Anyone, Anywhere.</h1>
          <p>
            Flowtalk makes video conferencing simple, fast, and secure.
            Collaborate with your team or chat with friends in just a click.
          </p>

          <Link to="/auth" className="getStartedBtn no-cursor-effect">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

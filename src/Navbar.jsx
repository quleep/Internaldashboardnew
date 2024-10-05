import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Arnxt from "./images/arnxtreg.png";

const Navbar = () => {
  const navigate = useNavigate(); 

  const onBackHandler = (e) => {
    e.preventDefault();
    navigate(-1); // Navigate back using navigate
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/"); // Use navigate to go to the homepage
  };

  let uname = JSON.parse(sessionStorage.getItem("user"));
  let pageVisisted = new Date().toString();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const pageVisited = new Date();

    const intervalId = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now - pageVisited) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div>
      <div className="header">
        <div className="profile-info">
          <img src={Arnxt} alt="Avatar" className="profile-img" onClick={()=>navigate('/modelpath')} />
          <div className="profile-name">{uname && uname.email}</div>
        </div>
        <div className="profile-name">Welcome to Arxnt Internal Dashboard</div>
        <div className="logout">
          <div className="logoutinside">
            <span>Logged in:</span>{" "}
            <div className="logged-in" id="counter"></div>
          </div>
          <div className="time-year">
            {pageVisisted.split(" ").slice(0, 4).join(" ")}{" "}
            {formatTime(elapsedTime)}
          </div>
          <div className="button-row-logout">
            <button className="logout-button" onClick={onBackHandler}>
              Back
            </button>
            <button className="logout-button" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

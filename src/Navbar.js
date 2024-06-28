import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Arnxt from "./images/arnxtreg.png";

const Navbar = () => {
  const history = useHistory();
  const onBackHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    history.push("/");
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
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };


  // useEffect(() => {
  //   let logindet = document.getElementById("counter").innerHTML;

  //    console.log(logindet)

  //   if (logindet) {
  //     let pageVisisted = new Date();

  //     setInterval(function () {
  //       let timeOnSite = new Date() - pageVisisted;

  //       let secondsTotal = timeOnSite / 1000;
  //       let hours = Math.floor(secondsTotal / 3600);
  //       let minutes = Math.floor(secondsTotal / 60) % 3600;
  //       let seconds = Math.floor(secondsTotal) % 60;

  //       if (logindet) {
  //         logindet = hours + ":" + minutes + ":" + seconds;
  //       }
  //     }, 1000);
  //   }
  // });

  return (
    <div>
      <div className="header">
        <div className="profile-info">
          <img src={Arnxt} alt="Avataar" className="profile-img" />

          <div className="profile-name">{uname && uname.email}</div>
        </div>
        <div className="profile-name">Welcome to Arxnt Internal Dashboard</div>
        <div className="logout">
          <div className="logoutinside">
            <span>Logged in:</span>{" "}
            <div className="logged-in" id="counter"></div>
          </div>
          <div className="time-year">{pageVisisted.split(' ').slice(0,4).join(' ')} {formatTime(elapsedTime)}</div>
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

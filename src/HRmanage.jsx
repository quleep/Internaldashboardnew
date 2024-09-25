import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Retain if you need to access the location
import Divider from "./images/divider.svg";
import axios from "axios";

const adminurl =
  "https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminroute";

const HRmanage = () => {
  const [email, setEmail] = useState("");
  const [employeeid, setEmployeeId] = useState("");
  const [role, setRole] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      employee_Id: employeeid,
      role: role,
    };
    axios
      .post(adminurl, requestBody)
      .then((res) => {
        if (res.status === 201) {
          document.getElementById("submitmessage").innerHTML = "Submitted Successfully";
          setTimeout(() => {
            document.getElementById("submitmessage").innerHTML = "";
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rolesHandler = (e) => {
    e.preventDefault();
    document.getElementById("addrolesdiv").style.display = "block";
  };

  return (
    <div>
      <div className="navbar">
        <div>
          <p className="navoperation">
            <a href="#" onClick={rolesHandler}>
              Assign roles
            </a>
          </p>
        </div>
        <img src={Divider} alt="Your SVG" className="divider-svg" />
        <div>
          <p className="navoperation">
            <a href="/jobpost">Post job</a>
          </p>
        </div>
        <img src={Divider} alt="Your SVG" className="divider-svg" />
        <div>
          <p className="navoperation">
            <a href="/viewapplicants">View Applicants Info</a>
          </p>
        </div>
      </div>

      <form className="login" id="addrolesdiv" onSubmit={submitHandler}>
        <h2>ARnxt, Admin!</h2>
        <p>Please assign roles</p>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ARnxt email"
          required
        />
        <input
          type="text"
          onChange={(event) => setEmployeeId(event.target.value)}
          placeholder="Employee ID"
          required
        />

        <select
          className="admindropdown"
          onChange={(event) => setRole(event.target.value)}
          required
        >
          <option value="" disabled selected>
            Assign roles
          </option>
          <option value="modelhead">Model Head</option>
          <option value="user">User</option>
          <option value="ql">QL</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>

        <input type="submit" value="Submit" style={{ cursor: "pointer" }} />
        <p style={{ color: 'green' }} id="submitmessage"></p>
      </form>
    </div>
  );
};

export default HRmanage;

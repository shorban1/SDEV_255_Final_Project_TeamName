import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Schedule from "./pages/Schedule";
import Teacher from "./pages/Teacher";
import Course from "./pages/Course";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";

function logOut() {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
  localStorage.removeItem("uname");
  localStorage.removeItem("role");

  window.location.replace("/SDEV_255_Final_Project_TeamName/#/");
  window.location.reload();
}

function Header({ name }) {
  let logoutBtn = "";
  if (localStorage.getItem("auth") == 1) {
    logoutBtn = (
      <li>
        <button id="logout" onClick={logOut}>
          Logout
        </button>
      </li>
    );
  }
  return (
    <header>
      <Link to="/">{name}</Link>
      <nav>
        <ul>
          <li>
            <Link to="/student">Student</Link>
          </li>
          <li>
            <Link to="/teacher">Teacher</Link>
          </li>
          {logoutBtn}
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <>
      <Header name="Course Manager" />
      <Routes>
        <Route path="/" element={<Home name="Course Manager" />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/schedule" element={<Schedule />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/courses/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

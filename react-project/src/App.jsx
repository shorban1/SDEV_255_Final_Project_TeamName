import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";

function Header({ name }) {
  return (
    <header>
      <a href="./">{name}</a>
      <nav>
        <ul>
          <li>
            <a href="./student">Student</a>
          </li>
          <li>
            <a href="./teacher">Teacher</a>
          </li>
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
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </>
  );
}

export default App;

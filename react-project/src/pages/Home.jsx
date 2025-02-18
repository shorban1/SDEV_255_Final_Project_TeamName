import React from "react";
import { Link } from "react-router-dom";
import Student from "./Student";
import Teacher from "./Teacher";

const Home = ({ name }) => (
  <div id="content">
    <h1>Get started using {name} </h1>
    <div id="buttons">
      <Link className="button-link" to="/student">
        Student
      </Link>
      <Link className="button-link" to="/teacher">
        Teacher
      </Link>
    </div>
  </div>
);

export default Home;

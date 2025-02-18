import React from "react";

const Home = ({ name }) => (
  <div id="content">
    <h1>Get started using {name} </h1>
    <div id="buttons">
      <a className="button-link" href="/student">
        Student
      </a>
      <a className="button-link" href="/teacher">
        Teacher
      </a>
    </div>
  </div>
);

export default Home;

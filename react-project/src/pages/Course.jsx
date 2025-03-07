import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Course() {
  const { id } = useParams();
  let courseOptions = "";
  useEffect(() => {
    if (localStorage.getItem("auth") !== "1") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    }

    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/" + id
        //For Local Development
        //"http://localhost:3000/api/courses/" + songID
      );
      const course = await response.json();

      if (localStorage.getItem("role") == "teacher") {
        if (course.instructor_ids.includes(localStorage.getItem("id"))) {
          courseOptions = "<a href='#/courses/edit/" + id + "'>Edit</a>";
        }
      } else if (localStorage.getItem("role") == "student") {
      }

      let html = "";

      html += `
      <h1>${course.title} - ${course.department}${course.course_number}</h1>
      <h2>Credits: ${course.credits}</h2>
      <p>Description: ${course.description}</p>
      ${courseOptions}
      `;

      document.querySelector("#course-details").innerHTML = html;
    }

    fetchCourses();
  });

  return (
    <div id="content">
      <div id="course-details"></div>
    </div>
  );
}

export default Course;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Course() {
  const { id } = useParams();
  useEffect(() => {
    async function fetchCourses() {
      console.log(id);

      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/" + id
        //For Local Development
        //"http://localhost:3000/api/courses/" + songID
      );
      const course = await response.json();
      console.log(course);

      let html = "";

      html += `
      <h2>${course.title} - ${course.department}${course.course_number}</h2>
      <p>Credits: ${course.credits}</p>
      <p>Description: ${course.description}</p>
      <a href="#/courses/edit/${course._id}">Edit</a>
      `;

      document.querySelector("#course-details").innerHTML = html;
    }

    fetchCourses();
  });

  return (
    <div id="content">
      <div>
        <h1>Course View</h1>
      </div>
      <div id="course-details"></div>
    </div>
  );
}

export default Course;

import React, { useEffect } from "react";

function Teacher() {
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        "https://carbonated-rich-sumac.glitch.me/api/courses"
      );
      const courses = await response.json();

      let html = "";
      for (let course of courses) {
        html += `<a href="#/courses?id=${course._id}">${course.title} - ${course.code}</a> - <a href="edit.html?id=${course._id}">Edit</a></li>`;
      }

      document.querySelector("#course-list").innerHTML = html;
    }

    fetchCourses();
  });

  return (
    <div id="content">
      <div>
        <h1>Courses</h1>
        <button>+ Add</button>
      </div>
      <div id="course-list"></div>
    </div>
  );
}

export default Teacher;

import React, { useEffect } from "react";

function Cart() {
  useEffect(() => {
    if (localStorage.getItem("role") !== "student") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    }
    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/student/" +
          localStorage.getItem("id")
        //For Local Development
        //"http://localhost:3000/api/courses"
      );
      const courses = await response.json();

      let html = "";
      for (let course of courses) {
        html += `
        <div class='course-card'>
          <div class='course-info'>
            <h3>${course.title} - ${course.department}${course.course_number}</h3>
            ${course.credits} Credit Hours
          </div>
          <div class = 'course-options'>
            <a href="#/courses/${course._id}">View</a><a href="#/courses/edit/${course._id}">Drop</a>
          </div>
        </div>`;
      }

      document.querySelector("#course-list").innerHTML = html;
    }

    fetchCourses();
  });

  return (
    <div id="content">
      <div>
        <h1>Cart</h1>
      </div>
      <div id="course-list"></div>
    </div>
  );
}

export default Cart;

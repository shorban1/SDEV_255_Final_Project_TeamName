import React, { useEffect } from "react";
async function addCourse() {
  const id = document.querySelector("#course-id").value;
  const course = {
    _id: document.querySelector("#course-id").value,
    title: document.querySelector("#title").value,
    department: document.querySelector("#department").value,
    course_number: document.querySelector("#course-num").value,
    credits: document.querySelector("#credits").value,
    description: document.querySelector("#description").value,
  };
  const response = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/courses/" + id,
    //For Local Development
    //"http://localhost:3000/api/courses/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    }
  );

  if (response.ok) {
    alert("Updated Course");
  } else {
    document.querySelector("#error").innerHTML = "Cannot update course";
  }
}
function Student() {
  useEffect(() => {
    if (localStorage.getItem("role") !== "student") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    }
    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/"
          
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
            <a href="#/courses/${course._id}">View</a><button id="add-course-btn" onClick={addCourse}>
          Add  </button>
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
        <h1>All Courses</h1>
        
      
     
        
      </div>
      <div id="course-list"></div>
    </div>
  );
}

export default Student;

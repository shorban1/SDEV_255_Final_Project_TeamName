import React, { useEffect } from "react";

function toggleModule() {
  if (document.querySelector("#add-module").style.display == "block") {
    document.querySelector("#add-module").style.display = "none";
    document.querySelector("#add-course-open-btn").innerHTML = "Add a Course +";
  } else {
    document.querySelector("#add-module").style.display = "block";
    document.querySelector("#add-course-open-btn").innerHTML = "Add a Course x";
  }
}

async function addCourse() {
  const course = {
    title: document.querySelector("#title").value,
    department: document.querySelector("#department").value,
    course_number: document.querySelector("#course-num").value,
    credits: document.querySelector("#credits").value,
    description: document.querySelector("#description").value,
    instructor_ids: ["67c66f59b0f5c4ab17437c8a", localStorage.getItem("uid")],
  };

  const response = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/courses",
    //For Local Development
    //"http://localhost:3000/api/courses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    }
  );

  if (response.ok) {
    const results = await response.json();
    alert("Added course with ID of " + results._id);
    //document.querySelector("form").reset();
    window.location.reload();
  } else {
    document.querySelector("#error").innerHTML = "Cannot add course";
  }
}

function Teacher() {
  useEffect(() => {
    if (localStorage.getItem("role") !== "teacher") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    }
    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses"
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
            <a href="#/courses/${course._id}">View</a><a href="#/courses/edit/${course._id}">Edit</a>
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
        <h1>Courses</h1>
        <button id="add-course-open-btn" onClick={toggleModule}>
          Add a Course +
        </button>
      </div>
      <div id="add-module">
        <form>
          <div>
            <label htmlFor="title">Course Title:</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="department">Department(XX):</label>
            <input type="text" id="department" />
          </div>
          <div>
            <label htmlFor="course-num">Course Number(XXXXX):</label>
            <input type="text" id="course-num" />
          </div>
          <div>
            <label htmlFor="credits">Credits:</label>
            <input type="number" id="credits" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" cols="30" rows="10"></textarea>
          </div>
          <div>
            <input
              type="button"
              id="add-course-btn"
              value="Add Course"
              onClick={addCourse}
            />
          </div>
          <div id="error"></div>
        </form>
      </div>
      <div id="course-list"></div>
    </div>
  );
}

export default Teacher;

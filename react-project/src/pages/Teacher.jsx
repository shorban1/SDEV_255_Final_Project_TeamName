import React, { useEffect } from "react";

async function addCourse() {
  const course = {
    title: document.querySelector("#title").value,
    department: document.querySelector("#department").value,
    course_number: document.querySelector("#course-num").value,
    credits: document.querySelector("#credits").value,
    description: document.querySelector("#description").value,
    instructor_ids: ["T001"],
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
    document.querySelector("form").reset();
  } else {
    document.querySelector("#error").innerHTML = "Cannot add course";
  }
}

function Teacher() {
  useEffect(() => {
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
        html += `<a href="#/courses?id=${course._id}">${course.title} - ${course.department}${course.course_number}</a> - <a href="#/courses/edit?id=${course._id}">Edit</a></li>`;
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
      <div id="add_module">
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

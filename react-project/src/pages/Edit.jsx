import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

async function editCourse() {
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
async function deleteCourse() {
  const id = document.querySelector("#course-id").value;
  const response = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/courses/" + id,
    //For Local Development
    //"http://localhost:3000/api/courses/" + id,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    alert("Deleted Course");
  } else {
    document.querySelector("#error").innerHTML = "Cannot delete course";
  }
}

function Edit() {
  const { id } = useParams();
  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/" + id
        //For Local Development
        //"http://localhost:3000/api/courses/" + id
      );
      if (response.ok) {
        let course = await response.json();
        document.querySelector("#course-id").value = id;
        document.querySelector("#title").value = course.title;
        document.querySelector("#department").value = course.department;
        document.querySelector("#course-num").value = course.course_number;
        document.querySelector("#credits").value = course.credits;
        document.querySelector("#description").value = course.description;
      }
    }

    fetchCourses();
  });

  return (
    <div id="content">
      <h1>Edit Course</h1>
      <form>
        <div>
          <label htmlFor="course-id">Course ID:</label>
          <input type="text" id="course-id" />
        </div>
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
            id="edit-course-btn"
            value="Edit Course"
            onClick={editCourse}
          />
        </div>
        <div id="error"></div>
      </form>
      <button onClick={deleteCourse}>Delete</button>
    </div>
  );
}

export default Edit;

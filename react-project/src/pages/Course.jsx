import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

async function addCourse(cid) {
  const id = localStorage.getItem("id");

  const response1 = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/users/" + id
    //For Local Development
    //"http://localhost:3000/api/courses/" + songID
  );
  const user = await response1.json();
  if (!user.courses.includes(cid)) {
    user.courses.push(cid);

    const response2 = await fetch(
      //For Deployment
      "https://mire-fluttering-scale.glitch.me/api/users/" + id,
      //For Local Development
      //"http://localhost:3000/api/courses/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (response2.ok) {
      alert("Course added to schedule");
      window.location.reload();
    } else {
      alert("Course failed to add to your schedule");
    }
  } else {
    alert("This course is already in your schedule");
  }
}
async function dropCourse(cid) {
  const id = localStorage.getItem("id");

  const response1 = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/users/" + id
    //For Local Development
    //"http://localhost:3000/api/courses/" + songID
  );
  const user = await response1.json();

  if (user.courses.includes(cid)) {
    user.courses.splice(user.courses.indexOf(cid), 1);
  }

  const response2 = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/users/" + id,
    //For Local Development
    //"http://localhost:3000/api/courses/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (response2.ok) {
    alert("Removed course from schedule");
    window.location.reload();
  } else {
    document.querySelector("#error").innerHTML =
      "Cannot remove course from schedule";
  }
}

function Course() {
  const { id } = useParams();
  const [courseOptions, setCourseOptions] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [loaded, setLoaded] = useState(false);
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
      if (!loaded) {
        if (localStorage.getItem("role") == "teacher") {
          if (course.instructor_ids.includes(localStorage.getItem("id"))) {
            setCourseOptions(
              <a href={"#/courses/edit/" + id} className="button-link-2">
                Edit
              </a>
            );
          }
        } else if (localStorage.getItem("role") == "student") {
          const response1 = await fetch(
            //For Deployment
            "https://mire-fluttering-scale.glitch.me/api/users/" +
              localStorage.getItem("id")
            //For Local Development
            //"http://localhost:3000/api/courses/" + songID
          );
          const user = await response1.json();

          if (user.courses.includes(id)) {
            setCourseOptions(
              <button className="button-link-2" onClick={() => dropCourse(id)}>
                Drop
              </button>
            );
          } else {
            setCourseOptions(
              <button className="button-link-2" onClick={() => addCourse(id)}>
                Add
              </button>
            );
          }
        }
      }
      setCourseDetails(
        <div>
          <h2>
            {course.title} - {course.department}
            {course.course_number}
          </h2>
          <h3>Credits: {course.credits}</h3>
          <p>{course.description}</p>
        </div>
      );
      setLoaded(true);
    }

    fetchCourses();
  }, [courseOptions]);

  return (
    <div id="content">
      <h1>Course Details</h1>
      {localStorage.getItem("role") == "student" && (
        <a href="#/student" className="button-link-2">
          Return to Courses
        </a>
      )}
      {localStorage.getItem("role") == "teacher" && (
        <a href="#/teacher" className="button-link-2">
          Return to Courses
        </a>
      )}{" "}
      <div id="course-details">
        {courseDetails}
        {courseOptions}
      </div>
    </div>
  );
}

export default Course;

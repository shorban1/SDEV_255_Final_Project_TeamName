import React, { useState, useEffect } from "react";

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
function Student() {
  const [coursesState, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth") != 1) {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    } else if (localStorage.getItem("role") !== "student") {
      alert(
        "You are currently signed in with a teacher account.\nLog out and sign in with a student account to view this page."
      );
      window.history.back();
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
      if (JSON.stringify(courses) !== JSON.stringify(coursesState)) {
        setCourses(courses);
      }
      setLoaded(true);
    }

    fetchCourses();
  }, [coursesState]);
  return (
    <div id="content">
      <div>
        <h1>All Courses</h1>
      </div>
      <a className="button-link-2" href="#/student/schedule">
        My Schedule
      </a>
      <div id="course-list">
        {coursesState.map((course) => {
          return (
            <div className="course-card" key={course._id}>
              <div className="course-info">
                <h3>
                  {course.title} - {course.department}
                  {course.course_number}
                </h3>
                {course.credits} Credit Hours
              </div>
              <div className="course-options">
                <a href={"#/courses/" + course._id}>View</a>
                <button onClick={() => addCourse(course._id)}>Add</button>
              </div>
            </div>
          );
        })}
        {coursesState.length === 0 && loaded && (
          <h3 className="no-courses">
            There are no available courses to take.
          </h3>
        )}
        {coursesState.length === 0 && loaded && (
          <h4 className="no-courses">
            Check back later to see if any additions are made.
          </h4>
        )}
      </div>
    </div>
  );
}

export default Student;

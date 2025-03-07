import React, { useState, useEffect } from "react";
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
function Schedule() {
  const [coursesState, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("role") !== "student") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
    }
    async function fetchCourses() {
      const response = await fetch(
        //For Deployment
        "https://mire-fluttering-scale.glitch.me/api/courses/student/schedule/" +
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
        <h1>Schedule</h1>
        <a id="schedule-link" href="#/student">
          Return to Courses
        </a>
      </div>
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
                <button onClick={() => dropCourse(course._id)}>Drop</button>
              </div>
            </div>
          );
        })}
        {coursesState.length === 0 && loaded && (
          <h3 class="no-courses">You are not scheduled for any courses</h3>
        )}
      </div>
    </div>
  );
}

export default Schedule;

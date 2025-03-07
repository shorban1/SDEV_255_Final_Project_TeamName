import { useEffect } from "react";

async function register() {
  const user = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
    role: document.querySelector("#role option:checked").value,
  };

  const response = await fetch(
    //For Deployment
    "https://mire-fluttering-scale.glitch.me/api/users",
    //For Local Development
    //"http://localhost:3000/api/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (response.ok) {
    const results = await response.json();
    alert("Added course with ID of " + results._id);
    window.location.reload();
  } else {
    document.querySelector("#error").innerHTML = "Cannot add course";
  }

  if (response.ok) {
    const results = await response.json();
    document.querySelector("#error").innerHTML = "";
    alert("Registered User with ID of " + results._id);
    window.location.replace("/SDEV_255_Final_Project_TeamName/#/login");
  } else {
    const err = await response.text();
    document.querySelector("#error").innerHTML = err;
  }
}

function Register() {
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth == 1) {
      alert("You are already signed in");
      window.history.back();
    }
  });

  return (
    <div id="content">
      <div>
        <h1>Register</h1>
      </div>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select name="role" id="role">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div id="error"></div>
        <div>
          <input
            type="button"
            id="register-btn"
            value="Register"
            onClick={register}
          />
        </div>
      </form>
    </div>
  );
}

export default Register;

import { useEffect } from "react";

let token;

async function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  console.log(username, password);

  const login_cred = {
    username,
    password,
  };
  const response = await fetch(
    "https://mire-fluttering-scale.glitch.me/api/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_cred),
    }
  );
  if (response.ok) {
    document.querySelector("#error").innerText = "";
    const tokenResponse = await response.json();
    token = tokenResponse.token;
    const id = tokenResponse.id;
    const uname = tokenResponse.username2;
    const auth = tokenResponse.auth;
    const role = tokenResponse.role;
    console.log(token);

    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("uname", uname);
    localStorage.setItem("auth", auth);
    localStorage.setItem("role", role);

    if (role === "teacher") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/teacher");
    } else if (role === "student") {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/student");
    } else {
      window.location.replace("/SDEV_255_Final_Project_TeamName/#/");
    }
    window.location.reload();
  } else {
    document.querySelector("#error").innerText = "Bad username and password";
  }
}

function Login() {
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
        <h1>Sign In</h1>
      </div>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div id="error"></div>
        <div>
          <input
            type="button"
            id="signin-btn"
            value="Sign In"
            onClick={login}
          />
        </div>
      </form>
      Not registered?{" "}
      <a href="/SDEV_255_Final_Project_TeamName/#/register">
        Click Here to Register
      </a>
    </div>
  );
}

export default Login;

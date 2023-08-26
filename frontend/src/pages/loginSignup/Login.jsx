import React from "react";
import "./loginSignup.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backendURL from "../../backendURL";

function Login() {
  const navigate = useNavigate();

  // getting data from login form
  const loginForm = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let obj = { email, password };
    loginUser(obj);
  };

  // login user function
  async function loginUser(obj) {
    let userLogin = await fetch(`${backendURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (userLogin.status === 201) {
      let userDetails = await userLogin.json();
      localStorage.setItem("token", userDetails.token);
      localStorage.setItem("userID", userDetails.user.userID);
      localStorage.setItem("userName", userDetails.user.userName);
      Swal.fire({
        icon: "success",
        title: `Yay! Login Successful 😍 welcome ${userDetails.user.name}`,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Credential!",
      });
    }
  }

  return (
    <div className="loginSignupContainer">
      <form action="" onSubmit={loginForm}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
        <label htmlFor="">Email</label>
        <br />
        <input type="email" id="email" required />
        <br />
        <label htmlFor="">Password</label>
        <br />
        <input type="password" id="password" required />
        <br />
        <div className="loginSignupBtnDiv">
          <input type="submit" value="Login" />
        </div>
        <div className="registerBtnDIv">
          <p>Don't have account?</p>
          <Link to="/signup">Click here to register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

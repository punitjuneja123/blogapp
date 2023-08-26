import React from "react";
import "./loginSignup.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backendURL from "../../backendURL";

function Signup() {
  const navigate = useNavigate();

  // getting data from signupform
  const signupFormHandler = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let obj = { name, email, password };
    signupUser(obj);
  };

  // signing/regestering up user
  async function signupUser(obj) {
    let userSignup = await fetch(`${backendURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (userSignup.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Hey👋! Welcome to blogapp",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, "2000");
    } else {
      let err = await userSignup.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.msg}`,
      });
    }
  }

  return (
    <div className="loginSignupContainer">
      <form action="" onSubmit={signupFormHandler}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Signup</h1>
        <label htmlFor="">Full Name</label>
        <br />
        <input type="text" id="name" required />
        <br />
        <label htmlFor="">Email</label>
        <br />
        <input type="email" id="email" required />
        <br />
        <label htmlFor="">Password</label>
        <br />
        <input type="password" id="password" required />
        <br />
        <div className="loginSignupBtnDiv">
          <input type="submit" value="Signup" />
        </div>
      </form>
    </div>
  );
}

export default Signup;

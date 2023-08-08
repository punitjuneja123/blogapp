import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  // checking if user is signed in
  let token = localStorage.getItem("token");
  let isSignedin = false;
  if (token) {
    isSignedin = true;
  }
  const [signedin, setSignedin] = useState(isSignedin);
  console.log(signedin);

  // logout button handler
  const logoutBtnHandler = () => {
    localStorage.removeItem("token");
    setSignedin(false);
  };

  return (
    <nav className="navBarContainer">
      <div className="appNameDiv">
        <h1 className="appName">Blog App</h1>
      </div>
      {signedin ? (
        <div className="userDiv">
          <button
            className="userBlogsBtn"
            onClick={() => {
              navigate("/yourposts");
            }}
          >
            Your Blogs
          </button>
          <button
            className="postBlogBtn"
            onClick={() => {
              navigate("/blog/post");
            }}
          >
            Post Blog
          </button>
          <button className="logoutBtn" onClick={logoutBtnHandler}>
            Logout
          </button>
        </div>
      ) : (
        <div className="loginSignupBtnDiv">
          <button className="loginSignupBtn">
            <Link className="loginSignupLink" to="/login">
              Login / Signup
            </Link>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

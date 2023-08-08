import React from "react";
import "./blogs.css";
import { useNavigate } from "react-router-dom";

function BlogsCard({ blog }) {
  const navigate = useNavigate();
  const readmoreBtnHandler = () => {
    navigate(`viewblog/${blog.id}`);
  };
  return (
    <div className="blogCard">
      <div className="blogImgDiv">
        <img src={`http://13.53.207.156:4500/images/${blog.image}`} alt="" />
      </div>
      <div className="blogContentDiv">
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
      <div className="readMoreBtnDiv">
        <button onClick={readmoreBtnHandler}>Read More</button>
      </div>
    </div>
  );
}

export default BlogsCard;

import React from "react";
import "./blogs.css";
import { useNavigate } from "react-router-dom";
import backendURL from "../../backendURL";

function BlogsCard({ blog }) {
  const navigate = useNavigate();
  const readmoreBtnHandler = () => {
    navigate(`viewblog/${blog.id}`);
  };
  return (
    <div className="blogCard">
      <div className="blogImgDiv">
        <img src={`${backendURL}/images/${blog.image}`} alt="" />
      </div>
      <div className="categoryDiv">
        <p>{blog.category}</p>
      </div>
      <div className="blogContentDiv">
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
      <div className="postedByDiv">
        <p>Posted By:</p>
        <p>{blog.author_name}</p>
      </div>
      <div className="readMoreBtnDiv">
        <button onClick={readmoreBtnHandler}>Read More</button>
      </div>
    </div>
  );
}

export default BlogsCard;

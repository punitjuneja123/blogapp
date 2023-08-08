import React from "react";
import "./yourBlogCard.css";
import { useNavigate } from "react-router-dom";

function YourBlogCard({ post, deletePostHandler }) {
  const navigate = useNavigate();
  const editBtnHandler = () => {
    navigate(`/editBlog/${post.id}`, { state: post });
  };
  return (
    <div className="yourblogCard">
      <div className="blogTitleDiv">
        <p>{post.title}</p>
      </div>
      <div className="EDbuttonsDiv">
        <button onClick={editBtnHandler}>Edit</button>
        <button onClick={deletePostHandler}>Delete</button>
      </div>
    </div>
  );
}

export default YourBlogCard;

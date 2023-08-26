import React from "react";
import "./commentCard.css";

function CommentCard({ commentData }) {
  return (
    <div className="comment_container">
      <p>{commentData.user_name}</p>
      <p>{commentData.comment}</p>
    </div>
  );
}

export default CommentCard;

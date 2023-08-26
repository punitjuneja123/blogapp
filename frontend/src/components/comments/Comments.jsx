import React, { useState, useEffect } from "react";
import "./comments.css";
import { useParams } from "react-router-dom";
import backendURL from "../../backendURL";
import CommentCard from "../commentCard/CommentCard";

function Comments() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // fetch comments
    fetch(`${backendURL}/comment/${params.blogID}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [count]);

  const handleComment = async (e) => {
    e.preventDefault();
    let comment = e.target.comment.value;
    let userID = localStorage.getItem("userID") || 0;
    let userName = localStorage.getItem("userName") || "anonymous";
    let obj = { comment, userID, userName };

    // posting comments
    let postComment = await fetch(
      `${backendURL}/comment/postComment/${params.blogID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    if (postComment.status == 201) {
      setCount(count+1);
    } else {
      alert("something went wrong");
    }
  };
  return (
    <div className="comments_container">
      <h3>Comments: </h3>
      <div className="commentsDiv">
        {comments.map((item, index) => {
          return <CommentCard commentData={item} />;
        })}
      </div>

      <div className="postCommentDiv">
        <form action="" onSubmit={handleComment}>
          <textarea
            name=""
            id="comment"
            cols="100"
            rows="2"
            required
          ></textarea>
          <input type="submit" value="Comment" />
        </form>
      </div>
    </div>
  );
}

export default Comments;

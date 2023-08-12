import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./yourpost.css";

import YourBlogCard from "../../components/yourBlogCard/YourBlogCard";

function YourPost() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    fetch(
      `http://13.53.207.156:4500/blog/authorblogs/${localStorage.getItem(
        "userID"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, [update]);

  async function deletePost(id) {
    let checkDltStatus = await fetch(
      `http://blogapp-backend-823671928.eu-north-1.elb.amazonaws.com:4500/blog/deleteblog/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (checkDltStatus.status === 200) {
      setUpdate(1);
    } else {
      alert("something went wrong");
    }
  }
  return (
    <div>
      <Navbar />
      <div className="yourpostsContainer">
        {posts.length === 0 ? (
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            What are you waiting for? Post Your 1st Blog 😉
          </h1>
        ) : (
          <div className="postsContainer">
            {posts.map((post, index) => {
              return (
                <YourBlogCard
                  key={index}
                  post={post}
                  deletePostHandler={() => {
                    deletePost(post.id);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourPost;

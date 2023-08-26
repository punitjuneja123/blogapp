import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewblog.css";
import Navbar from "../../components/navbar/Navbar";
import backendURL from "../../backendURL";
import Comments from "../../components/comments/Comments";

function ViewBlog() {
  const params = useParams();
  const [blogData, setBlogData] = useState({});
  const [createdAt, setCreatedAt] = useState([]);
  useEffect(() => {
    // fetch blog Dta
    fetch(`${backendURL}/blog/${params.blogID}`)
      .then((res) => res.json())
      .then((data) => {
        setCreatedAt(data.createdAt.split("T")[0]);
        setBlogData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  // splitting content by /n
  const formattedContent = blogData.content
    ? blogData.content.replace(/\n/g, "<br>")
    : "";

  // createdAt data
  return (
    <>
      <Navbar />
      <div className="blogContainer">
        <div className="blogImageDiv">
          <img src={`${backendURL}/images/${blogData.image}`} alt="" />
        </div>
        <div className="authorDetDiv">
          <p>
            Posted By: {blogData.author_name} / {createdAt}
          </p>
        </div>
        <div className="RBcontentDiv">
          <h1>{blogData.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
        </div>
      </div>
      <Comments />
    </>
  );
}

export default ViewBlog;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewblog.css";
import Navbar from "../../components/navbar/Navbar";

function ViewBlog() {
  const params = useParams();
  const [blogData, setBlogData] = useState({});
  useEffect(() => {
    fetch(
      `http://blogapp-backend-823671928.eu-north-1.elb.amazonaws.com:4500/blog/${params.blogID}`
    )
      .then((res) => res.json())
      .then((data) => setBlogData(data))
      .catch((err) => console.log(err));
  }, []);
  // splitting content by /n
  const formattedContent = blogData.content
    ? blogData.content.replace(/\n/g, "<br>")
    : "";
  return (
    <>
      <Navbar />
      <div className="blogContainer">
        <div className="blogImageDiv">
          <img
            src={`http://blogapp-backend-823671928.eu-north-1.elb.amazonaws.com:4500/images/${blogData.image}`}
            alt=""
          />
        </div>
        <div className="RBcontentDiv">
          <h1>{blogData.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
        </div>
      </div>
    </>
  );
}

export default ViewBlog;

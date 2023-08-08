import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BlogsCard from "../../components/Blogs/BlogsCard";
import "./homepage.css";
import axios from "axios";

function Homepage() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.53.207.156:4500/blog")
      .then((data) => setBlogData(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blogsContainer">
        {blogData.map((blog, index) => {
          return <BlogsCard key={index} blog={blog} />;
        })}
      </div>
    </div>
  );
}

export default Homepage;

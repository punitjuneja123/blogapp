import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BlogsCard from "../../components/Blogs/BlogsCard";
import "./homepage.css";
import axios from "axios";
import backendURL from "../../backendURL";
import SearchIcon from "@mui/icons-material/Search";

function Homepage() {
  console.log(backendURL);
  const [blogData, setBlogData] = useState([]);
  let inputData = "";

  useEffect(() => {
    axios
      .get(`${backendURL}/blog`)
      .then((data) => setBlogData(data.data))
      .catch((err) => console.log(err));
  }, []);

  // handle search functionality
  const searchInput = (e) => {
    inputData = e.target.value;
  };

  const handleSearchBtn = () => {
    if (inputData == "") {
      axios
        .get(`${backendURL}/blog`)
        .then((data) => setBlogData(data.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${backendURL}/blog/search/${inputData}`)
        .then((data) => setBlogData(data.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <input type="text" placeholder="Search..." onChange={searchInput} />
        <button className="search-button">
          <SearchIcon
            style={{ marginTop: "5px", color: "white" }}
            onClick={handleSearchBtn}
          />
        </button>
      </div>
      <div className="blogsContainer">
        {blogData.map((blog, index) => {
          return <BlogsCard key={index} blog={blog} />;
        })}
      </div>
    </div>
  );
}

export default Homepage;

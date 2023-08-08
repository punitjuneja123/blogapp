import React, { useState } from "react";
import "./editpage.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditPage() {
  let baseURL = "http://13.53.207.156:4500";

  // getting data of post when redirected
  const location = useLocation();
  let post = location.state;

  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: post.title,
    content: post.content,
    category: post.category,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const postFormHandler = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let content = e.target.content.value;
    let category = e.target.category.value;
    let obj = { title, content, category };
    updateBlog(obj);
  };

  async function updateBlog(obj) {
    let updateData = await fetch(`${baseURL}/blog/updateblog/${post.id}`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (updateData.status === 200) {
      Swal.fire({
        icon: "success",
        title: `Blog Updated`,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/yourposts");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "something went wrong",
      });
    }
  }
  return (
    <div>
      <Navbar />
      <form action="" className="editForm" onSubmit={postFormHandler}>
        <h1
          style={{
            textAlign: "center",
            color: "rgb(29, 205, 211)",
            marginBottom: "20px",
          }}
        >
          Edit your Blog
        </h1>
        <br />
        <label htmlFor="">Title</label>
        <br />
        <input
          type="text"
          required
          id="title"
          value={postData.title}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="">Content</label>
        <br />
        <textarea
          name=""
          id="content"
          cols="30"
          rows="10"
          required
          value={postData.content}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <label htmlFor="">Select Category</label>
        <br />
        <select
          name=""
          id="category"
          value={postData.category}
          onChange={handleInputChange}
        >
          <option value="tech">Tech</option>
          <option value="science">Science</option>
          <option value="business">Business</option>
          <option value="">Art + Design</option>
          <option value="">We Humans</option>
        </select>
        <br />
        <div>
          <input type="submit" value="update" />
        </div>
      </form>
    </div>
  );
}

export default EditPage;

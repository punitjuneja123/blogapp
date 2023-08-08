import React from "react";
import "./postblog.css";
import Navbar from "../../components/navbar/Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Postblog() {
  const navigate = useNavigate();
  let baseURL = "http://13.53.207.156:4500";
  // getting data form form
  const postFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    let image = e.target.image.files[0];
    let title = e.target.title.value;
    let content = e.target.content.value;
    let category = e.target.category.value;
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("userID", localStorage.getItem("userID"));
    // let obj = { image, title, content, category };
    console.log(formData.get("image"));
    // uploading blog
    axios
      .post(`${baseURL}/blog/post`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `Blog Posted`,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/yourposts");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "something went wrong",
        });
      });
  };

  // Uploading data to db
  // async function postBlog(formData) {
  //   let postBlog = await fetch(`${baseURL}/blog/post`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: localStorage.getItem("token"),
  //       "content-Type": "multipart/form-data",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   if (postBlog.status === 201) {
  //     Swal.fire({
  //       icon: "success",
  //       title: `Blog Posted`,
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //     navigate("/");
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "something went wrong",
  //     });
  //   }
  // }

  return (
    <div>
      <Navbar />
      <form action="" className="postForm" onSubmit={postFormHandler}>
        <h1
          style={{
            textAlign: "center",
            color: "rgb(29, 205, 211)",
            marginBottom: "20px",
          }}
        >
          Post your Blog
        </h1>
        <label htmlFor="">Updload Image</label>
        <br />
        <input type="file" accept="image/*" id="image" required />
        <br />
        <label htmlFor="">Title</label>
        <br />
        <input type="text" required id="title" />
        <br />
        <label htmlFor="">Content</label>
        <br />
        <textarea name="" id="content" cols="30" rows="10" required></textarea>
        <br />
        <label htmlFor="">Select Category</label>
        <br />
        <select name="" id="category">
          <option value="tech">Tech</option>
          <option value="science">Science</option>
          <option value="business">Business</option>
          <option value="">Art + Design</option>
          <option value="">We Humans</option>
        </select>
        <br />
        <div>
          <input type="submit" value="Post Blog" />
        </div>
      </form>
    </div>
  );
}

export default Postblog;

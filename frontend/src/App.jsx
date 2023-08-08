import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/loginSignup/Login.jsx";
import Signup from "./pages/loginSignup/Signup";
import Postblog from "./pages/postBlog/Postblog";
import ViewBlog from "./pages/viewBlog/ViewBlog";
import YourPost from "./pages/yourPost/YourPost";
import EditPage from "./pages/editPage/EditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/post" element={<Postblog />} />
          <Route path="/viewblog/:blogID" element={<ViewBlog />} />
          <Route path="/yourposts" element={<YourPost />} />
          <Route path="/editBlog/:post" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

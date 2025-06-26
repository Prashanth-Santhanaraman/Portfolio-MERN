import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import "./App.css";
import Projects from "./Projects";
import Blogs from "./Blogs";
import PostPage from "./PostPage";
import Footer from "./Footer";
import Admin from "./Admin";
import AddBlog from "./AddBlog";
import AddProject from "./AddProject";
import ProjectPostPage from "./ProjectPostPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/post/:id" element={<ProjectPostPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/post/:id" element={<PostPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addblog" element={<AddBlog />} />
          <Route path="/admin/addproject" element={<AddProject />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

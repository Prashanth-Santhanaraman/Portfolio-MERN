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
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import EditTop3Projects from "./EditTop3Projects";
import BlogVisibilitySettings from "./BlogVisibilitySettings";
import ProjectVisibilitySettings from "./ProjectVisibilitySettings";
import PageNotFound from "./PageNotFound";

// Admin V2 (Auth Protected)
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLogin from "./AdminLogin";
import AdminV2Dashboard from "./AdminV2Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AdminAuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/post/:id" element={<ProjectPostPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/post/:id" element={<PostPage />} />
          
          {/* Legacy /admin routes (100% active and untouched) */}
          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addblog" element={<AddBlog />} />
          <Route path="/admin/addproject" element={<AddProject />} />
          <Route path="/admin/deleteblog" element={<DeleteBlog />} />
          <Route path="/admin/editblog" element={<EditBlog />} />
          <Route path="/admin/blogsettings" element={<BlogVisibilitySettings />} />
          <Route path="/admin/projectsettings" element={<ProjectVisibilitySettings />} />
          <Route path="/admin/deleteproject" element={<DeleteProject />} />
          <Route path="/admin/editproject" element={<EditProject />} />
          <Route path="/admin/edittop3projects" element={<EditTop3Projects />} /> */}

          {/* New Admin V2 System (Protected behind Username + Password Login) */}
          <Route path="/admin-v2/login" element={<AdminLogin />} />
          <Route
            path="/admin-v2"
            element={
              <AdminProtectedRoute>
                <AdminV2Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/addblog"
            element={
              <AdminProtectedRoute>
                <AddBlog />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/addproject"
            element={
              <AdminProtectedRoute>
                <AddProject />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/editblog"
            element={
              <AdminProtectedRoute>
                <EditBlog />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/editproject"
            element={
              <AdminProtectedRoute>
                <EditProject />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/edittop3projects"
            element={
              <AdminProtectedRoute>
                <EditTop3Projects />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/blogsettings"
            element={
              <AdminProtectedRoute>
                <BlogVisibilitySettings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/projectsettings"
            element={
              <AdminProtectedRoute>
                <ProjectVisibilitySettings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/deleteblog"
            element={
              <AdminProtectedRoute>
                <DeleteBlog />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-v2/deleteproject"
            element={
              <AdminProtectedRoute>
                <DeleteProject />
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AdminAuthProvider>
  );
}

export default App;

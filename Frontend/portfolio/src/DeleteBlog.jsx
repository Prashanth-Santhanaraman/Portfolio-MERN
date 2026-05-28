import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function DeleteBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null); // holds the blog to be deleted

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blogs`)
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to load blogs.");
      });
  };

  const openConfirm = (blog) => {
    setConfirmModal(blog);
    setPassword("");
  };

  const closeConfirm = () => {
    setConfirmModal(null);
    setPassword("");
  };

  const handleDelete = () => {
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }
    setDeletingId(confirmModal._id);
    axios
      .delete(`${import.meta.env.VITE_BACKENDLINK}/deleteBlog/${confirmModal._id}`, {
        data: { password },
      })
      .then((res) => {
        toast.success(res.data.message);
        setBlogs(res.data.updatedBlogs || []);
        closeConfirm();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => setDeletingId(null));
  };

  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>

      <div className="mx-10 md:mx-36 lg:mx-96 mt-12 mb-20">
        <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold mb-8">
          &lt;Delete Blog /&gt;
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg opacity-50 font-semibold">No blogs found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-slate-950 rounded-xl p-4 transition-all hover:shadow-lg"
              >
                <img
                  src={blog.imglink}
                  alt={blog.title}
                  className="h-24 w-36 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg leading-snug line-clamp-1">{blog.title}</h2>
                  <p className="text-sm opacity-60 mt-1 line-clamp-2">{blog.shortdescription}</p>
                </div>
                <button
                  className="btn btn-error btn-sm flex-shrink-0 gap-1"
                  onClick={() => openConfirm(blog)}
                  disabled={deletingId === blog._id}
                >
                  {deletingId === blog._id ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-base-100 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-1">Confirm Deletion</h2>
            <p className="text-sm opacity-60 mb-4">
              You're about to delete <span className="font-semibold opacity-100">"{confirmModal.title}"</span>. This action cannot be undone.
            </p>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Admin Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                autoFocus
              />
            </fieldset>

            <label className="label mt-2 cursor-pointer gap-2 justify-start">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="text-sm">Show Password</span>
            </label>

            <div className="flex gap-3 mt-5">
              <button
                className="btn btn-error flex-1"
                onClick={handleDelete}
                disabled={deletingId !== null}
              >
                {deletingId !== null ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Delete Blog"
                )}
              </button>
              <button className="btn btn-outline flex-1" onClick={closeConfirm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

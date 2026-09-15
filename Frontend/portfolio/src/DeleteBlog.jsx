import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaTrashAlt, 
  FaArrowLeft, 
  FaExclamationTriangle, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaTimes,
  FaFileAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DeleteBlog() {
  const navigate = useNavigate();
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
        toast.success(res.data.message || "Blog deleted successfully!");
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
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto px-4 my-10 mb-24">
        {/* Navigation & Header */}
        <button
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4 px-1"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-rose-600 dark:text-rose-400">&lt;</span>
              Delete Blog
              <span className="text-rose-600 dark:text-rose-400">/&gt;</span>
            </h1>
          </div>
        </div>

        {/* Blog Directory */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-200/40 dark:border-rose-900/20">
            <span className="loading loading-spinner loading-md text-rose-600"></span>
            <p className="text-xs text-slate-400 mt-2">Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-200/40 dark:border-rose-900/20">
            <FaFileAlt className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No blogs found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              Select an article to permanently remove
            </p>
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-rose-200/70 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={blog.imglink}
                    alt={blog.title}
                    className="w-16 h-16 md:w-20 md:h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=No+Img";
                    }}
                  />
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate">
                      {blog.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {blog.shortdescription || "No short description provided."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <button
                    onClick={() => openConfirm(blog)}
                    disabled={deletingId === blog._id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all text-xs font-semibold shrink-0 disabled:opacity-50"
                  >
                    {deletingId === blog._id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <FaTrashAlt className="text-xs" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in"
          onClick={closeConfirm}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-rose-200/80 dark:border-rose-900/40 p-6 md:p-7 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/40">
                  <FaExclamationTriangle className="text-xl" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                    Confirm Deletion
                  </span>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white leading-tight mt-0.5">
                    Permanent Removal
                  </h3>
                </div>
              </div>
              <button
                onClick={closeConfirm}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You are about to delete <span className="font-semibold text-slate-900 dark:text-slate-100">"{confirmModal.title}"</span>. This action cannot be undone.
            </p>

            {/* Password input */}
            <div className="space-y-1.5 mb-5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Admin Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500 transition-colors"
                  placeholder="Enter admin password to confirm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleDelete()}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={closeConfirm}
                disabled={deletingId !== null}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-600/20 disabled:opacity-50"
              >
                {deletingId !== null ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaTrashAlt className="text-xs" />
                    <span>Delete Blog</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
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
  FaFolderOpen 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DeleteProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null); // holds the project to be deleted

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/projects`)
      .then((res) => {
        setProjects(res.data.projects || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to load projects.");
      });
  };

  const openConfirm = (project) => {
    setConfirmModal(project);
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
      .delete(`${import.meta.env.VITE_BACKENDLINK}/deleteProject/${confirmModal._id}`, {
        data: { password },
      })
      .then((res) => {
        toast.success(res.data.message || "Project deleted successfully!");
        setProjects(res.data.updatedProjects || []);
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
              <span className="text-red-600 dark:text-red-400">&lt;</span>
              Delete Project
              <span className="text-red-600 dark:text-red-400">/&gt;</span>
            </h1>
          </div>
        </div>

        {/* Project Directory */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-red-50/20 dark:bg-red-950/10 rounded-2xl border border-red-200/40 dark:border-red-900/20">
            <span className="loading loading-spinner loading-md text-red-600"></span>
            <p className="text-xs text-slate-400 mt-2">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-red-50/20 dark:bg-red-950/10 rounded-2xl border border-red-200/40 dark:border-red-900/20">
            <FaFolderOpen className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              Select a project to permanently remove
            </p>
            {projects.map((project) => (
              <div
                key={project._id}
                className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-red-200/70 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/10 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={project.imglink}
                    alt={project.title}
                    className="w-16 h-16 md:w-20 md:h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=No+Img";
                    }}
                  />
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                      {project.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {project.shortdescription || "No short description provided."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <button
                    onClick={() => openConfirm(project)}
                    disabled={deletingId === project._id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all text-xs font-semibold shrink-0 disabled:opacity-50"
                  >
                    {deletingId === project._id ? (
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
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-red-200/80 dark:border-red-900/40 p-6 md:p-7 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/40">
                  <FaExclamationTriangle className="text-xl" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
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
                Admin Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-red-500 transition-colors"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-600/20 disabled:opacity-50"
              >
                {deletingId !== null ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaTrashAlt className="text-xs" />
                    <span>Delete Project</span>
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
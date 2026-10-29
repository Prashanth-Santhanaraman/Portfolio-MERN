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
import getProjectImageUrl from "./utils/projectImage";

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
    // Request all projects so all projects can be viewed and deleted, without 6-limit pagination
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/getAllProjects`)
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select any project to remove permanently from your portfolio ({projects.length} total)
            </p>
          </div>
        </div>

        {/* Project Directory */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-200/40 dark:border-rose-900/20">
            <span className="loading loading-spinner loading-md text-red-600"></span>
            <p className="text-xs text-slate-400 mt-2">Loading all projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-200/40 dark:border-rose-900/20">
            <FaFolderOpen className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No projects to delete.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              All Available Projects ({projects.length})
            </p>
            {projects.map((project) => (
              <div
                key={project._id}
                className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={getProjectImageUrl(project)}
                    alt={project.title}
                    className="w-16 h-16 md:w-20 md:h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=No+Img";
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 truncate">
                        {project.title}
                      </h2>
                      {project.status === "draft" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shrink-0">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {project.shortdescription || "No short description provided."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <button
                    onClick={() => openConfirm(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-100/80 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all text-xs font-semibold shrink-0"
                  >
                    <FaTrashAlt className="text-xs" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeConfirm}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <FaTimes />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-950/60 rounded-2xl">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete Project</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            {/* Content summary */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                {confirmModal.title}
              </p>
            </div>

            {/* Password input */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Admin Password Confirmation <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password to delete"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-red-500 transition-colors"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleDelete()}
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
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={closeConfirm}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId === confirmModal._id}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm disabled:opacity-50"
              >
                {deletingId === confirmModal._id ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaTrashAlt className="text-xs" />
                    <span>Confirm Delete</span>
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

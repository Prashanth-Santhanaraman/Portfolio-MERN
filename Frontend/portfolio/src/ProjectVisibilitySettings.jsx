import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaArrowLeft,
  FaProjectDiagram,
  FaExchangeAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFolderOpen
} from "react-icons/fa";
import getProjectImageUrl from "./utils/projectImage";

export default function ProjectVisibilitySettings() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Status toggle modal
  const [targetProject, setTargetProject] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setIsLoading(true);
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

  const handleToggleStatus = (e) => {
    e.preventDefault();
    if (!targetProject) return;

    if (!confirmPassword) {
      toast.error("Please enter the admin password.");
      return;
    }

    const nextStatus = targetProject.status === "draft" ? "production" : "draft";
    setIsUpdating(true);

    axios
      .patch(`${import.meta.env.VITE_BACKENDLINK}/toggleProjectStatus/${targetProject._id}`, {
        status: nextStatus,
        password: confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message || `Project status set to ${nextStatus}!`);
        setTargetProject(null);
        setConfirmPassword("");
        fetchProjects();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update project status.");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const draftProjects = projects.filter((p) => p.status === "draft");
  const productionProjects = projects.filter((p) => p.status !== "draft");

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 my-10 mb-24 font-inter">
        {/* Navigation & Header */}
        <button
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4 px-1"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400">&lt;</span>
              Project Visibility Settings
              <span className="text-cyan-600 dark:text-cyan-400">/&gt;</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Switch projects between Draft and Production modes with password verification.
            </p>
          </div>

          {/* Status summary counters */}
          <div className="flex items-center gap-2 text-xs font-bold self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              🔒 {draftProjects.length} Draft{draftProjects.length === 1 ? "" : "s"}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              🌐 {productionProjects.length} Production
            </span>
          </div>
        </div>

        {/* Project Items List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-cyan-50/20 dark:bg-cyan-950/10 rounded-2xl border border-cyan-200/40 dark:border-cyan-900/20">
            <span className="loading loading-spinner loading-md text-cyan-600"></span>
            <p className="text-xs text-slate-400 mt-2">Loading project statuses...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <FaFolderOpen className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const isDraft = project.status === "draft";
              return (
                <div
                  key={project._id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border border-cyan-200/70 dark:border-cyan-900/40 bg-cyan-50/30 dark:bg-cyan-950/10 gap-3 hover:border-cyan-500/50 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={getProjectImageUrl(project)}
                      alt={project.title}
                      className="w-16 h-14 md:w-20 md:h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=No+Img";
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 truncate">
                          {project.title}
                        </h2>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                            isDraft
                              ? "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                              : "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          }`}
                        >
                          {isDraft ? "Draft" : "Production"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {project.shortdescription || "No short description provided."}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto pl-2">
                    <button
                      type="button"
                      onClick={() => setTargetProject(project)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-slate-950 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 ${
                        isDraft
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      }`}
                    >
                      <FaExchangeAlt className="text-[10px]" />
                      <span>{isDraft ? "Promote to Production" : "Revert to Draft"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Status Change Confirmation */}
        {targetProject && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] animate-fade-in-up">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-unbounded font-bold text-sm text-slate-900 dark:text-white">
                  <FaExchangeAlt className="text-cyan-600" />
                  <span>Change Project Visibility</span>
                </div>
                <button
                  onClick={() => {
                    setTargetProject(null);
                    setConfirmPassword("");
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {targetProject.title}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500">Current:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      targetProject.status === "draft"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                    }`}
                  >
                    {targetProject.status || "production"}
                  </span>
                  <span>➔</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      targetProject.status === "draft"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                    }`}
                  >
                    {targetProject.status === "draft" ? "production" : "draft"}
                  </span>
                </div>
              </div>

              <form onSubmit={handleToggleStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Admin Password Confirmation: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoFocus
                      required
                      className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border-2 border-slate-950 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetProject(null);
                      setConfirmPassword("");
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md disabled:opacity-50 ${
                      targetProject.status === "draft"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <FaExchangeAlt className="text-xs" />
                        <span>Confirm Change</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


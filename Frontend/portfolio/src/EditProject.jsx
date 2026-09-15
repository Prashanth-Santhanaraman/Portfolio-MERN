import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaArrowLeft, 
  FaCheck, 
  FaEdit, 
  FaEye, 
  FaEyeSlash, 
  FaGlobe, 
  FaImage, 
  FaLock, 
  FaProjectDiagram,
  FaFolderOpen 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./components/RichTextEditor";

export default function EditProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // form state
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const selectProject = (project) => {
    setSelectedProject(project);
    setTitle(project.title);
    setShortDescription(project.shortdescription || "");
    setDescription(project.description || "");
    setWebsiteLink(project.websitelink || "");
    setImageLink(project.imglink || "");
    setPassword("");
  };

  const clearSelection = () => {
    setSelectedProject(null);
    setTitle("");
    setShortDescription("");
    setDescription("");
    setWebsiteLink("");
    setImageLink("");
    setPassword("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }
    setIsSaving(true);
    axios
      .put(`${import.meta.env.VITE_BACKENDLINK}/editProject/${selectedProject._id}`, {
        title,
        shortdescription: shortDescription,
        description,
        websitelink: websiteLink,
        imglink: imageLink,
        password,
      })
      .then((res) => {
        toast.success(res.data.message || "Project updated successfully!");
        setProjects(res.data.updatedProjects || []);
        clearSelection();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto px-4 my-10 mb-24">
        {/* Navigation & Header */}
        <button
          onClick={() => (selectedProject ? clearSelection() : navigate("/admin"))}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4 px-1"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{selectedProject ? "Back to project selection" : "Back to Dashboard"}</span>
        </button>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-orange-600 dark:text-orange-400">&lt;</span>
              Edit Project
              <span className="text-orange-600 dark:text-orange-400">/&gt;</span>
            </h1>
          </div>
        </div>

        {/* Project Selector List */}
        {!selectedProject && (
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-orange-50/20 dark:bg-orange-950/10 rounded-2xl border border-orange-200/40 dark:border-orange-900/20">
                <span className="loading loading-spinner loading-md text-orange-600"></span>
                <p className="text-xs text-slate-400 mt-2">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-orange-50/20 dark:bg-orange-950/10 rounded-2xl border border-orange-200/40 dark:border-orange-900/20">
                <FaFolderOpen className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No projects found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                  Select a project to modify
                </p>
                {projects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => selectProject(project)}
                    className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-orange-200/70 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-950/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
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
                        <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                          {project.title}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {project.shortdescription || "No short description provided."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-3">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300 group-hover:bg-orange-600 group-hover:text-white transition-all text-xs font-semibold shrink-0">
                        <FaEdit className="text-xs" />
                        <span>Edit</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clean Edit Card View */}
        {selectedProject && (
          <div className="rounded-2xl border border-orange-200/80 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-950/10 p-5 md:p-8 backdrop-blur-md shadow-sm">
            <div className="mb-6 pb-4 border-b border-orange-200/60 dark:border-orange-900/40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Modifying Project
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {selectedProject.title}
              </h2>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="Brief excerpt for portfolio cards"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Details
                </label>
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Write detailed technical information..."
                  />
                </div>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Website Link */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Live Demo URL <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    <input
                      type="text"
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Thumbnail Image URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    <input
                      type="text"
                      value={imageLink}
                      onChange={(e) => setImageLink(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Live Image Preview */}
              {imageLink && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={imageLink}
                    alt="Cover Preview"
                    className="w-16 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Image URL verified
                  </span>
                </div>
              )}

              {/* Admin Password Security */}
              <div className="pt-2 border-t border-orange-200/60 dark:border-orange-900/40">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Required to confirm changes"
                    className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-colors"
                    required
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

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-200/60 dark:border-orange-900/40">
                <button
                  type="button"
                  onClick={clearSelection}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-orange-100/50 dark:hover:bg-orange-950/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <>
                      <FaCheck className="text-xs" />
                      <span>Update Project</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
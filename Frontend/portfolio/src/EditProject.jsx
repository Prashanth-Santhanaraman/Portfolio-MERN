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
  FaFolderOpen,
  FaPen,
  FaCompass
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./components/RichTextEditor";
import CoverImage from "./components/CoverImage";
import getProjectImageUrl from "./utils/projectImage";

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
  const [status, setStatus] = useState("production");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'

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
    setStatus(project.status || "production");
    setPassword("");
    setActiveTab("edit");
  };

  const clearSelection = () => {
    setSelectedProject(null);
    setTitle("");
    setShortDescription("");
    setDescription("");
    setWebsiteLink("");
    setImageLink("");
    setStatus("production");
    setPassword("");
    setActiveTab("edit");
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
        status,
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

      <div className="max-w-4xl mx-auto px-4 my-10 mb-24 font-inter">
        {/* Navigation & Header */}
        <button
          onClick={() => (selectedProject ? clearSelection() : navigate("/admin"))}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4 px-1"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{selectedProject ? "Back to project selection" : "Back to Dashboard"}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-orange-600 dark:text-orange-400">&lt;</span>
              Edit Project
              <span className="text-orange-600 dark:text-orange-400">/&gt;</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedProject
                ? "Update your project details, toggle draft/production, or preview before saving."
                : "Select a project to edit its content or change visibility."}
            </p>
          </div>

          {/* Edit / Live Preview Tabs when project selected */}
          {selectedProject && (
            <div className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 w-fit self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "edit"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaPen className="text-[10px]" />
                <span>Edit Form</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "preview"
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaEye className="text-xs" />
                <span>Live Preview</span>
              </button>
            </div>
          )}
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
                  Select a project to modify ({projects.length})
                </p>
                {projects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => selectProject(project)}
                    className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-orange-200/70 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-950/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
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
                          <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                            {project.title}
                          </h2>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                            project.status === "draft"
                              ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                              : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          }`}>
                            {project.status === "draft" ? "Draft" : "Production"}
                          </span>
                        </div>
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
        {selectedProject && activeTab === "edit" && (
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
              
              {/* Publication Status Selector */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Project Status
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {status === "draft"
                      ? "🔒 Draft: Hidden from public readers on the Projects page."
                      : "🌐 Production: Published and immediately visible."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      status === "draft"
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/40 ring-2 ring-amber-500/20"
                        : "bg-transparent text-slate-500 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    📝 Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("production")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      status === "production"
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm ring-2 ring-orange-500/20"
                        : "bg-transparent text-slate-500 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    🚀 Production
                  </button>
                </div>
              </div>

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
                  placeholder="Brief summary"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Deep-Dive Content <span className="text-rose-500">*</span>
                </label>
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Write project description..."
                  />
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-orange-200/60 dark:border-orange-900/40">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 dark:text-orange-400 hover:underline"
                >
                  <FaEye className="text-xs" />
                  <span>Preview Project Page</span>
                </button>

                <div className="flex items-center gap-3">
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
              </div>
            </form>
          </div>
        )}

        {/* Live Preview View */}
        {selectedProject && activeTab === "preview" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 dark:text-blue-300">
                <FaCompass className="text-sm" />
                <span>Simulated Project Page Preview</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status === "draft" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
              }`}>
                {status === "draft" ? "Draft Mode" : "Production Mode"}
              </span>
            </div>

            <article className="rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h1 className="font-unbounded text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                {title || <span className="text-slate-400 italic">Untitled Project</span>}
              </h1>

              {shortDescription && (
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                  {shortDescription}
                </p>
              )}

              {websiteLink && (
                <div className="mb-6">
                  <a
                    href={websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
                  >
                    <FaGlobe className="text-xs" />
                    <span>Visit Live Website</span>
                  </a>
                </div>
              )}

              {imageLink ? (
                <div className="overflow-hidden rounded-2xl border-2 border-slate-950 mb-8 max-h-96 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <CoverImage
                    src={getProjectImageUrl(imageLink)}
                    alt={title}
                    className="w-full h-full object-cover max-h-96"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 text-center text-xs text-slate-400 mb-8">
                  No preview image provided.
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  <p className="text-slate-400 italic text-sm">Project details are empty.</p>
                )}
              </div>
            </article>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all shadow-md"
              >
                <FaPen className="text-[10px]" />
                <span>Return to Editor & Save</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

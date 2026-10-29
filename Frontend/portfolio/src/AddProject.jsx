import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaGlobe, 
  FaImage, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPlus,
  FaArrowLeft,
  FaPen,
  FaCompass
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./components/RichTextEditor";
import CoverImage from "./components/CoverImage";

export default function AddProject() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState("draft"); // 'draft' or 'production'
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }

    const projectData = new FormData();
    projectData.append("title", title);
    projectData.append("shortdescription", shortDescription);
    projectData.append("description", description);
    projectData.append("websitelink", websiteLink);
    projectData.append("imglink", imageLink);
    projectData.append("status", status);
    projectData.append("password", password);
    if (imageFile) {
      projectData.append("image", imageFile);
    }

    setIsSubmitting(true);
    axios
      .post(`${import.meta.env.VITE_BACKENDLINK}/newProject`, projectData)
      .then((res) => {
        toast.success(
          status === "draft"
            ? "Project saved as Draft successfully!"
            : "Project published to Production successfully!"
        );
        // Reset form
        setTitle("");
        setShortDescription("");
        setDescription("");
        setWebsiteLink("");
        setImageLink("");
        setImageFile(null);
        setStatus("draft");
        setPassword("");
        setActiveTab("edit");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">&lt;</span>
              Add New Project
              <span className="text-blue-600 dark:text-blue-400">/&gt;</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Draft or publish a showcase project to your portfolio.
            </p>
          </div>

          {/* Edit / Live Preview Tabs */}
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
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaEye className="text-xs" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Edit Form */}
        {activeTab === "edit" ? (
          <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10 p-5 md:p-8 backdrop-blur-md shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Publication Status Selector */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Project Visibility Status
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {status === "draft"
                      ? "🔒 Draft: Hidden from public readers on the Projects page."
                      : "🌐 Production: Published and immediately visible on the Projects page."}
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
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-500/20"
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
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Modern Fullstack E-Commerce"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="A concise summary of features, tech stack, and impact"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
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
                    placeholder="Comprehensive case study breakdown..."
                  />
                </div>
              </div>

              {/* Links Row */}
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
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="https://example.com"
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Upload Thumbnail Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="w-full px-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          toast.error("Image must be 5 MB or smaller.");
                          e.target.value = "";
                          return;
                        }
                        setImageFile(file);
                      }}
                    />
                  </div>
                </div>

                {/* Image URL fallback */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Or use a Thumbnail Image URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    <input
                      type="url"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/image.jpg"
                      value={imageLink}
                      onChange={(e) => setImageLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Live Image Preview */}
              {(imagePreview || imageLink) && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={imagePreview || imageLink}
                    alt="Thumbnail Preview"
                    className="w-16 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {imageFile ? imageFile.name : "Image URL preview"}
                  </span>
                </div>
              )}

              {/* Admin Password Security */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Required to create project"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Submit Controls */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  <FaEye className="text-xs" />
                  <span>Preview Project Page</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-md disabled:opacity-50 ${
                      status === "draft"
                        ? "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <FaPlus className="text-xs" />
                        <span>{status === "draft" ? "Save as Draft" : "Publish Project"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Tab 2: Live Preview Section */
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

              {(imagePreview || imageLink) ? (
                <div className="overflow-hidden rounded-2xl border-2 border-slate-950 mb-8 max-h-96 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <CoverImage
                    src={imagePreview || imageLink}
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

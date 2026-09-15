import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaProjectDiagram, 
  FaGlobe, 
  FaImage, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPlus,
  FaArrowLeft 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./components/RichTextEditor";

export default function AddProject() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(`${import.meta.env.VITE_BACKENDLINK}/newProject`, {
        title: title,
        shortdescription: shortDescription,
        description: description,
        websitelink: websiteLink,
        imglink: imageLink,
        password: password,
      })
      .then((res) => {
        toast.success(res.data.message || "Project created successfully!");
        // Reset form
        setTitle("");
        setShortDescription("");
        setDescription("");
        setWebsiteLink("");
        setImageLink("");
        setPassword("");
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
              <span className="text-blue-600 dark:text-blue-400">&lt;</span>
              Add New Project
              <span className="text-blue-600 dark:text-blue-400">/&gt;</span>
            </h1>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10 p-5 md:p-8 backdrop-blur-md shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Short Summary <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Brief excerpt for portfolio cards"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
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
                  placeholder="Describe technical details, features, and stack..."
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

              {/* Image Link */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Thumbnail Image URL
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Live Image Preview */}
            {imageLink && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <img
                  src={imageLink}
                  alt="Thumbnail Preview"
                  className="w-16 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Image URL verified
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
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaPlus className="text-xs" />
                    <span>Create Project</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
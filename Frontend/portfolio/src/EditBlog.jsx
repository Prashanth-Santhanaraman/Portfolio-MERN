import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaArrowLeft, 
  FaCheck, 
  FaEdit, 
  FaEye, 
  FaEyeSlash, 
  FaImage, 
  FaLock, 
  FaBlog,
  FaFileAlt,
  FaPen,
  FaCompass
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./components/RichTextEditor";
import CoverImage from "./components/CoverImage";

export default function EditBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // form state
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [status, setStatus] = useState("production");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setIsLoading(true);
    // Request with includeDrafts=true so admin can edit all blogs
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blogs?limit=100&includeDrafts=true`)
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

  const selectBlog = (blog) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setShortDescription(blog.shortdescription || "");
    setDescription(blog.description || "");
    setImageLink(blog.imglink || "");
    setStatus(blog.status || "production");
    setPassword("");
    setActiveTab("edit");
  };

  const clearSelection = () => {
    setSelectedBlog(null);
    setTitle("");
    setShortDescription("");
    setDescription("");
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
      .put(`${import.meta.env.VITE_BACKENDLINK}/editBlog/${selectedBlog._id}`, {
        title,
        shortdescription: shortDescription,
        description,
        imglink: imageLink,
        status,
        password,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog updated successfully!");
        setBlogs(res.data.updatedBlogs || []);
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
          onClick={() => (selectedBlog ? clearSelection() : navigate("/admin"))}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4 px-1"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>{selectedBlog ? "Back to blog selection" : "Back to Dashboard"}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400">&lt;</span>
              Edit Blog
              <span className="text-amber-600 dark:text-amber-400">/&gt;</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedBlog
                ? "Update your article content, toggle draft/production, or preview before saving."
                : "Select an article to edit its content or change visibility."}
            </p>
          </div>

          {/* Edit / Live Preview Tabs when an article is selected */}
          {selectedBlog && (
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
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaEye className="text-xs" />
                <span>Live Preview</span>
              </button>
            </div>
          )}
        </div>

        {/* Blog Selector List */}
        {!selectedBlog && (
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-amber-50/20 dark:bg-amber-950/10 rounded-2xl border border-amber-200/40 dark:border-amber-900/20">
                <span className="loading loading-spinner loading-md text-amber-600"></span>
                <p className="text-xs text-slate-400 mt-2">Loading articles...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-amber-50/20 dark:bg-amber-950/10 rounded-2xl border border-amber-200/40 dark:border-amber-900/20">
                <FaFileAlt className="text-3xl text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No blogs found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                  Select an article to modify
                </p>
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => selectBlog(blog)}
                    className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
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
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                            {blog.title}
                          </h2>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                            blog.status === "draft"
                              ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                              : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          }`}>
                            {blog.status === "draft" ? "Draft" : "Production"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {blog.shortdescription || "No short description provided."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-3">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-all text-xs font-semibold shrink-0">
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
        {selectedBlog && activeTab === "edit" && (
          <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 p-5 md:p-8 backdrop-blur-md shadow-sm">
            <div className="mb-6 pb-4 border-b border-amber-200/60 dark:border-amber-900/40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Modifying Post
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {selectedBlog.title}
              </h2>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              
              {/* Publication Status Selector */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Status
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {status === "draft"
                      ? "🔒 Draft: Hidden from public readers until password unlocked."
                      : "🌐 Production: Visible publicly in the main blog feed."}
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
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20"
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
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Enter article title"
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
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Brief excerpt for cards and SEO"
                  required
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Article Content
                </label>
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Write full article body..."
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cover Image URL
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="https://example.com/cover.jpg"
                  />
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
              <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
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
                    className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
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
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                >
                  <FaEye className="text-xs" />
                  <span>Preview Article</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={clearSelection}
                    disabled={isSaving}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <FaCheck className="text-xs" />
                        <span>Update Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Live Preview View */}
        {selectedBlog && activeTab === "preview" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 dark:text-blue-300">
                <FaCompass className="text-sm" />
                <span>Simulated Full Post Preview (How readers will see this blog)</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status === "draft" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
              }`}>
                {status === "draft" ? "Draft Mode" : "Production Mode"}
              </span>
            </div>

            <article className="rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h1 className="font-unbounded text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                {title || <span className="text-slate-400 italic">Untitled Article</span>}
              </h1>

              {shortDescription && (
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                  {shortDescription}
                </p>
              )}

              {imageLink ? (
                <div className="overflow-hidden rounded-2xl border-2 border-slate-950 mb-8 max-h-96 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <CoverImage
                    src={imageLink}
                    alt={title}
                    className="w-full h-full object-cover max-h-96"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 text-center text-xs text-slate-400 mb-8">
                  No cover image provided.
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  <p className="text-slate-400 italic text-sm">Article content is empty.</p>
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

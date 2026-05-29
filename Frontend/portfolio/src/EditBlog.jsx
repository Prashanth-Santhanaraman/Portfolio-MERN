import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import RichTextEditor from "./components/RichTextEditor";

export default function EditBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // form state
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const selectBlog = (blog) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setShortDescription(blog.shortdescription);
    setDescription(blog.description);
    setImageLink(blog.imglink);
    setPassword("");
  };

  const clearSelection = () => {
    setSelectedBlog(null);
    setTitle("");
    setShortDescription("");
    setDescription("");
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
      .put(`${import.meta.env.VITE_BACKENDLINK}/editBlog/${selectedBlog._id}`, {
        title,
        shortdescription: shortDescription,
        description,
        imglink: imageLink,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
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
      <div>
        <Toaster position="top-right" />
      </div>

      <div className="mx-10 md:mx-36 lg:mx-96 mt-12 mb-20">
        <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold mb-8">
          &lt;Edit Blog /&gt;
        </h1>

        {/* Blog selector */}
        {!selectedBlog && (
          <>
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
                <p className="text-sm opacity-50 mb-1">Select a blog to edit:</p>
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-slate-950 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer hover:border-blue-500"
                    onClick={() => selectBlog(blog)}
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
                    <button className="btn btn-sm btn-outline flex-shrink-0">
                      Edit →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Edit form */}
        {selectedBlog && (
          <div className="flex flex-col gap-4">
            {/* Back button */}
            <button
              className="btn btn-ghost btn-sm self-start gap-1"
              onClick={clearSelection}
            >
              ← Back to blogs
            </button>

            <div className="border-2 border-slate-950 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Editing: <span className="opacity-60 text-lg font-normal">{selectedBlog.title}</span></h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Title</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Short Description</legend>
                  <textarea
                    className="textarea h-24 w-full"
                    placeholder="Enter the short description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    required
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Description</legend>
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Enter the description"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image Link</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter the image link"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                  />
                </fieldset>

                {/* Image preview */}
                {imageLink && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs opacity-50">Image preview:</p>
                    <img
                      src={imageLink}
                      alt="preview"
                      className="h-40 w-60 object-cover rounded-lg"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Admin Password</legend>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full"
                    placeholder="Enter admin password to confirm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>

                <label className="label cursor-pointer gap-2 justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span className="text-sm">Show Password</span>
                </label>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Update Blog"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={clearSelection}
                    disabled={isSaving}
                  >
                    Cancel
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import CoverImage from "./components/CoverImage";
import {
  FaSearch,
  FaArrowRight,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaLock,
  FaUnlock,
  FaCog,
  FaEye,
  FaEyeSlash,
  FaExchangeAlt,
} from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Settings & Draft unlocked state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Action modal for status change
  const [statusTargetBlog, setStatusTargetBlog] = useState(null);
  const [actionPassword, setActionPassword] = useState("");
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const LIMIT = 7; // 1 featured + up to 6 grid

  const fetchBlogs = (page = currentPage, unlocked = isAdminUnlocked) => {
    setIsLoading(true);
    const draftQuery = unlocked ? "&includeDrafts=true" : "";
    axios
      .get(
        `${import.meta.env.VITE_BACKENDLINK}/blogs?page=${page}&limit=${LIMIT}${draftQuery}`
      )
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
        setTotal(res.data.total || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(currentPage, isAdminUnlocked);
  }, [currentPage, isAdminUnlocked]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (!adminPassword) {
      toast.error("Please enter the password.");
      return;
    }

    setIsVerifying(true);
    axios
      .post(`${import.meta.env.VITE_BACKENDLINK}/verifyAdminPassword`, {
        password: adminPassword,
      })
      .then(() => {
        setIsAdminUnlocked(true);
        setShowPasswordModal(false);
        setAdminPassword("");
        toast.success("Admin settings & drafts unlocked!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Invalid password!");
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  const handleToggleStatus = (e) => {
    e.preventDefault();
    if (!statusTargetBlog) return;

    const newStatus = statusTargetBlog.status === "draft" ? "production" : "draft";
    const passwordToUse = actionPassword || adminPassword;

    if (!passwordToUse) {
      toast.error("Please provide your admin password to change status.");
      return;
    }

    setIsTogglingStatus(true);
    axios
      .patch(`${import.meta.env.VITE_BACKENDLINK}/toggleBlogStatus/${statusTargetBlog._id}`, {
        status: newStatus,
        password: passwordToUse,
      })
      .then((res) => {
        toast.success(res.data.message || `Switched to ${newStatus}!`);
        setStatusTargetBlog(null);
        setActionPassword("");
        fetchBlogs(currentPage, isAdminUnlocked);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to update blog status.");
      })
      .finally(() => {
        setIsTogglingStatus(false);
      });
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortdescription
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // ---------- Skeleton ----------
  if (isLoading && blogs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 animate-fade-in-up font-inter">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3 animate-pulse" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-8 animate-pulse" />

        {/* Featured Skeleton */}
        <div className="animate-pulse rounded-2xl border-2 border-slate-950 overflow-hidden mb-12 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="h-64 md:h-80 bg-slate-200 dark:bg-slate-800 w-full" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border-2 border-slate-950 overflow-hidden bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="h-44 bg-slate-200 dark:bg-slate-800" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- Empty State ----------
  if (blogs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 font-inter">
        <Toaster position="top-right" />
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-unbounded text-3xl md:text-5xl font-bold">
            &lt;Blogs /&gt;
          </h1>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <FaCog />
            <span>Settings</span>
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">
          0 published articles
        </p>

        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-950 rounded-2xl bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4 border-2 border-slate-950">
            <FaBookOpen className="text-2xl" />
          </div>

          <h3 className="font-unbounded font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">
            No Articles Published Yet
          </h3>

          <p className="text-xs text-slate-500 max-w-sm mb-4">
            Check back soon for new tutorials, thoughts, and technical deep-dives!
          </p>

          {!isAdminUnlocked && (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
            >
              <FaLock className="text-xs" />
              <span>Unlock Admin Settings & View Drafts</span>
            </button>
          )}
        </div>

        {/* Modal */}
        {renderPasswordModal()}
      </div>
    );
  }

  // ---------- Featured + Grid ----------
  const featured =
    currentPage === 1 && blogs.length > 0
      ? blogs[blogs.length - 1]
      : null;

  const gridBlogs = searchQuery ? filteredBlogs : blogs;

  const gridOffset =
    currentPage === 1
      ? 1
      : LIMIT + (currentPage - 2) * LIMIT + 1;

  function renderPasswordModal() {
    if (!showPasswordModal) return null;
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] animate-fade-in-up">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-unbounded font-bold text-sm text-slate-900 dark:text-white">
              <FaLock className="text-blue-600" />
              <span>Admin Settings Password</span>
            </div>
            <button
              onClick={() => setShowPasswordModal(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Enter your admin password to view drafts and enable one-click status settings (Draft ⇄ Production).
          </p>

          <form onSubmit={handleUnlockSubmit} className="space-y-4">
            <div className="relative">
              <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
              <input
                type={showPasswordText ? "text" : "password"}
                placeholder="Enter admin password..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border-2 border-slate-950 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasswordText(!showPasswordText)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPasswordText ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isVerifying}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50"
              >
                {isVerifying ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaUnlock className="text-xs" />
                    <span>Unlock Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function renderStatusToggleModal() {
    if (!statusTargetBlog) return null;
    const isCurrentlyDraft = statusTargetBlog.status === "draft";
    const nextStatus = isCurrentlyDraft ? "production" : "draft";

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] animate-fade-in-up">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-unbounded font-bold text-sm text-slate-900 dark:text-white">
              <FaExchangeAlt className="text-amber-500" />
              <span>Change Blog Status</span>
            </div>
            <button
              onClick={() => {
                setStatusTargetBlog(null);
                setActionPassword("");
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
            Change visibility for:
          </p>
          <div className="p-3 mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
              {statusTargetBlog.title}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-slate-500">Current:</span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                isCurrentlyDraft ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
              }`}>
                {statusTargetBlog.status || "production"}
              </span>
              <span>➔</span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                nextStatus === "draft" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
              }`}>
                {nextStatus}
              </span>
            </div>
          </div>

          <form onSubmit={handleToggleStatus} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Password Confirmation:
              </label>
              <input
                type="password"
                placeholder="Enter admin password..."
                value={actionPassword}
                onChange={(e) => setActionPassword(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 text-xs md:text-sm rounded-xl border-2 border-slate-950 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStatusTargetBlog(null);
                  setActionPassword("");
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isTogglingStatus}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md disabled:opacity-50 ${
                  nextStatus === "production"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isTogglingStatus ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaExchangeAlt className="text-xs" />
                    <span>Change to {nextStatus.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 animate-fade-in-up font-inter">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-unbounded text-3xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              &lt;Blogs /&gt;
            </h1>

            {/* Admin Settings Button */}
            {isAdminUnlocked ? (
              <button
                onClick={() => {
                  setIsAdminUnlocked(false);
                  toast("Settings locked.", { icon: "🔒" });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:-translate-y-0.5 transition-all"
                title="Admin mode active: drafts visible and settings unlocked. Click to lock."
              >
                <FaUnlock className="text-[10px]" />
                <span>Admin Settings (Unlocked)</span>
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all"
                title="Enter password to unlock settings and draft visibility"
              >
                <FaLock className="text-[10px]" />
                <span>Settings</span>
              </button>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Explore articles, insights, and technical tutorials ({total} total
            {isAdminUnlocked && " - including drafts"})
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Featured Blog */}
      {!searchQuery && featured && currentPage === 1 && (
        <div className="relative mb-12">
          <Link
            to={`/blogs/post/${featured._id}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[10px_10px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1 transition-all duration-300">

              <div className="overflow-hidden h-64 md:h-96 relative">
                <CoverImage
                  src={featured.imglink}
                  alt={featured.title}
                  index={blogs.length}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">

                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-unbounded uppercase font-bold tracking-wider bg-blue-600 text-white border border-blue-400 shadow-sm">
                      ✨ Featured Article
                    </span>
                    {featured.status === "draft" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-unbounded uppercase font-bold tracking-wider bg-amber-500 text-slate-950 border border-amber-300 shadow-sm">
                        🔒 Draft
                      </span>
                    )}
                  </div>

                  <h2 className="font-unbounded text-xl md:text-3xl font-bold leading-tight mb-2 text-white drop-shadow-sm group-hover:text-blue-300 transition-colors">
                    {featured.title}
                  </h2>

                  <p className="text-xs md:text-sm text-slate-200 line-clamp-2 leading-relaxed max-w-3xl mb-4 font-medium">
                    {featured.shortdescription}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-blue-400 group-hover:text-white transition-colors">
                    <span>Read Full Article</span>
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </div>

                </div>
              </div>
            </div>
          </Link>

          {/* Settings Status Toggle for Featured Post if unlocked */}
          {isAdminUnlocked && (
            <button
              onClick={() => setStatusTargetBlog(featured)}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-950 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-100 hover:-translate-y-0.5 transition-all"
            >
              <FaExchangeAlt className="text-amber-500 text-xs" />
              <span>Status: {featured.status === "draft" ? "Draft ➔ Production" : "Production ➔ Draft"}</span>
            </button>
          )}
        </div>
      )}

      {/* Articles Grid */}
      <div className="mb-6">

        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-unbounded text-base md:text-xl font-bold text-slate-900 dark:text-slate-100">
            {searchQuery
              ? `Search Results (${filteredBlogs.length})`
              : "All Articles"}
          </h2>

          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {gridBlogs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-950 rounded-2xl bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-sm font-semibold text-slate-500">
              No articles matched your search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {gridBlogs.map((blog, idx) => (
              <div key={blog._id} className="relative group flex flex-col justify-between">
                <Link
                  to={`/blogs/post/${blog._id}`}
                  className="block h-full"
                >
                  <div className="border-2 border-slate-950 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[7px_7px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">

                    {/* Image */}
                    <div className="relative overflow-hidden h-44 border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-800">

                      <CoverImage
                        src={blog.imglink}
                        alt={blog.title}
                        index={idx + 1}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-slate-950/90 text-white font-unbounded text-[10px] font-bold border border-white/20 backdrop-blur-xs">
                        #{gridOffset + idx}
                      </span>

                      {/* Status badge */}
                      {blog.status === "draft" && (
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-unbounded text-[10px] font-bold border border-amber-300 shadow-sm">
                          🔒 Draft
                        </span>
                      )}

                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">

                      <div>
                        <h3 className="font-unbounded font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                          {blog.shortdescription}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Read Article</span>
                        <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                      </div>

                    </div>
                  </div>
                </Link>

                {/* Settings Quick Toggle Button on card if unlocked */}
                {isAdminUnlocked && (
                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500">
                      Status: <span className={blog.status === "draft" ? "text-amber-500" : "text-emerald-500"}>{blog.status || "production"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setStatusTargetBlog(blog)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-950 bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <FaExchangeAlt className="text-[9px]" />
                      <span>Switch to {blog.status === "draft" ? "Production" : "Draft"}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !searchQuery && (
        <div className="flex items-center justify-center gap-3 mt-10">

          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="text-xs" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-9 h-9 rounded-xl border-2 border-slate-950 font-unbounded text-xs font-bold transition-all duration-200 ${
                  pg === currentPage
                    ? "bg-slate-950 text-white shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                    : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <FaChevronRight className="text-xs" />
          </button>

        </div>
      )}

      {/* Modals */}
      {renderPasswordModal()}
      {renderStatusToggleModal()}
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";
import {
  LuBookOpen,
  LuSparkles,
  LuArrowRight,
  LuSearch,
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuCalendar,
} from "react-icons/lu";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // 6 blogs per page
  const LIMIT = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);

        const blogsRes = await axios.get(
          `${import.meta.env.VITE_BACKENDLINK}/blogs?page=${currentPage}&limit=${LIMIT}`
        );

        const data = blogsRes.data;

        setBlogs(data.blogs || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);

        // Fetch the LAST blog for Featured on Page 1
        if (currentPage === 1 && data.total > 0) {
          const lastPage = Math.ceil(data.total / LIMIT);

          const lastBlogRes = await axios.get(
            `${import.meta.env.VITE_BACKENDLINK}/blogs?page=${lastPage}&limit=${LIMIT}`
          );

          const lastBlogs = lastBlogRes.data.blogs || [];

          if (lastBlogs.length > 0) {
            const lastBlog = lastBlogs[lastBlogs.length - 1];
            setFeatured(lastBlog);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // Client-side search filtering
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const query = searchQuery.toLowerCase().trim();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(query) ||
        b.shortdescription?.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

  // Calculate estimated reading time
  const getReadTime = (blog) => {
    if (!blog) return "3 min read";
    const text = `${blog.shortdescription || ""} ${blog.description || ""}`;
    const words = text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} min read`;
  };

  // Format date helper if available
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const gridOffset = (currentPage - 1) * LIMIT;

  // -----------------------------------------
  // Skeleton Loading State
  // -----------------------------------------
  if (isLoading && blogs.length === 0) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 font-inter text-slate-800 dark:text-slate-100 animate-fade-in-up">
        {/* Ambient background blur */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header Skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-7 w-44 bg-slate-200 dark:bg-slate-800/80 rounded-full animate-pulse" />
          <div className="h-12 w-3/4 sm:w-1/2 bg-slate-200 dark:bg-slate-800/80 rounded-2xl animate-pulse" />
          <div className="h-5 w-2/3 sm:w-1/3 bg-slate-200 dark:bg-slate-800/80 rounded-lg animate-pulse" />
        </div>

        {/* Featured Skeleton */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-6 md:p-8 mb-16 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 h-64 sm:h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="md:col-span-5 space-y-4">
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-9 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-11 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl pt-2" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 overflow-hidden animate-pulse flex flex-col justify-between"
            >
              <div className="h-48 sm:h-52 bg-slate-200 dark:bg-slate-800" />
              <div className="p-6 space-y-3 flex-1">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
              </div>
              <div className="p-6 pt-0">
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Zero Articles Empty State
  // -----------------------------------------
  if (blogs.length === 0 && !featured) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 font-inter text-slate-800 dark:text-slate-100">
        <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-200/60 dark:border-blue-800/50 shadow-sm">
            <LuBookOpen className="text-2xl" />
          </div>
          <h2 className="font-unbounded text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Articles Published Yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Stay tuned! Upcoming articles on web development, system design, and AI applications will be published here soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 font-inter text-slate-800 dark:text-slate-100 animate-fade-in-up">
      {/* Ambient background glow */}
      <div className="absolute top-16 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── HEADER SECTION ──────────────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-xs">
            <LuBookOpen className="text-sm text-blue-600 dark:text-blue-400" />
            <span className="tracking-wide uppercase font-semibold text-[11px]">
              Articles & Technical Notes
            </span>
          </div>

          {/* Title */}
          <h1 className="font-unbounded text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            Insights &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              Writings
            </span>
            <span className="text-blue-600 dark:text-blue-400">.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Thoughts, technical tutorials, and architectural breakdowns covering modern web technologies, AI agents, and software craftsmanship.
          </p>
        </div>

        {/* Search & Counter Block */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Total Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{total} Published Article{total === 1 ? "" : "s"}</span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <LuX className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── FEATURED BLOG BANNER (Page 1 & No Active Search) ─────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {featured && currentPage === 1 && !searchQuery && (
        <section className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              <h2 className="font-unbounded text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Spotlight Article
              </h2>
            </div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <LuSparkles className="text-xs" /> Featured Story
            </span>
          </div>

          <div className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 items-center">
              {/* Media preview (7 cols) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 bg-slate-100 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
                <CoverImage
                  src={featured.imglink}
                  alt={featured.title}
                  index={total}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                {/* Index tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white font-unbounded text-xs font-bold shadow-sm">
                  #{String(total).padStart(2, "0")}
                </div>

                {/* Read time pill */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 backdrop-blur-md text-white border border-white/10 text-xs font-medium shadow-sm">
                  <LuClock className="text-xs text-blue-400" />
                  <span>{getReadTime(featured)}</span>
                </div>
              </div>

              {/* Text & Content details (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                      <LuSparkles className="text-[10px]" /> Featured Article
                    </span>
                    {formatDate(featured.createdAt) && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                        <LuCalendar className="text-[11px]" />
                        {formatDate(featured.createdAt)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/blogs/post/${featured._id}`}
                    state={{ blogNumber: total }}
                    className="block group/title"
                  >
                    <h3 className="font-unbounded text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors leading-tight">
                      {featured.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-4">
                    {featured.shortdescription}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/blogs/post/${featured._id}`}
                    state={{ blogNumber: total }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-slate-950/10 dark:shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Read Full Article</span>
                    <LuArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── ALL ARTICLES GRID ───────────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-unbounded text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {searchQuery ? `Matching Articles (${filteredBlogs.length})` : "All Articles"}
            </h2>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <LuSearch className="text-xl" />
            </div>
            <h3 className="font-unbounded font-bold text-base text-slate-800 dark:text-slate-200 mb-1">
              No Articles Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredBlogs.map((blog, idx) => {
              const blogNumber = gridOffset + idx + 1;
              const formattedNumber = String(blogNumber).padStart(2, "0");
              const readTime = getReadTime(blog);
              const formattedDate = formatDate(blog.createdAt);

              return (
                <div
                  key={blog._id}
                  className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Container with Inset Header */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                      <CoverImage
                        src={blog.imglink}
                        alt={blog.title}
                        index={blogNumber ?? blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Subtle Top & Bottom Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20" />

                      {/* Number Chip */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/10 text-white font-unbounded text-[10px] font-bold shadow-xs">
                        #{formattedNumber}
                      </div>

                      {/* Read Time Tag */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium shadow-xs">
                        <LuClock className="text-[10px] text-blue-400" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      {formattedDate && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          <LuCalendar className="text-[11px]" />
                          <span>{formattedDate}</span>
                        </div>
                      )}

                      <Link
                        to={`/blogs/post/${blog._id}`}
                        state={{ blogNumber }}
                        className="block focus:outline-none"
                      >
                        <h3 className="font-unbounded font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
                        {blog.shortdescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <Link
                      to={`/blogs/post/${blog._id}`}
                      state={{ blogNumber }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                    >
                      <span>Read Article</span>
                      <LuArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>

                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      Technical Note
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── PAGINATION CONTROLS ─────────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {totalPages > 1 && !searchQuery && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-14">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous Page"
          >
            <LuChevronLeft className="text-sm" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Numeric Page Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
              const isActive = pg === currentPage;
              return (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl font-unbounded text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105"
                      : "bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 shadow-xs"
                  }`}
                  aria-label={`Page ${pg}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pg}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next Page"
          >
            <span className="hidden sm:inline">Next</span>
            <LuChevronRight className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}

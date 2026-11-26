import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";
import {
  LuArrowLeft,
  LuArrowUp,
  LuShare2,
  LuCheck,
  LuClock,
  LuSparkles,
  LuBookOpen,
  LuFolderGit2,
  LuCopy,
  LuHeart,
} from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  // If navigated from Blogs grid, location.state?.blogNumber might be passed immediately
  const passedIndex = location.state?.blogNumber;
  // Use passed index (from grid nav), or backend's blogNumber once loaded, or null while loading
  const blogIndex = passedIndex ?? postInfo?.blogNumber ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blog/post/${id}`)
      .then((res) => {
        setPostInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  // Reading progress bar & scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate estimated reading time from HTML content
  const readingTime = useMemo(() => {
    if (!postInfo?.description && !postInfo?.shortdescription) return 2;
    const text = `${postInfo.shortdescription || ""} ${postInfo.description || ""}`;
    const cleanText = text.replace(/<[^>]*>/g, " ");
    const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 180));
  }, [postInfo?.description, postInfo?.shortdescription]);

  // Handle sharing / copying URL
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleShare = async () => {
    if (navigator.share && postInfo?.title) {
      try {
        await navigator.share({
          title: postInfo.title,
          text: postInfo.shortdescription || postInfo.title,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link if share was cancelled or failed
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─────────────────────────────────────────────────────────────
  // SKELETON LOADER
  // ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 font-inter text-slate-800 dark:text-slate-100 animate-fade-in-up">
        {/* Ambient background glow */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
          {/* Top navigation skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>

          {/* Badges & Title Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-12 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>

          {/* Hero Image Skeleton */}
          <div className="w-full h-72 sm:h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />

          {/* Summary Box Skeleton */}
          <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />

          {/* Content lines */}
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-11/12" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-4/5" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // NOT FOUND STATE
  // ─────────────────────────────────────────────────────────────
  if (!postInfo) {
    return (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-inter text-slate-800 dark:text-slate-100">
        <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md max-w-lg mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-5 border border-amber-200/70 dark:border-amber-800/60">
            <LuBookOpen className="text-2xl" />
          </div>
          <h2 className="font-unbounded text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Blog Post Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
            The article you are looking for may have been moved, removed, or is currently unpublished.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs tracking-wider uppercase hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-md"
          >
            <LuArrowLeft className="text-sm" />
            <span>Return to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // MAIN ARTICLE
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── High-Tech Glowing Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 z-50 transition-all duration-150 shadow-[0_0_12px_rgba(59,130,246,0.7)]"
        style={{ width: `${readProgress}%` }}
      />

      <div className="relative min-h-screen text-slate-800 dark:text-slate-100 font-inter">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-1/4 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── TOP ACTION BAR & NAVIGATION ────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <nav
            aria-label="Breadcrumb and quick actions"
            className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/70 dark:border-slate-800/70"
          >
            {/* Back link */}
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 backdrop-blur-md transition-all shadow-xs group"
            >
              <LuArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blogs</span>
            </Link>

            {/* Quick Share / Link buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md transition-all shadow-xs"
                title="Copy link to blog post"
              >
                {copied ? (
                  <>
                    <LuCheck className="text-emerald-500 text-sm" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <LuCopy className="text-xs" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm shadow-blue-500/25 transition-all group"
                title="Share this article"
              >
                <LuShare2 className="text-xs group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </nav>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── BLOG HEADER & TITLE ────────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <header className="space-y-4 mb-8">
            {/* Meta Pills: Blog #, Read Time, Article Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-unbounded tracking-wider uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                {blogIndex !== null
                  ? `Blog #${String(blogIndex).padStart(2, "0")}`
                  : "Article"}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                <LuClock className="text-xs text-blue-500" />
                <span>{readingTime} min read</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60">
                <LuSparkles className="text-xs text-indigo-500" />
                <span>Tech Deep Dive</span>
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-unbounded text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
              {postInfo.title}
            </h1>

            {/* Author Attribution Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-unbounded font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                  P
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">
                    Prashanth Santhanaraman
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Full Stack MERN Developer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/prashanth-santhanaraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Connect on LinkedIn"
                >
                  <FaLinkedin className="text-base" />
                </a>
                <a
                  href="https://github.com/prashanth-santhanaraman"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="GitHub Profile"
                >
                  <FaGithub className="text-base" />
                </a>
              </div>
            </div>
          </header>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── FEATURED HERO IMAGE ────────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="mb-10 group relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-slate-900 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40">
            <CoverImage
              src={postInfo.imglink}
              alt={postInfo.title}
              index={blogIndex ?? postInfo.title}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Micro badge overlay */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md bg-black/60 text-white border border-white/20 tracking-wider uppercase font-unbounded">
                {blogIndex !== null ? `Edition #${String(blogIndex).padStart(2, "0")}` : "Dev Insight"}
              </span>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── EDITORIAL LEAD SUMMARY BOX ─────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          {postInfo.shortdescription && (
            <div className="mb-10 relative rounded-2xl border-l-4 border-blue-600 bg-blue-50/50 dark:bg-slate-900/60 dark:border-blue-500 p-5 sm:p-6 backdrop-blur-sm shadow-xs">
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed">
                "{postInfo.shortdescription}"
              </p>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── SECTION SEPARATOR ─────────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <span className="text-[11px] font-unbounded font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
              <LuBookOpen className="text-xs" />
              <span>Article Content</span>
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── ARTICLE PROSE CONTENT ──────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none 
              prose-headings:font-unbounded prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-950 dark:prose-headings:text-white
              prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium hover:prose-a:underline
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-li:my-1.5
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-slate-900/60 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic
              prose-code:text-blue-600 dark:prose-code:text-blue-300 prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-slate-950 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl
              prose-img:rounded-2xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-slate-800 prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: postInfo.description }}
          />

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── ARTICLE ENGAGEMENT & SHARE FOOTER ──────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="mt-14 relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br from-white via-slate-50/60 to-blue-50/40 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-blue-950/20 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <p className="font-unbounded text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                    Found this article helpful?
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  Share it with fellow engineers or connect with me on LinkedIn to discuss full-stack ideas and modern development.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                >
                  <LuShare2 className="text-sm" />
                  <span>Share Article</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  {copied ? (
                    <>
                      <LuCheck className="text-emerald-500 text-sm" />
                      <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <LuCopy className="text-sm" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── AUTHOR SPOTLIGHT CARD ──────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}


          {/* ──────────────────────────────────────────────────────── */}
          {/* ── FOOTER & RELATED NAVIGATION ────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-unbounded text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                &lt;Prashanth. /&gt;
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Tech Blog & Engineering Notes
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <LuBookOpen className="text-sm" />
                <span>Explore All Blogs</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-xs"
              >
                <LuFolderGit2 className="text-sm" />
                <span>View Projects</span>
              </Link>
            </div>
          </footer>
        </article>

        {/* ── Floating Scroll to Top Button ── */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-900/10 backdrop-blur-md hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 z-40 group"
          >
            <LuArrowUp className="text-lg group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </>
  );
}

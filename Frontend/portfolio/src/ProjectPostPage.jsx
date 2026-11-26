import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";
import getProjectImageUrl from "./utils/projectImage";
import {
  LuArrowLeft,
  LuArrowUp,
  LuExternalLink,
  LuGithub,
  LuGlobe,
  LuShare2,
  LuCheck,
  LuClock,
  LuCalendar,
  LuSparkles,
  LuLayers,
  LuFolderGit2,
} from "react-icons/lu";

export default function ProjectPostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  // If navigated from Projects grid, location.state?.projectNumber might be passed immediately
  const passedIndex = location.state?.projectNumber;
  // Use passed index (from grid nav), or backend's projectNumber once loaded, or null while loading
  const projectIndex = passedIndex ?? postInfo?.projectNumber ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/project/post/${id}`)
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
    if (!postInfo?.description) return 1;
    const cleanText = postInfo.description.replace(/<[^>]*>/g, "");
    const words = cleanText.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  }, [postInfo?.description]);

  // Detect link type (GitHub or Live Website)
  const linkDetails = useMemo(() => {
    if (!postInfo?.websitelink) return null;
    const url = postInfo.websitelink.trim();
    const isGithub = url.toLowerCase().includes("github.com");
    return {
      url,
      isGithub,
      label: isGithub ? "GitHub Repository" : "Live Application",
      shortLabel: isGithub ? "Source Code" : "Live Demo",
      icon: isGithub ? LuGithub : LuGlobe,
    };
  }, [postInfo?.websitelink]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------------------------------------------------------------
  // SKELETON LOADER
  // -------------------------------------------------------------
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

          {/* Badge & Title Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
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

  // -------------------------------------------------------------
  // NOT FOUND STATE
  // -------------------------------------------------------------
  if (!postInfo) {
    return (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-inter text-slate-800 dark:text-slate-100">
        <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md max-w-lg mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-5 border border-amber-200/70 dark:border-amber-800/60">
            <LuFolderGit2 className="text-2xl" />
          </div>
          <h2 className="font-unbounded text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
            The project case study you are looking for may have been removed, archived, or is currently unpublished.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs tracking-wider uppercase hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-md"
          >
            <LuArrowLeft className="text-sm" />
            <span>Return to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN REDESIGNED ARTICLE
  // -------------------------------------------------------------
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
          {/* ── TOP ACTION BAR & BREADCRUMB ──────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <nav
            aria-label="Breadcrumb and quick actions"
            className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/70 dark:border-slate-800/70"
          >
            {/* Back link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 backdrop-blur-md transition-all shadow-xs group"
            >
              <LuArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>

            {/* Quick Share / Link buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md transition-all shadow-xs"
                title="Copy link to project"
              >
                {copied ? (
                  <>
                    <LuCheck className="text-emerald-500 text-sm" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <LuShare2 className="text-sm" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {linkDetails && (
                <a
                  href={linkDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm shadow-blue-500/25 transition-all group"
                >
                  <linkDetails.icon className="text-xs group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">{linkDetails.shortLabel}</span>
                  <LuExternalLink className="text-[10px] opacity-80" />
                </a>
              )}
            </div>
          </nav>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── PROJECT HEADER & TITLE ────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <header className="space-y-4 mb-8">
            {/* Meta Pills: Project #, Status, Read Time */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-unbounded tracking-wider uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                {projectIndex !== null
                  ? `Project #${String(projectIndex).padStart(2, "0")}`
                  : "Case Study"}
              </span>

              {postInfo.status && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      postInfo.status.toLowerCase() === "production" ||
                      postInfo.status.toLowerCase() === "live"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  {postInfo.status}
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/50">
                <LuClock className="text-xs text-slate-400" />
                <span>{readingTime} min read</span>
              </span>

              {postInfo.createdAt && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/50">
                  <LuCalendar className="text-xs text-slate-400" />
                  <span>
                    {new Date(postInfo.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
              )}
            </div>

            {/* Main Title */}
            <h1 className="font-unbounded text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.18]">
              {postInfo.title}
            </h1>

            {/* Accent Gradient Line */}
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          </header>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── HERO IMAGE SHOWCASE ───────────────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-slate-900/5 dark:shadow-slate-950/50 mb-10 group">
            <CoverImage
              src={getProjectImageUrl(postInfo.imglink)}
              alt={postInfo.title}
              index={projectIndex ?? postInfo.title}
              className="w-full h-64 sm:h-80 md:h-[26rem] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle bottom gradient protection overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

            {/* Bottom floating badge inside image */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                <LuLayers className="text-blue-400 text-sm" />
                <span className="font-unbounded tracking-wider uppercase text-[11px]">
                  Engineered by Prashanth
                </span>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── SHORT SUMMARY / EXECUTIVE HIGHLIGHT ───────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          {postInfo.shortdescription && (
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-cyan-50/40 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 p-5 sm:p-6 mb-10 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <LuSparkles className="text-lg" />
                </div>
                <div className="space-y-1">
                  <p className="font-unbounded text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    Executive Overview
                  </p>
                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium font-inter">
                    {postInfo.shortdescription}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[11px] font-unbounded font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Deep Dive & Architecture
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── PROJECT CONTENT (RICH TEXT HTML) ──────────────────── */}
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
          {/* ── SOURCE CODE / REPO CTA BANNER ─────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          {linkDetails && (
            <div className="mt-14 relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br from-white via-slate-50/60 to-blue-50/40 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-blue-950/20 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <p className="font-unbounded text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                      {linkDetails.isGithub ? "Open Source Codebase" : "Experience Live Project"}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    {linkDetails.isGithub
                      ? "Inspect architecture, review commits, and explore the implementation details on GitHub."
                      : "Interact with the deployed build in production environment."}
                  </p>
                </div>

                <a
                  href={linkDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all duration-300 shadow-md group shrink-0"
                >
                  <linkDetails.icon className="text-base group-hover:scale-110 transition-transform" />
                  <span>{linkDetails.label}</span>
                  <LuExternalLink className="text-xs" />
                </a>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* ── FOOTER & RELATED NAVIGATION ───────────────────────── */}
          {/* ──────────────────────────────────────────────────────── */}
          <footer className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-unbounded text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                &lt;Prashanth. /&gt;
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Crafted with MERN & Tailwind
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <LuFolderGit2 className="text-sm" />
                <span>Explore All Projects</span>
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
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();

  useEffect(() => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getReadTime = (htmlContent) => {
    if (!htmlContent) return "1 min read";
    const text = htmlContent.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setShowToast(true);

    // Auto dismiss toast after 3.5 seconds
    setTimeout(() => {
      setShowToast(false);
      setCopied(false);
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 animate-pulse">
        <div className="h-4 w-28 bg-base-300/40 rounded-full mb-8"></div>
        <div className="h-10 bg-base-300/40 rounded-xl w-3/4 mb-6"></div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-base-300/40"></div>
          <div className="h-4 w-32 bg-base-300/40 rounded"></div>
        </div>
        <div className="h-56 bg-base-300/40 rounded-2xl mb-10"></div>
        <div className="max-w-2xl mx-auto space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 bg-base-300/40 rounded-lg ${i % 3 === 2 ? "w-2/3" : "w-full"}`}></div>
          ))}
        </div>
      </div>
    );
  }

  if (!postInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-base-200/80 border border-base-300 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-1">Article Unavailable</h2>
        <p className="text-sm opacity-50 mb-6 max-w-sm">The post you are looking for does not exist or has been moved.</p>
        <Link to="/blogs" className="btn btn-sm btn-outline rounded-full px-6">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans relative selection:bg-primary/20">
      
      {/* iOS Floating Island Style Toast Bar */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          showToast
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center gap-3.5 px-5 py-3 rounded-full bg-base-100/90 backdrop-blur-2xl border border-base-300/80 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
          {/* Subtle Ambient Pulse behind Toast */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-primary/20 to-accent/20 blur-md pointer-events-none -z-10 animate-pulse" />

          {/* Icon indicator with scaling animation */}
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-[bounce_0.6s_ease-in-out_1]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="text-left pr-1">
            <p className="text-xs font-bold leading-tight text-base-content">
              Link Copied!
            </p>
            <p className="text-[11px] text-base-content/60 leading-tight mt-0.5">
              Thanks for spreading the word ✨
            </p>
          </div>

          <button
            onClick={() => setShowToast(false)}
            className="p-1 text-base-content/40 hover:text-base-content transition-colors rounded-full ml-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Reading Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-base-300/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-75 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Floating Action Deck */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/80 backdrop-blur-xl border border-base-300/60 shadow-2xl transition-all">
        <Link 
          to="/blogs" 
          className="p-2 hover:bg-base-200/80 rounded-full text-base-content/70 hover:text-base-content transition-colors"
          title="Back to all posts"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        
        <div className="w-[1px] h-4 bg-base-300" />

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-base-content/80 hover:text-base-content transition-colors"
        >
          {copied ? (
            <span className="text-emerald-500 font-semibold">Copied!</span>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>

        <div className="w-[1px] h-4 bg-base-300" />

        <button
          onClick={scrollToTop}
          className="p-2 hover:bg-base-200/80 rounded-full text-base-content/70 hover:text-base-content transition-colors"
          title="Scroll to top"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-6 pt-12 pb-32">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-base-content/50 hover:text-primary transition-colors"
          >
            <span className="text-primary">←</span> All Articles
          </Link>
        </div>

        {/* Hero Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 tracking-wide">
              PUBLISHED ARTICLE
            </span>
            <span className="text-xs font-mono text-base-content/50">
              {getReadTime(postInfo.description)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-6 text-base-content">
            {postInfo.title}
          </h1>

          <div className="flex items-center gap-4 pt-4 border-t border-base-200/60">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center font-bold text-xs">
                P
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-base-content leading-none">Prashanth</p>
              <p className="text-xs text-base-content/50 mt-1">Full-Stack Engineer & Creator</p>
            </div>
          </div>
        </header>

        {/* Cover Banner */}
        {postInfo.imglink && (
          <div className="relative rounded-2xl overflow-hidden mb-12 shadow-md border border-base-200/50 bg-base-200/30">
            <CoverImage
              src={postInfo.imglink}
              alt={postInfo.title}
              className="w-full h-48 sm:h-72 object-cover transform transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>
        )}

        {/* Short Description */}
        {postInfo.shortdescription && (
          <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-base-200/40 border-l-4 border-primary backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
              Article Overview
            </span>
            <p className="text-base sm:text-lg text-base-content/85 leading-relaxed font-normal">
              {postInfo.shortdescription}
            </p>
          </div>
        )}

        {/* Main Content Body */}
        <main className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none 
                       prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-base-content
                       prose-p:leading-[1.85] prose-p:text-base-content/85 prose-p:font-normal
                       prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                       prose-blockquote:border-l-primary prose-blockquote:italic
                       prose-code:bg-base-200/60 prose-code:text-primary prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                       prose-img:rounded-2xl prose-img:border prose-img:border-base-200 prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: postInfo.description }}
          />
        </main>

        {/* Footer Bio */}
        <footer className="max-w-3xl mx-auto mt-20 pt-10 border-t border-base-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs opacity-40">&lt;Prashanth. /&gt;</span>
            <span className="text-xs text-base-content/40">•</span>
            <span className="text-xs text-base-content/40">Built with React & Tailwind</span>
          </div>

          <Link
            to="/blogs"
            className="btn btn-sm btn-outline rounded-full px-6 font-medium text-xs tracking-wider uppercase hover:bg-base-200 hover:text-base-content border-base-300"
          >
            Explore All Articles →
          </Link>
        </footer>

      </article>
    </div>
  );
}
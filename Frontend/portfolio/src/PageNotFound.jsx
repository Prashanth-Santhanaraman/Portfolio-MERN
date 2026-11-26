import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LuHouse,
  LuFolderGit2,
  LuBookOpen,
  LuArrowLeft,
  LuTerminal,
  LuCompass,
  LuSparkles,
} from "react-icons/lu";

export default function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden font-inter text-slate-800 dark:text-slate-100">
      {/* ── Ambient Background Lighting & Orbs ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[48rem] h-[34rem] sm:h-[48rem] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-cyan-400/15 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 left-12 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* ── Central Glass Card ── */}
      <div className="relative w-full max-w-2xl mx-auto rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-12 shadow-2xl shadow-slate-900/5 dark:shadow-slate-950/60 text-center animate-fade-in-up">
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-900/60 shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-unbounded tracking-wider uppercase text-[11px]">
            Error 404 // Route Unresolved
          </span>
        </div>

        {/* Big 404 Number */}
        <div className="relative select-none mb-4">
          <h1 className="font-unbounded font-black text-8xl sm:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 drop-shadow-sm">
            404
          </h1>
          <div className="absolute -top-3 -right-2 sm:right-16 text-2xl sm:text-3xl animate-bounce" style={{ animationDuration: "2.5s" }}>
            <span className="inline-block px-2.5 py-1 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold shadow-lg border border-white/20">
              Lost
            </span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="font-unbounded text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-3 tracking-tight">
          Destination Not Found
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-lg mx-auto mb-8">
          The requested coordinate has drifted off the digital grid. It may have been relocated, renamed, or perhaps dissolved into hyperspace.
        </p>

        {/* ── Developer Diagnostic Terminal Box ── */}
        <div className="text-left rounded-2xl bg-slate-950 text-slate-200 p-4 sm:p-5 border border-slate-800 font-mono text-xs sm:text-sm mb-8 shadow-inner overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-slate-400 font-sans ml-2 flex items-center gap-1">
                <LuTerminal className="text-xs" /> diagnostics.log
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-sans uppercase tracking-widest">
              HTTP 404
            </span>
          </div>
          <div className="space-y-1 text-slate-300">
            <p>
              <span className="text-emerald-400">$</span> fetch --route{" "}
              <span className="text-amber-300">"{location.pathname}"</span>
            </p>
            <p className="text-rose-400">
              &gt; Error: Route target not registered in application graph
            </p>
            <p className="text-slate-400">
              &gt; Status: 404 // Page missing or archived
            </p>
            <p className="text-cyan-400">
              &gt; Suggestion: Return home or explore active directories below
            </p>
          </div>
        </div>

        {/* ── Quick Navigation Action Grid ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Return Home */}
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all duration-300 shadow-md group"
          >
            <LuHouse className="text-base group-hover:scale-110 transition-transform" />
            <span>Return Home</span>
          </Link>

          {/* Explore Projects */}
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs uppercase tracking-wider hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-xs group"
          >
            <LuFolderGit2 className="text-base group-hover:scale-110 transition-transform" />
            <span>Explore Projects</span>
          </Link>

          {/* Browse Blogs */}
          <Link
            to="/blogs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs uppercase tracking-wider hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-xs group"
          >
            <LuBookOpen className="text-base group-hover:scale-110 transition-transform" />
            <span>Read Blogs</span>
          </Link>

          {/* Go Back (History) */}
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <LuArrowLeft className="text-sm" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Footer brand pill */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
          <LuCompass className="text-sm" />
          <span>Need help finding something? Navigate using the top menu.</span>
        </div>
      </div>
    </div>
  );
}
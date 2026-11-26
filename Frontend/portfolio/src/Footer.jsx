import { Link } from "react-router-dom";
import {
  LuHouse,
  LuFolderGit2,
  LuBookOpen,
  LuArrowUp,
  LuMapPin,
  LuMail,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-slate-200/90 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-300 overflow-hidden font-inter">
      {/* ── Glowing top edge gradient line ── */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* ── Atmospheric background ambient glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-36 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* ──────────────────────────────────────────────────────── */}
        {/* ── TOP BANNER: AVAILABILITY & QUICK CTA ───────────────── */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br from-white/90 via-slate-50/50 to-blue-50/30 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-blue-950/20 backdrop-blur-md shadow-lg shadow-slate-900/5 dark:shadow-slate-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for New Opportunities</span>
            </div> */}
            <h2 className="font-unbounded text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Have a project or opportunity in mind?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Let's connect to build high-performance full-stack web applications, modern interactive interfaces, or explore innovative software solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.linkedin.com/in/prashanth-santhanaraman/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase shadow-md shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
            >
              <FaLinkedin className="text-sm" />
              <span>Connect on LinkedIn</span>
            </a>
            {/* <a
              href="mailto:prashanth.santhanaraman@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs tracking-wider uppercase hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
            >
              <LuMail className="text-sm" />
              <span>Say Hello</span>
            </a> */}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── MAIN FOOTER GRID ──────────────────────────────────── */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* ── Brand Col (Span 4) ── */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none">
              <h3 className="font-unbounded text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Prashanth</span>
                <span className="text-blue-600 dark:text-blue-400 group-hover:scale-125 transition-transform duration-300 inline-block">
                  .
                </span>
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Full Stack MERN Developer crafting elegant, scalable web applications with clean architecture, thoughtful user experience, and modern technology.
            </p>
            {/* <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <LuMapPin className="text-blue-500 text-sm" />
              <span>India</span>
            </div> */}
          </div>

          {/* ── Navigation Links (Span 3) ── */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-unbounded text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <LuHouse className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <LuFolderGit2 className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <LuBookOpen className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span>Blogs & Articles</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Social Profiles (Span 3) ── */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-unbounded text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.linkedin.com/in/prashanth-santhanaraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <FaLinkedin className="text-sm text-blue-600 dark:text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prashanth-santhanaraman"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <FaGithub className="text-sm text-slate-700 dark:text-slate-300" />
                  <span>GitHub Repositories</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.geeksforgeeks.org/user/prashanth_santhanaraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                >
                  <SiGeeksforgeeks className="text-sm text-emerald-600 dark:text-emerald-400" />
                  <span>GeeksforGeeks</span>
                </a>
              </li>
            </ul>
          </div>


        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* ── BOTTOM COPYRIGHT & UTILITIES ───────────────────────── */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © {currentYear}{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Prashanth Santhanaraman
            </span>
            .
          </p>

          <p className="flex items-center justify-center gap-1.5 font-medium tracking-wide">
            <span>Crafted with</span>
            <span className="text-red-500 animate-pulse text-sm">❤️</span>
            <span>using MERN & Tailwind</span>
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
          >
            <span>Back to top</span>
            <LuArrowUp className="text-xs group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

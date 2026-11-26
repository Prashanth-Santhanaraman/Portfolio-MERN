import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImg from "./images/prashanth_1.jpg";
import CoverImage from "./components/CoverImage";
import getProjectImageUrl from "./utils/projectImage";
import {
  FaLinkedin,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
  FaAward,
  FaTimes,
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import {
  SiOpenai,
  SiClaude,
  SiGooglegemini,
  SiGeeksforgeeks,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiGit,
} from "react-icons/si";
import { LuSparkles, LuCode, LuFolderGit2, LuGraduationCap, LuMapPin } from "react-icons/lu";

const rawCerts = [
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    category: "Frontend",
    date: "2023-11",
    displayDate: "Nov 2023",
    link: "https://www.freecodecamp.org/certification/example/responsive-web-design",
  },
  {
    title: "Backend Development and APIs",
    issuer: "FreeCodeCamp",
    category: "Backend",
    date: "2024-01",
    displayDate: "Jan 2024",
    link: "https://www.freecodecamp.org/certification/example/back-end-development-and-apis",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    category: "Programming",
    date: "2023-02",
    displayDate: "Feb 2023",
    link: "https://www.hackerrank.com/certificates/example-python",
  },
  {
    title: "CSS (Basic)",
    issuer: "HackerRank",
    category: "Frontend",
    date: "2022-10",
    displayDate: "Oct 2022",
    link: "https://www.hackerrank.com/certificates/example-css",
  },
  {
    title: "Mastering Figma: Beginner to Expert UI/UX Design",
    issuer: "Guvi",
    category: "Design",
    date: "2023-08",
    displayDate: "Aug 2023",
    link: "https://www.guvi.in/certificate/example-figma",
  },
  {
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    category: "Engineering",
    date: "2022-04",
    displayDate: "Apr 2022",
    link: null,
  },
  {
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    category: "Programming",
    date: "2021-11",
    displayDate: "Nov 2021",
    link: null,
  },
  {
    title: "Javascript (Basic)",
    issuer: "HackerRank",
    category: "Frontend",
    date: "2023-05",
    displayDate: "May 2023",
    link: "https://www.hackerrank.com/certificates/example-js",
  },
  {
    title: "What is Generative AI?",
    issuer: "LinkedIn",
    category: "AI & ML",
    date: "2024-03",
    displayDate: "Mar 2024",
    link: "https://www.linkedin.com/learning/certificates/example-genai",
  },
];

// Sort certifications by date descending (latest first)
const certs = [...rawCerts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function Home() {
  const [topProjects, setTopProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupCert, setPopupCert] = useState(null);
  const [activeCertFilter, setActiveCertFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/getTop3Projects`)
      .then((res) => {
        setTopProjects(res.data.projects || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filteredCerts =
    activeCertFilter === "All"
      ? certs
      : certs.filter((c) => c.category === activeCertFilter || c.issuer === activeCertFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 md:space-y-24 font-inter text-slate-800 dark:text-slate-100 overflow-x-hidden animate-fade-in-up">
      {/* ────────────────────────────────────────────────────────── */}
      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative pt-4 pb-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT: Introduction & Bio (7 cols on lg, 2nd on mobile) ── */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start gap-6">

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              {/* <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Available for Opportunities</span>
              <span className="text-slate-300 dark:text-slate-600 font-light">•</span> */}
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <LuSparkles className="text-xs" /> Building AI Agents
              </span>
            </div>

            {/* Headline Block */}
            <div className="space-y-3">
              {/* <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400">
                Full‑Stack Engineer & AI Enthusiast
              </p> */}

              <h1 className="font-unbounded text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-950 dark:text-white">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                    Prashanth
                  </span>
                  {/* Underline accent */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0 5 Q25 1 50 5 Q75 9 100 5 Q125 1 150 5 Q175 9 200 5" stroke="url(#ug-hero)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="ug-hero" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563eb"/>
                        <stop offset="50%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#06b6d4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="waving-hand ml-3 text-3xl sm:text-4xl lg:text-5xl">👋</span>
              </h1>
            </div>

            {/* Bio text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              I build high-performance full-stack web applications with the{" "}
              <strong className="font-semibold text-slate-900 dark:text-white">MERN stack</strong> and engineer modern intelligent systems powered by{" "}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg font-semibold text-xs sm:text-sm bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/70 align-baseline">
                <LuSparkles className="text-xs text-blue-500" /> LLMs, AI Agents & RAG
              </span>.
            </p>

            {/* Quick Highlights / Mini Badges */}


            {/* CTA & Social Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-slate-950/20 dark:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <FaArrowRight className="text-xs" />
              </Link>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/prashanth-santhanaraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/80 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                  title="Connect on LinkedIn"
                >
                  <FaLinkedin className="text-blue-600 dark:text-blue-400 text-base" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/prashanth-santhanaraman"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                  title="View GitHub"
                >
                  <FaGithub className="text-base" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

                <a
                  href="https://www.geeksforgeeks.org/user/prashanth_santhanaraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-700 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700/80 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                  title="GeeksforGeeks Profile"
                >
                  <SiGeeksforgeeks className="text-emerald-600 dark:text-emerald-400 text-base" />
                  <span className="hidden sm:inline">GFG</span>
                </a>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Modern Floating Profile Showcase (5 cols on lg, 1st on mobile) ── */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-48 sm:w-80 md:w-96 aspect-square flex items-center justify-center">

              {/* Decorative aura rings */}
              <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-cyan-400/20 blur-xl sm:blur-2xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/80 dark:border-slate-700/60 animate-[spin_40s_linear_infinite]" />

              {/* Photo container with layered gradient ring */}
              <div className="relative p-1.5 sm:p-2 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 shadow-xl sm:shadow-2xl shadow-blue-500/20">
                <div className="w-28 h-28 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 ring-2 sm:ring-4 ring-white dark:ring-slate-900">
                  <img
                    src={profileImg}
                    alt="Prashanth Santhanaraman"
                    className="w-full h-full object-cover object-[center_20%] hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Pill: Top Left */}
              <div className="absolute -top-1 sm:-top-2 -left-2 sm:left-4 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-md sm:shadow-lg shadow-slate-900/5 dark:shadow-black/20 flex items-center gap-1.5 sm:gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] sm:text-sm font-bold">
                  <LuCode />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400">Stack</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white font-unbounded">MERN</p>
                </div>
              </div>

              {/* Floating Pill: Bottom Right */}
              <div className="absolute -bottom-1 sm:-bottom-2 -right-2 sm:right-4 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-md sm:shadow-lg shadow-slate-900/5 dark:shadow-black/20 flex items-center gap-1.5 sm:gap-2.5 animate-bounce [animation-duration:5s]">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] sm:text-sm font-bold">
                  <LuSparkles />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400">Focus</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white font-unbounded">AI & Agents</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── SECTION 2: TOP PROJECTS SHOWCASE (BENTO STYLE) ─────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-1">
              <LuFolderGit2 className="text-sm" />
              <span>01 // Selected Works</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-4 space-y-4"
              >
                <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
                <div className="space-y-2">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
                </div>
                <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : topProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 text-center">
            <LuFolderGit2 className="text-4xl text-slate-400 dark:text-slate-500 mb-3" />
            <p className="font-unbounded font-medium text-sm text-slate-600 dark:text-slate-300">
              No featured projects available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProjects.map((project, idx) => (
              <div
                key={project._id}
                className="group relative rounded-3xl overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Section */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-800/50 m-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                  <CoverImage
                    src={getProjectImageUrl(project.imglink)}
                    alt={project.title}
                    index={idx + 1}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Index Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-unbounded text-[10px] font-bold border border-white/20">
                    0{idx + 1}
                  </div>

                  {/* Direct Link Hover Button */}
                  {project.websitelink && (
                    <a
                      href={project.websitelink}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-blue-600 hover:text-white"
                      title="Open Live Preview"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-unbounded font-bold text-base text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">
                      {project.shortdescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <a
                      href={project.websitelink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-xs"
                    >
                      <span>Live Demo</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    {project._id && (
                      <Link
                        to={`/projects/post/${project._id}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                        title="Read Case Study"
                      >
                        Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── SECTION 3: SKILLS & TOOLKIT BENTO ───────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-1">
            <LuCode className="text-sm" />
            <span>02 // Tech Stack</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Skills & Frameworks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Frontend Bento */}
          <div className="rounded-3xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-sm text-slate-900 dark:text-white">
                    Frontend
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60">
                  UI & Client
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "React", icon: <FaReact className="text-blue-500 text-sm" /> },
                  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-sm" /> },
                  { name: "HTML5", icon: <SiHtml5 className="text-orange-500 text-sm" /> },
                  { name: "CSS3", icon: <SiCss3 className="text-blue-600 text-sm" /> },
                  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400 text-sm" /> },
                  {
                    name: "EJS",
                    icon: (
                      <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        &lt;/&gt;
                      </span>
                    ),
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-800 dark:text-slate-200 text-xs font-medium hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backend & DB Bento */}
          <div className="rounded-3xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-sm text-slate-900 dark:text-white">
                    Backend & DB
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                  Servers & APIs
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-sm" /> },
                  { name: "Express.js", icon: <SiExpress className="text-slate-700 dark:text-slate-300 text-sm" /> },
                  { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-sm" /> },
                  { name: "MySQL", icon: <SiMysql className="text-blue-500 text-sm" /> },
                  { name: "Python", icon: <FaPython className="text-amber-500 text-sm" /> },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-800 dark:text-slate-200 text-xs font-medium hover:border-emerald-400 dark:hover:border-emerald-500 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tools & Modern Workflow Bento */}
          <div className="rounded-3xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-sm text-slate-900 dark:text-white">
                    AI & Modern Tools
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/80 dark:border-purple-800/60">
                  Intelligent Agents
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Git", icon: <SiGit className="text-orange-600 text-sm" /> },
                  { name: "GitHub", icon: <FaGithub className="text-slate-900 dark:text-slate-100 text-sm" /> },
                  { name: "ChatGPT", icon: <SiOpenai className="text-emerald-500 text-sm" /> },
                  { name: "Claude", icon: <SiClaude className="text-amber-600 text-sm" /> },
                  { name: "Gemini", icon: <SiGooglegemini className="text-blue-500 text-sm" /> },
                  { name: "LLM / Agents", icon: <LuSparkles className="text-purple-500 text-sm" /> },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-slate-800 dark:text-slate-200 text-xs font-medium hover:border-purple-400 dark:hover:border-purple-500 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── SECTION 4: CERTIFICATIONS & CREDENTIALS ────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-1">
              <LuGraduationCap className="text-sm" />
              <span>03 // Verified Milestones</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Certifications
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Frontend", "Backend", "Programming", "AI & ML"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCertFilter(filter)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCertFilter === filter
                    ? "bg-slate-950 text-white dark:bg-blue-600 dark:text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Bento Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCerts.map((cert, idx) => (
            <div
              key={idx}
              onClick={() => cert.link && setPopupCert(cert)}
              className={`group p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all duration-200 flex items-start justify-between gap-3 ${
                cert.link ? "cursor-pointer" : ""
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <FaAward className="text-lg" />
                </div>
                <div>
                  <h3 className="font-unbounded font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {cert.issuer}
                    </span>
                    <span>•</span>
                    <span>{cert.displayDate}</span>
                  </div>
                </div>
              </div>

              {cert.link && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-colors shrink-0">
                  <FaExternalLinkAlt className="text-xs" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Portal for Certificate Preview */}
        {popupCert &&
          createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in-up"
              onClick={() => setPopupCert(null)}
            >
              <div
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-200 dark:border-blue-800">
                      <FaAward className="text-2xl" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                        {popupCert.issuer}
                      </span>
                      <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white font-unbounded mt-1 leading-snug">
                        {popupCert.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setPopupCert(null)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shrink-0"
                    aria-label="Close modal"
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>

                {/* Certificate Preview Card */}
                <div className="my-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="w-full py-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-500 flex items-center justify-center mb-2 shadow-xs border border-amber-300 dark:border-amber-700">
                      <FaAward className="text-2xl" />
                    </div>
                    <p className="font-unbounded font-semibold text-xs text-slate-800 dark:text-slate-200 max-w-[90%]">
                      {popupCert.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Issued by{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {popupCert.issuer}
                      </span>{" "}
                      •{" "}
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        {popupCert.displayDate}
                      </span>
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <FaCheckCircle className="text-xs" />
                      <span>Verified Credential</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={popupCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all"
                  >
                    <span>View Certificate</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                  <button
                    onClick={() => setPopupCert(null)}
                    className="py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-sm transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── SECTION 5: GET IN TOUCH (POLISHED BENTO BANNER) ─────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-14 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-xl border border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300">
            <LuSparkles className="text-xs" />
            <span>Open for Collaboration & Roles</span>
          </div>

          <h2 className="font-unbounded text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Let's Build Something Exceptional Together
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you want to discuss full-stack projects, explore AI agent workflows, or have an open role, my inbox is always open!
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-3">
            <a
              href="https://www.linkedin.com/in/prashanth-santhanaraman/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
            >
              <FaLinkedin className="text-base" />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="https://github.com/prashanth-santhanaraman"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-sm backdrop-blur-md hover:-translate-y-0.5 transition-all"
            >
              <FaGithub className="text-base" />
              <span>Explore GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

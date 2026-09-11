import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImg from "./images/prashanth_1.jpg";
import CoverImage from "./components/CoverImage";
import {
  FaLinkedin,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
  FaAward,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiOpenai, SiClaude, SiGooglegemini } from "react-icons/si";
import {
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
const rawCerts = [
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "2023-11",
    displayDate: "Nov 2023",
    link: "https://www.freecodecamp.org/certification/example/responsive-web-design",
  },
  {
    title: "Backend Development and APIs",
    issuer: "FreeCodeCamp",
    date: "2024-01",
    displayDate: "Jan 2024",
    link: "https://www.freecodecamp.org/certification/example/back-end-development-and-apis",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "2023-02",
    displayDate: "Feb 2023",
    link: "https://www.hackerrank.com/certificates/example-python",
  },
  {
    title: "CSS (Basic)",
    issuer: "HackerRank",
    date: "2022-10",
    displayDate: "Oct 2022",
    link: "https://www.hackerrank.com/certificates/example-css",
  },
  {
    title: "Mastering Figma: Beginner to Expert UI/UX Design",
    issuer: "Guvi",
    date: "2023-08",
    displayDate: "Aug 2023",
    link: "https://www.guvi.in/certificate/example-figma",
  },
  {
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    date: "2022-04",
    displayDate: "Apr 2022",
    link: null,
  },
  {
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    date: "2021-11",
    displayDate: "Nov 2021",
    link: null,
  },
  {
    title: "Javascript (Basic)",
    issuer: "HackerRank",
    date: "2023-05",
    displayDate: "May 2023",
    link: "https://www.hackerrank.com/certificates/example-js",
  },
  {
    title: "What is Generative AI?",
    issuer: "LinkedIn",
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

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 animate-fade-in-up font-inter w-full overflow-x-hidden">
      {/* ── Section 1: Hero ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 mb-20 md:mb-24">
        <div className="flex-1 text-left order-2 md:order-1">
          <h1 className="font-unbounded text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 mt-2 md:mt-0">
            Hello! <span className="waving-hand">👋</span>
            <br />I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Prashanth.
            </span>
          </h1>
          <p className="text-sm md:text-base opacity-70 mb-5 md:mb-6 max-w-xl md:mx-0 leading-relaxed">
            I'm a passionate web developer focused on building scalable,
            user-friendly applications using the MERN stack. I'm also exploring{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              LLMs, AI Agents, RAG, and MCP
            </span>{" "}
            to build intelligent, AI-powered applications.
          </p>
          <div className="flex flex-wrap justify-start gap-2.5 md:gap-3.5">
            <a
              href="https://www.linkedin.com/in/prashanth-santhanaraman/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm md:btn-md border-2 border-slate-950 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 gap-2 group"
            >
              <FaLinkedin className="text-lg md:text-xl text-blue-600 group-hover:scale-115 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/prashanth-santhanaraman"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm md:btn-md border-2 border-slate-950 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.8)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 gap-2 group"
            >
              <FaGithub className="text-lg md:text-xl text-slate-900 dark:text-slate-100 group-hover:scale-115 transition-transform" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.geeksforgeeks.org/user/prashanth_santhanaraman/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm md:btn-md border-2 border-slate-950 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(34,197,94,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 gap-2 group"
            >
              <SiGeeksforgeeks className="text-lg md:text-xl text-green-600 group-hover:scale-115 transition-transform" />
              <span>GFG</span>
            </a>
          </div>
        </div>
        <div className="flex-shrink-0 order-1 md:order-2 self-start md:self-auto pt-3 md:pt-4 pb-2">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
            <img
              src={profileImg}
              alt="Prashanth"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Top 3 Projects ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">
            &lt;Top Projects /&gt;
          </h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border-2 border-base-300 overflow-hidden"
              >
                <div className="h-32 md:h-44 bg-base-300" />
                <div className="p-3 md:p-4 space-y-3">
                  <div className="h-4 md:h-5 bg-base-300 rounded w-3/4" />
                  <div className="h-3 bg-base-300 rounded w-full" />
                  <div className="h-3 bg-base-300 rounded w-4/5" />
                  <div className="h-6 md:h-8 bg-base-300 rounded w-full mt-3 md:mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : topProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 md:h-48 border-2 border-dashed border-base-300 rounded-2xl opacity-50">
            <p className="font-unbounded text-sm md:text-base">
              No projects featured yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {topProjects.map((project, idx) => (
              <div
                key={project._id}
                className="group border-2 border-slate-950 rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[7px_7px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative h-40 md:h-48 overflow-hidden border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-800">
                  <CoverImage
                    src={project.imglink}
                    alt={project.title}
                    index={idx + 1}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Number Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-slate-950/90 text-white font-unbounded text-[10px] font-bold border border-white/20 backdrop-blur-xs">
                    0{idx + 1}
                  </span>

                  {/* Quick Link Badge */}
                  <a
                    href={project.websitelink}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-950 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                    title="Open Live Website"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>

                {/* Body Content */}
                <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-unbounded font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {project.shortdescription}
                    </p>
                  </div>

                  <a
                    href={project.websitelink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm w-full rounded-xl border-2 border-slate-950 bg-slate-950 text-white hover:bg-blue-600 hover:border-slate-950 shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] hover:shadow-none transition-all flex items-center justify-center gap-2 font-bold text-xs md:text-sm mt-auto"
                  >
                    <span>View Project</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="btn btn-sm md:btn-md border-2 border-slate-950 rounded-xl px-6 md:px-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all"
          >
            View All Projects →
          </Link>
        </div>
      </div>

      {/* ── Section 3: Skills ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">
            &lt;Skills /&gt;
          </h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Frontend Tech Card */}
          <div className="border-2 border-slate-950 rounded-2xl p-4 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100">
                    Frontend
                  </h3>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  6 Tech
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "React", icon: <FaReact className="text-blue-500 text-sm" /> },
                  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-sm" /> },
                  { name: "HTML5", icon: <SiHtml5 className="text-orange-500 text-sm" /> },
                  { name: "CSS3", icon: <SiCss3 className="text-blue-600 text-sm" /> },
                  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400 text-sm" /> },
                  { name: "EJS", icon: <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">&lt;/&gt;</span> },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-950 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-xs shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backend & Database Tech Card */}
          <div className="border-2 border-slate-950 rounded-2xl p-4 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100">
                    Backend & DB
                  </h3>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                  5 Tech
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-sm" /> },
                  { name: "Express.js", icon: <SiExpress className="text-slate-600 dark:text-slate-300 text-sm" /> },
                  { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-sm" /> },
                  { name: "MySQL", icon: <SiMysql className="text-blue-500 text-sm" /> },
                  { name: "Python", icon: <FaPython className="text-amber-500 text-sm" /> },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-950 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-xs shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tools & Workflow Tech Card */}
          <div className="border-2 border-slate-950 rounded-2xl p-4 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,1)] hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm" />
                  <h3 className="font-unbounded font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100">
                    AI & Tools
                  </h3>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  5 Tools
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Git", icon: <SiGit className="text-orange-600 text-sm" /> },
                  { name: "GitHub", icon: <FaGithub className="text-slate-900 dark:text-slate-100 text-sm" /> },
                  { name: "ChatGPT", icon: <SiOpenai className="text-emerald-500 text-sm" /> },
                  { name: "Claude", icon: <SiClaude className="text-amber-600 text-sm" /> },
                  { name: "Gemini", icon: <SiGooglegemini className="text-blue-500 text-sm" /> },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-950 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-xs shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Certifications ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">
            &lt;Certifications /&gt;
          </h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* <div className="border-l-2 border-slate-950 ml-2 md:ml-3 pl-4 md:pl-5 py-1 space-y-5 md:space-y-6">
          {[
            { title: "Responsive Web Design", issuer: "FreeCodeCamp" },
            { title: "Backend Development and APIs", issuer: "FreeCodeCamp" },
            { title: "Python (Basic)", issuer: "HackerRank" },
            { title: "CSS (Basic)", issuer: "HackerRank" },
            {
              title: "Mastering Figma: Beginner to Expert UI/UX Design",
              issuer: "Guvi",
            },
            { title: "Introduction to Internet of Things", issuer: "NPTEL" },
            { title: "The Joy of Computing using Python", issuer: "NPTEL" },
            { title: "Javascript (Basic)", issuer: "HackerRank" },
            { title: "What is Generative AI ?", issuer: "LinkedIn" },
          ].map((cert, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[23px] md:-left-[27px] top-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-slate-950 rounded-full outline outline-4 outline-base-100 transition-transform group-hover:scale-125"></div>
              <h3 className="font-bold text-sm md:text-base font-unbounded text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                {cert.title}
              </h3>
              <p className="text-[10px] md:text-xs opacity-60 font-medium mt-1">
                {cert.issuer}
              </p>
            </div>
          ))}
        </div> */}

         {/* Scrollable cert list — max-h controls the viewport; adjust as needed */}
      <div className="relative">
        <div className="max-h-72 overflow-y-auto pr-3 custom-scrollbar">
          <div className="border-l-2 border-slate-950 ml-2 md:ml-3 pl-4 md:pl-5 py-1 space-y-5 md:space-y-6">
            {certs.map((cert, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[23px] md:-left-[27px] top-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-slate-950 rounded-full outline outline-4 outline-base-100 transition-transform group-hover:scale-125" />
 
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3
                      onClick={() => cert.link && setPopupCert(cert)}
                      className={`font-bold text-sm md:text-base font-unbounded text-slate-900 dark:text-slate-100 transition-colors inline ${
                        cert.link
                          ? "cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4"
                          : ""
                      }`}
                    >
                      {cert.title}
                    </h3>
                    {cert.link && (
                      <span className="hidden sm:inline-flex ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 pointer-events-none align-middle">
                        Click to see certificate ↗
                      </span>
                    )}
                    <p className="text-[10px] md:text-xs opacity-70 font-medium mt-0.5 flex items-center gap-1.5">
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{cert.displayDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-base-100 to-transparent" />
      </div>
 
      {/* Certification Preview Modal Portal */}
      {popupCert &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setPopupCert(null)}
          >
            <div
              className="relative bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 md:p-8 w-full max-w-md mx-auto overflow-hidden animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl border-2 border-slate-950">
                    <FaAward className="text-2xl" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {popupCert.issuer}
                    </span>
                    <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 font-unbounded mt-1 leading-tight">
                      {popupCert.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setPopupCert(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-2 border-slate-950 transition-all shrink-0"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              {/* Certificate Preview Card */}
              <div className="my-5 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-950 text-center">
                <div className="w-full py-6 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-500 flex items-center justify-center mb-2 shadow-sm border border-amber-300 dark:border-amber-700">
                    <FaAward className="text-2xl" />
                  </div>
                  <p className="font-unbounded font-semibold text-xs text-slate-800 dark:text-slate-200 max-w-[90%]">
                    {popupCert.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Issued by <span className="font-semibold text-slate-700 dark:text-slate-300">{popupCert.issuer}</span> • <span className="font-medium text-slate-600 dark:text-slate-400">{popupCert.displayDate}</span>
                </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Verified Credential</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={popupCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] hover:shadow-none transition-all"
                >
                  <span>View Certificate</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>
                <button
                  onClick={() => setPopupCert(null)}
                  className="py-2.5 px-5 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* ── Section 5: Get in Touch ── */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 border-slate-950 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-10">
        <h2 className="font-unbounded text-xl md:text-3xl font-bold mb-3">
          Let's Connect!
        </h2>
        <p className="text-xs md:text-base opacity-70 max-w-2xl mx-auto mb-5 md:mb-6">
          I'm currently looking for new opportunities and collaborations. Let's
          build something amazing together!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/prashanth-santhanaraman/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-xs md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-950"
          >
            <FaLinkedin className="text-base md:text-xl" /> Connect on LinkedIn
          </a>
          <a
            href="https://github.com/prashanth-santhanaraman"
            target="_blank"
            rel="noreferrer"
            className="btn btn-xs md:btn-md btn-outline border-2 border-slate-950 bg-white dark:bg-transparent hover:bg-slate-950 hover:text-white"
          >
            <FaGithub className="text-base md:text-xl" /> Check my GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

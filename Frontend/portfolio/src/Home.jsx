import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profileImg from "./images/prashanth_1.jpg";
import { FaLinkedin, FaGithub, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiGeeksforgeeks, SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiMysql, SiGit } from "react-icons/si";

export default function Home() {
  const [topProjects, setTopProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blogs`)
      .then((res) => {
        setTopProjects(res.data.top3projects || []);
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
            Hello! <span className="waving-hand">👋</span><br />
            I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Prashanth</span>
          </h1>
          <p className="text-sm md:text-base opacity-70 mb-5 md:mb-6 max-w-xl md:mx-0 leading-relaxed">
            Final year student at <a href="https://www.rajalakshmi.org/" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">Rajalakshmi Engineering College</a>.<br className="hidden md:block"/>
            I'm a passionate web developer focused on building scalable, user-friendly applications using the MERN stack.
          </p>
          <div className="flex flex-wrap justify-start gap-2 md:gap-3">
            <a href="https://www.linkedin.com/in/prashanth-santhanaraman/" target="_blank" rel="noreferrer" className="btn btn-sm md:btn-md btn-outline border-2 border-slate-950 rounded-xl hover:bg-slate-950 hover:text-white transition-all">
              <FaLinkedin className="text-lg md:text-xl" /> LinkedIn
            </a>
            <a href="https://github.com/prashanth-santhanaraman" target="_blank" rel="noreferrer" className="btn btn-sm md:btn-md btn-outline border-2 border-slate-950 rounded-xl hover:bg-slate-950 hover:text-white transition-all">
              <FaGithub className="text-lg md:text-xl" /> GitHub
            </a>
            <a href="https://www.geeksforgeeks.org/user/prashanth_santhanaraman/" target="_blank" rel="noreferrer" className="btn btn-sm md:btn-md btn-outline border-2 border-slate-950 rounded-xl hover:bg-slate-950 hover:text-white transition-all">
              <SiGeeksforgeeks className="text-lg md:text-xl" /> GFG
            </a>
          </div>
        </div>
        <div className="flex-shrink-0 order-1 md:order-2 self-start md:self-auto">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
            <img src={profileImg} alt="Prashanth" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Section 2: Top 3 Projects ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">&lt;Top Projects /&gt;</h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border-2 border-base-300 overflow-hidden">
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
            <p className="font-unbounded text-sm md:text-base">No projects featured yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {topProjects.map((project) => (
              <div key={project._id} className="group border-2 border-slate-950 rounded-2xl overflow-hidden flex flex-col bg-base-100 transition-all hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1">
                <div className="h-32 md:h-44 overflow-hidden border-b-2 border-slate-950 bg-base-200">
                  <img src={project.imglink} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = "https://placehold.co/600x400/png?text=Project" }} />
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-unbounded font-bold text-sm md:text-base mb-1 md:mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-xs opacity-70 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">{project.shortdescription}</p>
                  <a href={project.websitelink} target="_blank" rel="noreferrer" className="btn btn-xs md:btn-sm btn-outline border-slate-950 w-full group-hover:bg-slate-950 group-hover:text-white transition-colors">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/projects" className="btn btn-sm md:btn-md border-2 border-slate-950 rounded-xl px-6 md:px-8 hover:bg-slate-950 hover:text-white transition-all">
            View All Projects →
          </Link>
        </div>
      </div>

      {/* ── Section 3: Skills ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">&lt;Skills /&gt;</h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="border-2 border-slate-950 rounded-2xl p-4 md:p-5 bg-base-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
            <h3 className="font-unbounded font-semibold mb-3 md:mb-4 text-sm md:text-base">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><FaReact className="text-blue-500" /> React</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiJavascript className="text-yellow-400" /> JavaScript</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiHtml5 className="text-orange-500" /> HTML5</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiCss3 className="text-blue-600" /> CSS3</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiTailwindcss className="text-cyan-400" /> Tailwind</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs">EJS</span>
            </div>
          </div>
          
          <div className="border-2 border-slate-950 rounded-2xl p-4 md:p-5 bg-base-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
            <h3 className="font-unbounded font-semibold mb-3 md:mb-4 text-sm md:text-base">Backend & Database</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><FaNodeJs className="text-green-500" /> Node.js</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiExpress className="text-gray-500" /> Express.js</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiMongodb className="text-green-600" /> MongoDB</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiMysql className="text-blue-500" /> MySQL</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><FaPython className="text-blue-400" /> Python</span>
            </div>
          </div>
          
          <div className="border-2 border-slate-950 rounded-2xl p-4 md:p-5 bg-base-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:col-span-2 transition-transform hover:-translate-y-1">
            <h3 className="font-unbounded font-semibold mb-3 md:mb-4 text-sm md:text-base">Tools & Version Control</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><SiGit className="text-orange-600" /> Git</span>
              <span className="badge border-2 border-slate-950 gap-1.5 py-2 md:py-3 px-2 md:px-3 font-semibold text-[10px] md:text-xs"><FaGithub /> GitHub</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Certifications ── */}
      <div className="mb-20 md:mb-24">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <h2 className="font-unbounded text-lg md:text-2xl font-bold">&lt;Certifications /&gt;</h2>
          <div className="flex-1 h-px bg-base-300" />
        </div>
        
        <div className="border-l-2 border-slate-950 ml-2 md:ml-3 pl-4 md:pl-5 py-1 space-y-5 md:space-y-6">
          {[
            { title: "Responsive Web Design", issuer: "FreeCodeCamp" },
            { title: "Backend Development and APIs", issuer: "FreeCodeCamp" },
            { title: "Python (Basic)", issuer: "HackerRank" },
            { title: "CSS (Basic)", issuer: "HackerRank" },
            { title: "Mastering Figma: Beginner to Expert UI/UX Design", issuer: "Guvi" },
            { title: "Introduction to Internet of Things", issuer: "NPTEL" },
            { title: "The Joy of Computing using Python", issuer: "NPTEL" }
          ].map((cert, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[23px] md:-left-[27px] top-1.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-slate-950 rounded-full outline outline-4 outline-base-100 transition-transform group-hover:scale-125"></div>
              <h3 className="font-bold text-sm md:text-base font-unbounded text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">{cert.title}</h3>
              <p className="text-[10px] md:text-xs opacity-60 font-medium mt-1">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 5: Get in Touch ── */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 border-slate-950 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-10">
        <h2 className="font-unbounded text-xl md:text-3xl font-bold mb-3">Let's Connect!</h2>
        <p className="text-xs md:text-base opacity-70 max-w-2xl mx-auto mb-5 md:mb-6">
          I'm currently looking for new opportunities and collaborations. Let's build something amazing together!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://www.linkedin.com/in/prashanth-santhanaraman/" target="_blank" rel="noreferrer" className="btn btn-xs md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-2 border-slate-950">
            <FaLinkedin className="text-base md:text-xl" /> Connect on LinkedIn
          </a>
          <a href="https://github.com/prashanth-santhanaraman" target="_blank" rel="noreferrer" className="btn btn-xs md:btn-md btn-outline border-2 border-slate-950 bg-white dark:bg-transparent hover:bg-slate-950 hover:text-white">
            <FaGithub className="text-base md:text-xl" /> Check my GitHub
          </a>
        </div>
      </div>

    </div>
  );
}

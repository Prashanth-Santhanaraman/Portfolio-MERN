import { Link, useLocation } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { TbHomeFilled } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    // Exact match for home, partial match for blogs/projects to keep them active when inside a post
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b-2 border-slate-950 shadow-sm transition-all duration-300">
      <div className="navbar max-w-5xl mx-auto px-4 md:px-6 py-2 md:py-3">
        
        {/* ── Left: Branding & Mobile Menu ── */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost lg:hidden mr-2 border-2 border-slate-950 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-2xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] z-[1] mt-4 w-56 p-3 gap-2 font-inter font-medium">
              <li>
                <Link to="/" className={`rounded-xl px-4 py-3 ${currentPath === '/' ? 'bg-slate-950 text-white hover:bg-slate-800 hover:text-white' : 'hover:bg-base-200'}`}>
                  <TbHomeFilled className="text-lg" /> Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className={`rounded-xl px-4 py-3 ${currentPath.startsWith('/blogs') ? 'bg-slate-950 text-white hover:bg-slate-800 hover:text-white' : 'hover:bg-base-200'}`}>
                  <MdNotes className="text-lg" /> Blogs
                </Link>
              </li>
              <li>
                <Link to="/projects" className={`rounded-xl px-4 py-3 ${currentPath.startsWith('/projects') ? 'bg-slate-950 text-white hover:bg-slate-800 hover:text-white' : 'hover:bg-base-200'}`}>
                  <GoProjectRoadmap className="text-lg" /> Projects
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-unbounded font-bold hover:text-blue-600 transition-colors tracking-tight">
            &lt;Prashanth. /&gt;
          </Link>
        </div>

        {/* ── Center: Desktop Links ── */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-10 font-inter font-semibold text-sm">
            <li>
              <Link to="/" className={`transition-all hover:text-blue-600 ${currentPath === '/' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'opacity-60 hover:opacity-100'}`}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/blogs" className={`transition-all hover:text-blue-600 ${currentPath.startsWith('/blogs') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'opacity-60 hover:opacity-100'}`}>
                BLOGS
              </Link>
            </li>
            <li>
              <Link to="/projects" className={`transition-all hover:text-blue-600 ${currentPath.startsWith('/projects') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'opacity-60 hover:opacity-100'}`}>
                PROJECTS
              </Link>
            </li>
          </ul>
        </div>

        {/* ── Right: CTA ── */}
        <div className="navbar-end">
          <a href="../Profile (1).pdf" target="_blank" rel="noreferrer" className="btn btn-sm md:btn-md btn-outline border-2 border-slate-950 rounded-xl hover:bg-slate-950 hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[3px] hover:translate-x-[3px] font-inter font-bold bg-base-100">
            <LuDownload className="text-base md:text-lg" /> Resume
          </a>
        </div>
      </div>
    </div>
  );
}

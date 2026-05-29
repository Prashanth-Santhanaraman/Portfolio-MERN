import { TbHomeFilled } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md mt-16 border-t border-slate-200 py-12 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 blur-2xl -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Branding */}
        <Link to="/" className="mb-8 hover:opacity-80 transition-opacity">
          <h1 className="text-4xl font-unbounded font-black tracking-tight text-slate-800">
            Prashanth<span className="text-blue-600">.</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
          <Link to={"/"} className="group flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-200 bg-white">
            <TbHomeFilled className="text-xl group-hover:scale-110 transition-transform" /> 
            <span className="font-semibold text-sm tracking-wide">Home</span>
          </Link>
          <Link to={"/blogs"} className="group flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-200 bg-white">
            <MdNotes className="text-xl group-hover:scale-110 transition-transform" /> 
            <span className="font-semibold text-sm tracking-wide">Blogs</span>
          </Link>
          <Link to={"/projects"} className="group flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-200 bg-white">
            <GoProjectRoadmap className="text-xl group-hover:scale-110 transition-transform" /> 
            <span className="font-semibold text-sm tracking-wide">Projects</span>
          </Link>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>

        {/* Copyright & Tech */}
        <div className="text-center z-10">
          <p className="text-sm text-slate-500 font-medium mb-3">
            © {new Date().getFullYear()} Prashanth. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium tracking-widest uppercase">
            Built with 
            <span className="text-red-500 animate-pulse text-sm">❤️</span> 
            using MERN
          </p>
        </div>
      </div>
    </footer>
  );
}

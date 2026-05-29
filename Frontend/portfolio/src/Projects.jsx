import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blogs`)
      .then((res) => {
        setProjects(res.data.projects || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // ---------- Skeleton ----------
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 mt-12 mb-24">
        <div className="h-10 w-40 bg-base-300 rounded mb-10 animate-pulse" />
        <div className="animate-pulse rounded-2xl border-2 border-base-300 overflow-hidden mb-12">
          <div className="h-72 bg-base-300 w-full" />
          <div className="p-6 space-y-3">
            <div className="h-7 bg-base-300 rounded w-2/3" />
            <div className="h-4 bg-base-300 rounded w-full" />
            <div className="h-4 bg-base-300 rounded w-4/5" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border-2 border-base-300 overflow-hidden">
              <div className="h-44 bg-base-300" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-base-300 rounded w-3/4" />
                <div className="h-4 bg-base-300 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- Empty ----------
  if (projects.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 mt-12 mb-24">
        <h1 className="font-unbounded text-4xl font-bold mb-12">&lt;Projects /&gt;</h1>
        <div className="flex flex-col items-center justify-center h-60 gap-3 border-2 border-dashed border-base-300 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
          </svg>
          <p className="text-lg opacity-40 font-semibold">No projects yet</p>
        </div>
      </div>
    );
  }

  const featured = projects[projects.length - 1];

  return (
    <div className="max-w-5xl mx-auto px-6 mt-12 mb-24">

      {/* Page heading */}
      <h1 className="font-unbounded text-4xl font-bold mb-2">&lt;Projects /&gt;</h1>
      <p className="text-sm opacity-40 mb-10">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>

      {/* ── Featured project ── */}
      <Link to={`/projects/post/${featured._id}`} className="group block mb-14">
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-950 transition-shadow duration-300 hover:shadow-xl">

          <div className="overflow-hidden h-64 md:h-80">
            <CoverImage
              src={featured.imglink}
              alt={featured.title}
              index={projects.length}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block border border-white/40 rounded-full text-[10px] font-unbounded tracking-widest uppercase px-3 py-1 mb-3 backdrop-blur-sm bg-white/10">
              Latest
            </span>
            <h2 className="font-unbounded text-2xl md:text-3xl font-bold leading-snug mb-2 drop-shadow">
              {featured.title}
            </h2>
            <p className="text-sm text-white/70 line-clamp-2 leading-relaxed max-w-2xl">
              {featured.shortdescription}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/60 font-semibold group-hover:text-white transition-colors">
              View project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* ── All projects grid ── */}
      {projects.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-base-300" />
            <span className="text-xs font-unbounded opacity-30 tracking-widest uppercase">All Projects</span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <Link
                key={project._id}
                to={`/projects/post/${project._id}`}
                className="group block"
              >
                <div className="border-2 border-slate-950 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">

                  {/* image */}
                  <div className="overflow-hidden h-44 flex-shrink-0">
                    <CoverImage
                      src={project.imglink}
                      alt={project.title}
                      index={idx + 1}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* body */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-unbounded text-sm font-bold leading-snug mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs opacity-55 leading-relaxed line-clamp-3 flex-1">
                      {project.shortdescription}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-40 group-hover:opacity-100 transition-opacity">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
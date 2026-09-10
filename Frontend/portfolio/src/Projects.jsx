import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";
import { FaArrowRight, FaFolderOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 7; // 1 featured + 6 grid

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/projects?page=${currentPage}&limit=${LIMIT}`)
      .then((res) => {
        setProjects(res.data.projects || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
        setTotal(res.data.total || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [currentPage]);

  // ---------- Skeleton ----------
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 animate-fade-in-up font-inter">
        {/* Header Skeleton */}
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3 animate-pulse" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-8 animate-pulse" />

        {/* Featured Skeleton */}
        <div className="animate-pulse rounded-2xl border-2 border-slate-950 overflow-hidden mb-12 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="h-64 md:h-96 bg-slate-200 dark:bg-slate-800 w-full" />

          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border-2 border-slate-950 overflow-hidden bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="h-44 bg-slate-200 dark:bg-slate-800" />

              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-full mt-4" />
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
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 font-inter">
        <h1 className="font-unbounded text-3xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-slate-100">
          &lt;Projects /&gt;
        </h1>

        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-10">
          0 projects
        </p>

        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-950 rounded-2xl bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4 border-2 border-slate-950">
            <FaFolderOpen className="text-2xl" />
          </div>

          <h3 className="font-unbounded font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">
            No Projects Yet
          </h3>

          <p className="text-xs text-slate-500 max-w-sm">
            Check back soon for new projects and technical work!
          </p>
        </div>
      </div>
    );
  }

  const featured = projects[projects.length - 1];
  const gridProjects = projects.filter(
    (project) => project._id !== featured._id
  );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12 mb-24 animate-fade-in-up font-inter">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-unbounded text-3xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-slate-100">
            &lt;Projects /&gt;
          </h1>

          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Explore my projects and technical work ({total} total)
          </p>
        </div>
      </div>

      {/* ── Featured Project ── */}
      {featured && currentPage === 1 && (
        <Link
          to={`/projects/post/${featured._id}`}
          className="group block mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[10px_10px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1 transition-all duration-300">
            <div className="overflow-hidden h-64 md:h-96 relative">
              <CoverImage
                src={featured.imglink}
                alt={featured.title}
                index={projects.length}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-unbounded uppercase font-bold tracking-wider bg-blue-600 text-white border border-blue-400 mb-3 shadow-sm">
                  ✨ Featured Project
                </span>

                <h2 className="font-unbounded text-xl md:text-3xl font-bold leading-tight mb-2 text-white drop-shadow-sm group-hover:text-blue-300 transition-colors">
                  {featured.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-200 line-clamp-2 leading-relaxed max-w-3xl mb-4 font-medium">
                  {featured.shortdescription}
                </p>

                <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-blue-400 group-hover:text-white transition-colors">
                  <span>View Project</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ── All Projects Grid ── */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-unbounded text-base md:text-xl font-bold text-slate-900 dark:text-slate-100">
            All Projects
          </h2>

          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {gridProjects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-950 rounded-2xl bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-sm font-semibold text-slate-500">
              No additional projects available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridProjects.map((project, idx) => (
              <Link
                key={project._id}
                to={`/projects/post/${project._id}`}
                className="group block"
              >
                <div className="border-2 border-slate-950 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[7px_7px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-44 border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-800">
                    <CoverImage
                      src={project.imglink}
                      alt={project.title}
                      index={idx + 1}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-slate-950/90 text-white font-unbounded text-[10px] font-bold border border-white/20 backdrop-blur-xs">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-unbounded font-bold text-sm md:text-base text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {project.shortdescription}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span>View Project</span>

                      <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:hover:translate-y-0"
          >
            <FaChevronLeft className="text-xs" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-9 h-9 rounded-xl border-2 border-slate-950 font-unbounded text-xs font-bold transition-all duration-200 ${
                  pg === currentPage
                    ? "bg-slate-950 text-white shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                    : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-950 bg-white dark:bg-slate-900 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[5px_5px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:hover:translate-y-0"
          >
            <span>Next</span>
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}
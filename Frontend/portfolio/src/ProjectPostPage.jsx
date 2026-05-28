import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProjectPostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/project/post/${id}`)
      .then((res) => {
        setPostInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  // Reading progress bar
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

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 mt-12 mb-24 animate-pulse">
        <div className="h-4 w-24 bg-base-300 rounded mb-8"></div>
        <div className="h-10 bg-base-300 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-base-300 rounded w-1/2 mb-8"></div>
        <div className="h-72 bg-base-300 rounded-2xl mb-10"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 bg-base-300 rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`}></div>
          ))}
        </div>
      </div>
    );
  }

  if (!postInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-xl font-semibold opacity-40">Project not found</p>
        <Link to="/projects">
          <button className="btn btn-sm btn-outline">← Back to Projects</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-black z-50 transition-all duration-100"
        style={{ width: `${readProgress}%` }}
      />

      <article className="max-w-3xl mx-auto px-6 mt-10 mb-28">

        {/* Back button */}
        <Link to="/projects">
          <button className="btn btn-ghost btn-sm gap-1 mb-8 -ml-2 text-sm opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </button>
        </Link>

        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-950 rounded-full px-3 py-1 text-xs font-unbounded tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
            Project
          </span>
        </div>

        {/* Title */}
        <h1 className="font-unbounded text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
          {postInfo.title}
        </h1>

        {/* Accent bar */}
        <div className="w-12 h-[3px] bg-black rounded-full mb-8" />

        {/* Hero image */}
        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-slate-950 mb-10 group">
          <img
            src={postInfo.imglink}
            alt={postInfo.title}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
        </div>

        {/* Short description */}
        {postInfo.shortdescription && (
          <p className="text-lg md:text-xl leading-relaxed opacity-70 border-l-4 border-black pl-5 mb-10 italic font-inter">
            {postInfo.shortdescription}
          </p>
        )}

        {/* Separator */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs font-unbounded opacity-30 tracking-widest uppercase">Overview</span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Project content */}
        <div
          className="prose max-w-none text-base leading-8"
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />

        {/* CTA — GitHub / Website link */}
        {postInfo.websitelink && (
          <div className="mt-12 p-6 border-2 border-slate-950 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-unbounded text-sm font-semibold mb-1">View Source</p>
              <p className="text-sm opacity-50">Check out the repository or live demo</p>
            </div>
            <a href={postInfo.websitelink} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-sm gap-2 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.26.793-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub Repository
              </button>
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-unbounded text-sm opacity-40 tracking-wide">&lt;Prashanth. /&gt;</p>
          <Link to="/projects">
            <button className="btn btn-sm btn-outline gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              More Projects
            </button>
          </Link>
        </div>

      </article>
    </>
  );
}

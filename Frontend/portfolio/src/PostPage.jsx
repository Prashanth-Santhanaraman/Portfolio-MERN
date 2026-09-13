import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CoverImage from "./components/CoverImage";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/blog/post/${id}`)
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
        <div className="h-4 w-20 bg-base-300 rounded mb-8"></div>
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
        <p className="text-xl font-semibold opacity-40">Blog post not found</p>
        <Link to="/blogs"><button className="btn btn-sm btn-outline">← Back to Blogs</button></Link>
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
        <Link to="/blogs">
          <button className="btn btn-ghost btn-sm gap-1 mb-8 -ml-2 text-sm opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Blogs
          </button>
        </Link>

        {/* Title */}
        <h1 className="font-unbounded text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
          {postInfo.title}
        </h1>

        {/* Divider */}
        <div className="w-12 h-[3px] bg-black rounded-full mb-8" />

        {/* Hero image */}
        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-slate-950 mb-10 group">
          <CoverImage
            src={postInfo.imglink}
            alt={postInfo.title}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
        </div>

        {/* Short description / intro */}
        {postInfo.shortdescription && (
          <p className="text-lg md:text-xl leading-relaxed opacity-70 border-l-4 border-black pl-5 mb-10 italic font-inter">
            {postInfo.shortdescription}
          </p>
        )}

        {/* Separator */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs font-unbounded opacity-30 tracking-widest uppercase">Article</span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Blog content */}
        <div
          className="prose max-w-none text-base leading-8"
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-unbounded text-sm opacity-40 tracking-wide">&lt;Prashanth. /&gt;</p>
          <Link to="/blogs">
            <button className="btn btn-sm btn-outline gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              More Blogs
            </button>
          </Link>
        </div>

      </article>
    </>
  );
}

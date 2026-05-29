import { useState } from "react";

export default function CoverImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (name) => {
    if (!name) return "✨";
    return name.substring(0, 2).toUpperCase();
  };

  const getGradient = (name) => {
    const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-400 to-cyan-400",
  "from-rose-400 to-red-500",
  "from-amber-400 to-orange-500",
  "from-indigo-500 to-cyan-400",
];
    if (!name) return gradients[0];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  const showFallback = !src || hasError;

  if (showFallback) {
    return (
      <div
        className={`bg-gradient-to-br ${getGradient(alt)} flex items-center justify-center relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        <div className="z-10 flex items-center gap-2 md:gap-3 select-none drop-shadow-lg px-4 text-center">
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-slate-950 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span
            className="font-unbounded font-bold text-white tracking-wide truncate"
            style={{ fontSize: "clamp(1rem, 4vw, 1.8rem)" }}
          >
            Prashanth<span className="opacity-70">.</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

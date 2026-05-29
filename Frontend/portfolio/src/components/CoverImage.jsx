import { useState } from "react";

export default function CoverImage({ src, alt, className, index }) {
  const [hasError, setHasError] = useState(false);

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
    const indexHash = name.length % gradients.length;
    return gradients[indexHash];
  };

  const showFallback = !src || hasError;
  const displayIndex = index ? String(index).padStart(2, "0") : "01";

  if (showFallback) {
    return (
      <div
        className={`bg-gradient-to-br ${getGradient(alt)} flex flex-col items-center justify-between relative overflow-hidden ${className} p-4`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        
        {/* Spacer for flex-between */}
        <div></div>

        {/* Center Number */}
        <span
          className="z-10 font-unbounded font-black text-white/90 drop-shadow-xl select-none tracking-tighter"
          style={{ fontSize: "clamp(4rem, 15vw, 8rem)", lineHeight: 1 }}
        >
          {displayIndex}
        </span>

        {/* Bottom Logo (Extra Small) */}
        <div className="z-10 flex items-center gap-1 select-none drop-shadow-sm pb-1 opacity-70">
          <div className="flex-shrink-0 flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded bg-slate-950 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span
            className="font-unbounded font-bold text-white tracking-wider"
            style={{ fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)" }}
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

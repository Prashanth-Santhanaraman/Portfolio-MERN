import { useState } from "react";

export default function CoverImage({ src, alt, className, index }) {
  const [hasError, setHasError] = useState(false);

  const palettes = [
    {
      bg: "from-violet-600 via-indigo-600 to-purple-800",
      accent: "text-violet-200/80",
      glow1: "bg-fuchsia-400/30",
      glow2: "bg-indigo-300/20",
      ring: "border-purple-300/20",
    },
    {
      bg: "from-cyan-500 via-blue-600 to-indigo-900",
      accent: "text-cyan-200/80",
      glow1: "bg-cyan-300/30",
      glow2: "bg-blue-400/20",
      ring: "border-cyan-300/20",
    },
    {
      bg: "from-emerald-500 via-teal-600 to-slate-900",
      accent: "text-emerald-200/80",
      glow1: "bg-emerald-300/30",
      glow2: "bg-teal-300/20",
      ring: "border-emerald-300/20",
    },
    {
      bg: "from-rose-500 via-pink-600 to-amber-700",
      accent: "text-rose-200/80",
      glow1: "bg-amber-300/30",
      glow2: "bg-rose-400/20",
      ring: "border-rose-300/20",
    },
    {
      bg: "from-amber-500 via-orange-600 to-red-800",
      accent: "text-amber-200/80",
      glow1: "bg-yellow-300/30",
      glow2: "bg-orange-400/20",
      ring: "border-amber-300/20",
    },
    {
      bg: "from-fuchsia-600 via-purple-700 to-blue-900",
      accent: "text-fuchsia-200/80",
      glow1: "bg-pink-400/30",
      glow2: "bg-purple-300/20",
      ring: "border-pink-300/20",
    },
  ];

  const getPalette = (name, idx) => {
    let hash = 0;
    if (typeof idx === "number" && !isNaN(idx)) {
      hash = Math.abs(idx);
    } else if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0;
      }
      hash = Math.abs(hash);
    }
    return palettes[hash % palettes.length];
  };

  const showFallback = !src || hasError;
  const numVal = typeof index === "number" ? index : Number(index);
  const hasValidNumber = !isNaN(numVal) && numVal > 0;
  // displayIndex: padded number if we have one, otherwise null (hide the big number)
  const displayIndex = hasValidNumber ? String(numVal).padStart(2, "0") : null;
  // For palette: use number if valid, otherwise fall back to alt (title) string hash
  const palette = getPalette(alt, hasValidNumber ? numVal : undefined);

  if (showFallback) {
    return (
      <div
        className={`bg-gradient-to-br ${palette.bg} flex flex-col items-center justify-between relative overflow-hidden ${className} p-5 select-none`}
      >
        {/* Subtle decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Ambient glowing radial lights */}
        <div className={`absolute -top-12 -left-12 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl pointer-events-none ${palette.glow1}`} />
        <div className={`absolute -bottom-12 -right-12 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl pointer-events-none ${palette.glow2}`} />

        {/* Diagonal architectural accent line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[140%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[-25deg]" />
        </div>

        {/* Top Header Tag */}
        <div className="z-10 w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/15 text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="font-unbounded text-[10px] md:text-xs font-semibold tracking-widest uppercase">
              {displayIndex !== null ? `Project #${displayIndex}` : "Project"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 opacity-60 text-white font-mono text-[10px]">
            <span>&lt;/&gt;</span>
            <span className="tracking-wider">CODE &amp; DESIGN</span>
          </div>
        </div>

        {/* Center Hero Graphic: Big index number with layered glow */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
          {/* Subtle concentric decorative ring */}
          <div className={`absolute w-32 h-32 md:w-48 md:h-48 rounded-full border border-dashed ${palette.ring} animate-spin-slow pointer-events-none`} style={{ animationDuration: "25s" }} />

          {displayIndex !== null ? (
            <span
              className="font-unbounded font-black text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] tracking-tighter"
              style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)", lineHeight: 1 }}
            >
              {displayIndex}
            </span>
          ) : (
            /* No number yet — show a stylised code/bracket decoration instead */
            <span
              className={`font-mono font-black ${palette.accent} drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] select-none`}
              style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              {"{ }"}
            </span>
          )}
          {alt && (
            <span className="mt-1 font-unbounded text-xs md:text-sm font-semibold tracking-wider text-white/80 max-w-xs md:max-w-md truncate drop-shadow px-2 text-center">
              {alt}
            </span>
          )}
        </div>

        {/* Bottom Logo & Branding */}
        <div className="z-10 w-full flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 drop-shadow-sm opacity-80">
            <div className="flex-shrink-0 flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded bg-slate-950 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span
              className="font-unbounded font-bold text-white tracking-wider text-[10px] md:text-xs"
            >
              Prashanth<span className="opacity-70">.</span>
            </span>
          </div>

          <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
            PORTFOLIO
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

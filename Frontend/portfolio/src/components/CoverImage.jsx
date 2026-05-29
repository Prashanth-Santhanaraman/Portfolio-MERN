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
        <span
          className="font-unbounded font-bold text-white/80 drop-shadow-md z-10"
          style={{ fontSize: "clamp(2rem, 10vw, 4rem)" }}
        >
          {getInitials(alt)}
        </span>
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

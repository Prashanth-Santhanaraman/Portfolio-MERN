import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuDownload,
  LuHouse,
  LuFolderGit2,
  LuBookOpen,
  LuCode,
  LuSun,
  LuMoon,
  LuMenu,
  LuX,
} from "react-icons/lu";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  // Apply theme to html root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Scroll detection for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: LuHouse, exact: true },
    { name: "Projects", path: "/projects", icon: LuFolderGit2 },
    { name: "Blogs", path: "/blogs", icon: LuBookOpen },
  ];

  const isLinkActive = (link) => {
    if (link.exact) return currentPath === link.path;
    return currentPath.startsWith(link.path);
  };

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 md:pt-4 transition-all duration-300">
      <nav
        className={`max-w-5xl mx-auto rounded-2xl md:rounded-full backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 py-2 px-3.5 sm:px-5"
            : "bg-white/75 dark:bg-slate-900/75 border border-slate-200/70 dark:border-slate-800/70 shadow-sm py-2.5 px-4 sm:px-6"
        }`}
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between gap-2">
          {/* ── Brand Logo & Availability Pill ── */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Prashanth Portfolio Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-500/35">
                <LuCode className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900"></span>
              </div>

              <div className="flex items-baseline">
                <span className="font-unbounded font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Prashanth
                </span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  .
                </span>
              </div>
            </Link>

            {/* Live Availability Badge (Desktop) */}
            {/* <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for hire</span>
            </div> */}
          </div>

          {/* ── Center Nav: Desktop Segmented Island ── */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full border border-slate-200/60 dark:border-slate-700/60">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                        active
                          ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <Icon className={`text-sm ${active ? "text-blue-600 dark:text-blue-400" : "opacity-70"}`} />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right Actions: Theme Toggle, Resume & Mobile Menu ── */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 transition-all duration-200 focus:outline-none"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <LuSun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <LuMoon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Resume Button (Desktop & Tablet) */}
            <a
              href="/Profile.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-slate-950 hover:bg-blue-600 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400 dark:hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <LuDownload className="text-sm" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown / Expandable Panel ── */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-2 border-t border-slate-200/70 dark:border-slate-800/70 space-y-2">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`text-base ${active ? "text-blue-600 dark:text-blue-400" : "opacity-60"}`} />
                        <span>{link.name}</span>
                      </div>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/Profile.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-950 text-white hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-sm"
              >
                <LuDownload className="text-sm" />
                <span>Download Resume</span>
              </a>

              {/* <div className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Open for new opportunities</span>
              </div> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

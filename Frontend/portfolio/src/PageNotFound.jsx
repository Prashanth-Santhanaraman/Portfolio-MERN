import { Link } from "react-router-dom";
import { TbHomeFilled } from "react-icons/tb";

export default function PageNotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 relative overflow-hidden py-20">
      {/* Subtle animated background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-100/60 via-purple-100/60 to-pink-100/60 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>

      <div className="text-center z-10 max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-10 sm:p-16 rounded-3xl border border-white/50 shadow-xl">
        <div className="relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 via-slate-500 to-slate-300 drop-shadow-md mb-2">
            404
          </h1>
          <div className="absolute -top-4 -right-8 text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
            🚀
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 font-unbounded mt-4">
          Lost in Space?
        </h2>
        
        <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-medium">
          The page you're looking for has drifted off into the digital cosmos. 
          It might have been removed, renamed, or perhaps it never existed at all.
        </p>

        <Link 
          to="/" 
          className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-full hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <TbHomeFilled className="text-xl group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-wider uppercase text-sm">Return Home</span>
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaUserShield, 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash, 
  FaSignInAlt,
  FaArrowLeft
} from "react-icons/fa";
import { useAdminAuth } from "./context/AdminAuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = location.state?.from?.pathname || "/admin-v2";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      toast.success("Welcome back! Authentication successful.");
      navigate(destination, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-[75vh] flex items-center justify-center px-4 my-12 font-inter animate-fade-in-up">
        <div className="w-full max-w-md">
          
          {/* Back Home link */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-6 px-1"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Portfolio</span>
          </button>

          {/* Login Card */}
          <div className="rounded-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-7 md:p-9 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-2 border-slate-950 flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <FaUserShield className="text-2xl" />
              </div>
              <h1 className="font-unbounded text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                Admin Portal
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Protected area. Sign in with your administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs md:text-sm rounded-xl border-2 border-slate-950 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs md:text-sm rounded-xl border-2 border-slate-950 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-slate-950 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaSignInAlt className="text-xs" />
                      <span>Authenticate & Enter</span>
                    </>
                  )}
                </button>
              </div>

            </form>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400">
                🔒 Protected by bcrypt password encryption & JWT sessions
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


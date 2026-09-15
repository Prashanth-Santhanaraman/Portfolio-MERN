import { useNavigate } from "react-router-dom";
import { 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaBlog, 
  FaProjectDiagram, 
  FaStar,
  FaShieldAlt
} from "react-icons/fa";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 my-10 mb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="font-unbounded text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <span className="dark:text-blue-400">&lt;</span>
            Admin Dashboard
            <span className="dark:text-blue-400">/&gt;</span>
          </h1>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Creation Actions */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Create Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Add Blog */}
            <div
              onClick={() => navigate("/admin/addblog")}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <FaBlog className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Add Blog Post
                  </h3>
                  <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 mt-0.5">
                    Publish a new article to your blog
                  </p>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-emerald-200/60 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                <FaPlus className="text-xs" />
              </span>
            </div>

            {/* Add Project */}
            <div
              onClick={() => navigate("/admin/addproject")}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/70 dark:bg-blue-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <FaProjectDiagram className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-blue-950 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Add New Project
                  </h3>
                  <p className="text-xs text-blue-700/70 dark:text-blue-300/70 mt-0.5">
                    Showcase a new project in your portfolio
                  </p>
                </div>
              </div>
              <span className="p-2.5 rounded-xl bg-blue-200/60 dark:bg-blue-900 text-blue-800 dark:text-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                <FaPlus className="text-xs" />
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Management & Editing */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Edit & Feature Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Edit Blog */}
            <div
              onClick={() => navigate("/admin/editblog")}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <FaEdit className="text-lg" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-200/70 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                  Update
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-amber-950 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Edit Blog
                </h3>
                <p className="text-xs text-amber-700/70 dark:text-amber-300/70 mt-1">
                  Modify published articles
                </p>
              </div>
            </div>

            {/* Edit Project */}
            <div
              onClick={() => navigate("/admin/editproject")}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-orange-200 dark:border-orange-800/60 bg-orange-50/70 dark:bg-orange-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  <FaEdit className="text-lg" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-orange-200/70 dark:bg-orange-900/80 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-700">
                  Update
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-orange-950 dark:text-orange-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Edit Project
                </h3>
                <p className="text-xs text-orange-700/70 dark:text-orange-300/70 mt-1">
                  Update project descriptions and links
                </p>
              </div>
            </div>

            {/* Edit Top 3 */}
            <div
              onClick={() => navigate("/admin/edittop3projects")}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  <FaStar className="text-lg" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-200/70 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">
                  Featured
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-indigo-950 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Featured Projects
                </h3>
                <p className="text-xs text-indigo-700/70 dark:text-indigo-300/70 mt-1">
                  Reorder your Top 3 highlighted items
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Destructive Actions */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500/80 mb-3 px-1">
            Danger Zone
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delete Blog */}
            <div
              onClick={() => navigate("/admin/deleteblog")}
              className="group relative flex items-center justify-between p-4 md:p-5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-100/70 dark:bg-rose-950/40 cursor-pointer transition-all duration-200 hover:bg-rose-600 hover:border-rose-600 hover:text-white"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-rose-200/80 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 group-hover:bg-rose-700 group-hover:text-white transition-colors">
                  <FaTrashAlt className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-rose-950 dark:text-rose-100 group-hover:text-white transition-colors">
                    Delete Blog
                  </h3>
                  <p className="text-xs text-rose-700/80 dark:text-rose-300/80 group-hover:text-rose-100 transition-colors">
                    Remove posts permanently
                  </p>
                </div>
              </div>
            </div>

            {/* Delete Project */}
            <div
              onClick={() => navigate("/admin/deleteproject")}
              className="group relative flex items-center justify-between p-4 md:p-5 rounded-2xl border border-red-300 dark:border-red-900 bg-red-100/70 dark:bg-red-950/40 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-red-200/80 dark:bg-red-900/60 text-red-700 dark:text-red-300 group-hover:bg-red-700 group-hover:text-white transition-colors">
                  <FaTrashAlt className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-red-950 dark:text-red-100 group-hover:text-white transition-colors">
                    Delete Project
                  </h3>
                  <p className="text-xs text-red-700/80 dark:text-red-300/80 group-hover:text-red-100 transition-colors">
                    Remove projects permanently
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
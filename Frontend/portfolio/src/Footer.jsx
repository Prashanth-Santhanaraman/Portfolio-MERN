import { TbHomeFilled } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="bg-slate-50 mt-6 border-t border-slate-400">
        <h1 className="text-2xl text-center p-4 font-unbounded">Prashanth.</h1>
        <div className="flex justify-center">
          <Link to={"/"}>
            <button className="btn btn-outline btn-sm mr-2"><TbHomeFilled /> Home</button>
          </Link>
          <Link to={"/blogs"}>
            <button className="btn btn-outline btn-sm mr-2"><MdNotes /> Blogs</button>
          </Link>
          <Link to={"/projects"}>
            <button className="btn btn-outline btn-sm"><GoProjectRoadmap /> Projects</button>
          </Link>
        </div>
        <h1 className="text-xs text-center mt-4 pb-2 font-light">
          Built with ❤️ using MERN
        </h1>
      </div>
    </>
  );
}

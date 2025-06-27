import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { TbHomeFilled } from "react-icons/tb";
import { MdNotes } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="p-[20px] border-b border-black">
        <nav>
            <ul className="flex flex-row gap-4 justify-center p-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">Blogs</a></li>
                <li><a href="#">Projects</a></li>
            </ul>
        </nav>
    </div> */}
      <div className="navbar bg-base-100 border-b-[2px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-96 p-2 shadow"
            >
              <li>
                <Link to={"/"}><TbHomeFilled /> Home</Link>
              </li>
              <li>
                <Link to={"/blogs"}><MdNotes /> Blogs</Link>
              </li>
              <li>
                <Link to={"/projects"}><GoProjectRoadmap /> Projects</Link>
              </li>
            </ul>
          </div>
          <Link
            className="btn btn-ghost btn-sm text-lg font-unbounded font-medium"
            to={"/"}
          >
            &lt;Prashanth. /&gt;
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li>
              <Link to={"/projects"}>Projects</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end m-2">
          {/* <label className="grid cursor-pointer place-items-center">
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label> */}
          <div>
            <a href="../Profile (1).pdf" target="_blank"><button className="btn btn-md"> <LuDownload /> Resume</button></a>
          </div>
        </div>
      </div>
    </>
  );
}

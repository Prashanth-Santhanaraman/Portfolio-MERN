import { Link } from "react-router-dom";
import profileImg from "./images/prashanth_1.jpg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";
import { TbHomeFilled } from "react-icons/tb";
export default function Home() {
  return (
    <>
      <div className="flex flex-row flex-wrap-reverse mx-10 md:mx-36 lg:mx-96 justify-between mt-12 items-center">
        <div className="flex flex-col">
          <h1 className="font-light text-2xl md:text-4xl lg:text-4xl font-unbounded">
            Hello ! 👋
          </h1>
          <h1 className="font-light text-3xl md:text-4xl lg:text-4xl font-unbounded">
            I am{" "}
            <span className="font-normal text-3xl md:text-4xl lg:text-4xl font-unbounded">
              Prashanth
            </span>{" "}
            !
          </h1>
          <p className="text-xs mt-2">
            Final year at{" "}
            <a
              href="https://www.rajalakshmi.org/"
              className="text-sky-600 font-medium"
            >
              Rajalakshmi Engineering College
            </a>
          </p>
          <div className="flex mt-3">
            <a
              href="https://www.linkedin.com/in/prashanth-santhanaraman/"
              target="_blank"
            >
              <button className="btn btn-sm mr-1">
                <p className="text-xl">
                  <FaLinkedin />
                </p>
              </button>
            </a>
            <a
              href="https://github.com/prashanth-santhanaraman"
              target="_blank"
            >
              <button className="btn btn-sm mr-1">
                <p className="text-xl">
                  <FaGithub />
                </p>
              </button>
            </a>
            <a
              href="https://www.geeksforgeeks.org/user/prashanth_santhanaraman/"
              target="_blank"
            >
              <button className="btn btn-sm mr-1">
                <p className="text-xl">
                  <SiGeeksforgeeks />
                </p>
              </button>
            </a>
          </div>
        </div>
        <div className="w-20 md:w-40 lg:md-40 mb-4 md:m-0 lg:m-0 rounded-full">
          <img
            src={profileImg}
            className="rounded-lg border border-gray-700"
            alt="Prashanth Profile Pic"
          />
        </div>
      </div>
      <div className="flex flex-row mx-10 md:mx-36 lg:mx-96 justify-around mt-10 items-center font-inter font-normal text-pretty">
        <p className="text-sm text-balance lg:text-base">
          I'm Prashanth, a web developer with a strong focus on the MERN stack.
          I enjoy building scalable and user-friendly web applications,
          leveraging technologies like React, Node.js, MongoDB, and Redux. My
          projects range from personal tools to full-fledged applications,
          emphasizing performance and clean UI/UX. Currently, I work as a
          technical member at Elite club, where I collaborate on innovative
          solutions. I’m always eager to explore new technologies, contribute to
          open-source projects, and improve my development skills. Let’s connect
          and build something amazing!
        </p>
      </div>
      <div className="mx-10 md:mx-36 lg:mx-96 justify-around mt-8 md:mt-12 lg:mt-12 items-center">
        <h2 className="text-left text-xl font-bold mb-4 md:mb-2 lg:md-2 font-unbounded">
          &lt;Top 3 Projects /&gt;
        </h2>

        <div className="flex flex-wrap flex-row justify-between">
          {/* <div>
            <div className="bg-slate-300 p-2 rounded-lg">
              <p className="text-sm">afddfasdasdasdasdasdasd efdgwe</p>

              <button className="btn btn-sm mt-2">View</button>
            </div>
          </div> */}
          <div className="flex flex-row flex-wrap gap-2">
            <div className="border border-slate-950 p-4 rounded-md md:w-60 lg:w-60 mb-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg?semt=ais_hybrid"
                  alt=""
                  srcset=""
                  className="h-40 md:w-60 lg:w-60  rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">Notifye</h3>
              <p className="text-sm mt-2">
                Notifye is a simple and user-friendly note-taking app that helps
                you create, organize, and manage your notes easily. It features
                secure authentication and responsive design
              </p>
              <a
                target="_blank"
                href="https://github.com/Prashanth-Santhanaraman/Notifye"
              >
                <button className="btn btn-sm btn-outline btn-block mt-5">
                  View
                </button>
              </a>
            </div>
            <div className="border border-slate-950 p-4 rounded-md md:w-60 lg:w-60 mb-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg?semt=ais_hybrid"
                  alt=""
                  srcset=""
                  className="h-40 md:w-60 lg:w-60 rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">NPTEL Calculator</h3>
              <p className="text-sm mt-2">
                NPTEL Internal Marks Calculator: Calculate internal marks based
                on course duration and assignment scores.
              </p>
              <a
                target="_blank"
                href="https://github.com/Prashanth-Santhanaraman/NptelAssignmentCalculator"
              >
                <button className="btn btn-sm btn-outline btn-block mt-5">
                  View
                </button>
              </a>
            </div>

            <div className="border border-slate-950 p-4 rounded-md md:w-60 lg:w-60 mb-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg?semt=ais_hybrid"
                  alt=""
                  srcset=""
                  className="h-40 md:w-60 lg:w-60 rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">PrintEase</h3>
              <p className="text-sm mt-2">
                PrintEase is an internal document printing system where users
                can upload PDFs, set print preferences, and submit print
                requests. Admins can manage and track all print orders securely
                within the organization.
              </p>

              <a target="_blank" href="http://">
                <button className="btn btn-sm btn-outline btn-block mt-5">
                  View
                </button>
              </a>
            </div>
          </div>
          {/* <div>
            <div className="card card-compact bg-base-100 w-60 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">NPTEL Assignment Calculator</h2>
                <p>
                  NPTEL Internal Marks Calculator: Calculate internal marks
                  based on course duration and assignment scores.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-block btn-sm px-10 mt-4">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div>
            <div className="card card-compact bg-base-100 w-60 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-block btn-sm px-10 mt-4">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex justify-center">
          <Link to={"/projects"}>
            <button className="btn btn-outline btn-sm mt-4 px-10 justify-center">
              View All
            </button>
          </Link>
        </div>

        {/* <div className="carousel rounded-box">
          <div className="carousel-item">
            <div className="card card-compact bg-base-100 w-60 shadow-xl m-2">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card card-compact bg-base-100 w-60 shadow-xl m-2">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card card-compact bg-base-100 w-60 shadow-xl m-2">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mx-10 md:mx-36 lg:mx-96 justify-around mt-10 items-center">
        <h2 className="text-xl font-bold font-unbounded">&lt;Skills /&gt;</h2>
        <div className="mt-5 ml-3">
          <p className="">
            ✔ Frontend: HTML, CSS, JavaScript, React, EJS, Tailwind
          </p>
          <p>✔ Backend: Python, Node JS, Express JS</p>
          <p>✔ Databases: MongoDB, MySQL</p>
          <p>✔ Version Control: Git, GitHub</p>
        </div>
      </div>

      <div className="mx-10 md:mx-36 lg:mx-96 justify-around mt-10 items-center">
        <h2 className="text-xl font-bold font-unbounded">
          &lt;Certifications /&gt;
        </h2>
        <div className="mt-5 ml-3">
          <ul className="list-decimal ml-3">
            <li>Responsive Web Design, FreeCodeCamp.</li>
            <li>Backend Development and APIs, FreeCodeCamp.</li>
            <li>Python (Basic), HackerRank.</li>
            <li>CSS (Basic), HackerRank.</li>
            <li>Mastering Figma: Beginner to Expert UI/UX Design, Guvi.</li>
            <li>Introduction to Internet of Things, NPTEL.</li>
            <li>The Joy of Computing using Python, NPTEL.</li>
          </ul>
        </div>
      </div>

      <div className="mx-10 md:mx-36 lg:mx-96 justify-around mt-10 items-center">
        <h2 className="text-xl font-bold font-unbounded">
          &lt;Get in Touch /&gt;
        </h2>
        <div className="mt-5 ml-3 flex flex-row">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/prashanth-santhanaraman/"
          >
            <button className="btn btn-outline mr-2">
              <FaLinkedin /> Linkedin
            </button>
          </a>
          <a target="_blank" href="https://github.com/prashanth-santhanaraman">
            <button className="btn btn-outline">
              <FaGithub /> Github
            </button>
          </a>
        </div>
      </div>

      {/* <div className="bg-slate-50 mt-6 border-t border-slate-400">
        <h1 className="text-2xl text-center p-4 font-unbounded">Prashanth.</h1>
        <div className="flex justify-center">
          <a href="/home"><button className="btn btn-outline btn-sm mr-2">Home</button></a>
          <a href="/blogs"><button className="btn btn-outline btn-sm mr-2">Blogs</button></a>
          <a href="/projects"><button className="btn btn-outline btn-sm">Projects</button></a>
        </div>
        <h1 className="text-xs text-center mt-4 pb-2 font-light">Built with ❤️ using MERN</h1>
      </div> */}
    </>
  );
}

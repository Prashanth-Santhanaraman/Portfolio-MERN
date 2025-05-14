import { useEffect, useState } from "react";
import axios from "axios";
import imglink from "./images/prashanth_1.jpg";
export default function Projects() {
  const [projectInfo, setProjectInfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/blogs")
      .then((res) => setProjectInfo(res.data[0].projects))
      .catch((err) => console.error(err));
  }, []);
  console.log(projectInfo);
  return (
    <>
      <div className="mx-3 md:mx-36 lg:mx-96 justify-around mt-10 items-center">
        <h1 className="font-unbounded text-center md:text-left lg:text-left text-4xl font-semibold">
          &lt;Projects /&gt;
        </h1>

        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {projectInfo
            ? projectInfo.map((singleProject) => (
                <div
                  key={singleProject._id}
                  className="border-2 border-slate-950 p-4 rounded-md w-56 md:w-60 lg:w-60 mb-2 justify-center md:justify-between lg:justify-between"
                >
                  <img
                    src={singleProject.imglink}
                    alt=""
                    srcset=""
                    className="h-40 w-60 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {singleProject.title}
                  </h3>
                  <p className="text-sm mt-2">
                    {singleProject.shortdescription}
                  </p>
                  <a
                    href={singleProject.websitelink} // External website link
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice
                  >
                    <button className="btn btn-sm btn-outline btn-block mt-5">
                      View
                    </button>
                  </a>
                </div>
              ))
            : ""}
          {/* <div className="border-2 border-slate-950 p-4 rounded-md w-60 mb-2">
            <img
              src={imglink}
              alt=""
              srcset=""
              className="h-40 w-60 rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">Project Title</h3>
            <p className="text-sm mt-2">
              Project description. Project description. Project description.
              Project description.
            </p>
            <button className="btn btn-sm btn-outline btn-block mt-5">
              View
            </button>
          </div> */}

          {/* <div className="border border-slate-950 p-4 rounded-md w-60 mb-2">
            <img
              src={imglink}
              alt=""
              srcset=""
              className="h-40 w-60 rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">Project Title</h3>
            <p className="text-sm mt-2">
              Project description. Project description. Project description.
              Project description.
            </p>
            <button className="btn btn-sm btn-outline btn-block mt-5">
              View
            </button>
          </div> */}

          {/* <div className="border border-slate-950 p-4 rounded-md w-60 mb-2">
            <img
              src={imglink}
              alt=""
              srcset=""
              className="h-40 w-60 rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">Project Title</h3>
            <p className="text-sm mt-2">
              Project description. Project description. Project description.
              Project description.
            </p>
            <button className="btn btn-sm btn-outline btn-block mt-5">
              View
            </button>
          </div> */}

          {/* <div className="border border-slate-950 p-4 rounded-md w-60 mb-2">
            <img
              src={imglink}
              alt=""
              srcset=""
              className="h-40 w-60 rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">Project Title</h3>
            <p className="text-sm mt-2">
              Project description. Project description. Project description.
              Project description.
            </p>
            <button className="btn btn-sm btn-outline btn-block mt-5">
              View
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
export default function Blogs() {
  const [blogss, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/blogs")
      .then((res) => {
        setBlogs(res.data[0].blogs);
        setIsLoading(false)
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(blogss);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-10 md:mx-36 lg:mx-96 justify-around mt-10 items-center">
            <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold">
              &lt;Blogs /&gt;
            </h1>

            <div className="mx-1 flex flex-wrap flex-row justify-center md:justify-between lg:justify-between mt-10">
              {blogss.length === 0 ? (
                <h1>No Blogs Available</h1>
              ) : (
                blogss.map((blog) => (
                  <div
                    key={blog._id}
                    className=" w-48 md:w-60 lg:w-60 border-2 border-slate-950 p-4 rounded-md mb-5"
                  >
                    <img
                      src={blog.imglink}
                      alt=""
                      srcset=""
                      className="h-40 w-60 rounded-lg"
                    />
                    <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                    <p className="text-sm mt-2">{blog.shortdescription}</p>
                    <Link to={`/blogs/post/${blog._id}`}>
                      <button className="btn btn-sm btn-outline btn-block mt-5">
                        View
                      </button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

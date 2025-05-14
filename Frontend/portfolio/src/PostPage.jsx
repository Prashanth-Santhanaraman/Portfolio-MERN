import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    axios
      .get(`http://localhost:4000/blog/post/${id}`)
      .then((res) => setPostInfo(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div className="mx-8 md:mx-36 lg:mx-96 justify-around mt-12">
      <a href="/blogs"><button className="btn btn-sm mb-4">&#8592;</button></a>
        {postInfo ? (
          <>
            <div className="flex justify-center border-2 rounded-lg p-2">
              <img
                src={postInfo.imglink}
                alt={postInfo.title}
                className="w-80"
              />
            </div>
            <h1 className="text-4xl mt-4 font-inter font-bold">{postInfo.title}</h1>
            <p className="mt-4 text-md">{postInfo.description}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

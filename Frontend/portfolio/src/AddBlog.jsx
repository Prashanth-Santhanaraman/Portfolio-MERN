import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function AddBlog() {
  const [showPassword, setShowPassword] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKENDLINK}/newBlog`, {
        title: title,
        shortdescription: shortDescription,
        description: description,
        imglink: imageLink,
        password: password,
      })
      .then((res) => {
        console.log("Successfully added !");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
      });
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col mx-10 md:mx-36 lg:mx-96 justify-between mt-12">
        <div className="flex flex-col">
          <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold">
            &lt;Add Admin Blog /&gt;
          </h1>
        </div>
        <div className="flex items-center justify-center min-h-screen mt-4">
          <div className="border-2 p-6 w-96 rounded-md">
            <h1 className="text-2xl font-bold">Blog Details</h1>
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Short Description</legend>
              <textarea
                className="textarea h-24"
                placeholder="Enter the short description"
                onChange={(e) => setShortDescription(e.target.value)}
                required
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24"
                placeholder="Enter the description"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </fieldset>

            {/* <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Website Link</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the website link"
                onChange={(e) => setWebsiteLink(e.target.value)}
                required
              />
            </fieldset> */}

            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Image Link</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the image link"
                onChange={(e) => setImageLink(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>

            <label className="label mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                onChange={() => setShowPassword(!showPassword)}
              />
              <p className="text-sm text-black">Show Password</p>
            </label>

            <button className="btn btn-block mt-2" onClick={handleSubmit}>
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

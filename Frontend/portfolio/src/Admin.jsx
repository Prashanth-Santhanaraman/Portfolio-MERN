import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mx-10 md:mx-36 lg:mx-96 justify-between mt-12 items-center">
        <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold">
          &lt;Admin /&gt;
        </h1>
        <div className="flex items-center justify-center min-h-screen">
          <button className="btn mr-2" onClick={() => navigate("/admin/addblog")}>Add Blog</button>
          <button className="btn"  onClick={() => navigate("/admin/addproject")}>Add Project</button>
        </div>
      </div>
    </>
  );
}

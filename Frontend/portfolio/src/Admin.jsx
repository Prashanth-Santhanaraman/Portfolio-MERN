import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mx-10 md:mx-36 lg:mx-96 justify-between mt-12 items-center">
        <h1 className="text-center md:text-left font-unbounded text-4xl font-semibold">
          &lt;Admin /&gt;
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 min-h-screen">
          <button className="btn" onClick={() => navigate("/admin/addblog")}>Add Blog</button>
          <button className="btn" onClick={() => navigate("/admin/addproject")}>Add Project</button>
          <button className="btn btn-warning" onClick={() => navigate("/admin/editblog")}>Edit Blog</button>
          <button className="btn btn-error" onClick={() => navigate("/admin/deleteblog")}>Delete Blog</button>
        </div>
      </div>
    </>
  );
}

export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <button className="btn btn-wide">
          <span className="loading loading-spinner"></span>
          Loading
        </button>
      </div>
    </>
  );
}

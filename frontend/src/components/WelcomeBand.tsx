import { useNavigate } from "react-router-dom";

function WelcomeBand() {
  const navigate = useNavigate();

  return (
    <header className="bg-dark text-white py-4 mb-4 w-100">
      <div className="container text-center">
        <h1 className="mb-2">🎭 Entertainment Agency</h1>
        <p className="lead mb-3">Discover, manage, and book top entertainers</p>
        <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-outline-light" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate("/entertainers")}>
            Entertainers
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate("/add")}>
            Add New
          </button>
        </div>
      </div>
    </header>
  );
}

export default WelcomeBand;

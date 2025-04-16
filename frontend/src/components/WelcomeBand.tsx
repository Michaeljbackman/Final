import { Link } from "react-router-dom";

function WelcomeBand() {
  return (
    <>
      <div className="row bg-dark text-white text-center py-4">
        <h1>🎭 Entertainment Agency</h1>
        <p className="lead">Discover, manage, and book top entertainers</p>
      </div>
      <div className="bg-dark text-center py-2 mb-4">
        <Link to="/entertainers" className="btn btn-outline-light me-2">
          Entertainers
        </Link>
        <Link to="/add-entertainer" className="btn btn-outline-light">
          Add New
        </Link>
      </div>
    </>
  );
}

export default WelcomeBand;

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
    style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",           // 👈 Prevent scrollbars
        margin: 0,                    // Remove any margin
        padding: 0,                   // Remove padding
        backgroundColor: "#1e1e1e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h1 className="display-4 mb-3">🎭 Welcome to the Entertainment Agency</h1>
        <p className="lead mb-4">
          Discover talented entertainers and bring magic to your next event.
        </p>
        <button
          className="btn btn-outline-light btn-lg"
          onClick={() => navigate("/entertainers")}
        >
          Browse Entertainers
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

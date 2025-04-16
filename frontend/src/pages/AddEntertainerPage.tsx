import AddEntertainerForm from "../components/AddEntertainerForm";
import WelcomeBand from "../components/WelcomeBand";
import { useNavigate } from "react-router-dom";

const AddEntertainerPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        color: "white",
        textAlign: "center",
      }}
    >
      <WelcomeBand />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
        <h2 className="mb-4">🎬 Add a New Entertainer</h2>
        <AddEntertainerForm
          onSuccess={() => navigate("/entertainers")}
          onCancel={() => navigate("/entertainers")}
        />
      </div>
    </div>
  );
};

export default AddEntertainerPage;

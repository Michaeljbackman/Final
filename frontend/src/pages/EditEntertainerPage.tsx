import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEntertainerById } from "../api/EntertainersAPI";
import { Entertainer } from "../types/Entertainer";
import EditEntertainerForm from "../components/EditEntertainerForm";
import WelcomeBand from "../components/WelcomeBand";

const EditEntertainerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));
        setEntertainer(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainer();
  }, [id]);

  if (loading) return <p>Loading entertainer...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!entertainer) return <p>No entertainer found.</p>;

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
        <h2 className="mb-4">Edit Entertainer</h2>
        <EditEntertainerForm
          entertainer={entertainer}
          onSuccess={() => navigate(`/entertainer/${entertainer.entertainerID}`)}
          onCancel={() => navigate(`/entertainer/${entertainer.entertainerID}`)}
        />
      </div>
    </div>
  );
};

export default EditEntertainerPage;

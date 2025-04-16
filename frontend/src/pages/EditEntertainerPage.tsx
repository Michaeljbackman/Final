import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEntertainerById } from "../api/EntertainersAPI";
import { Entertainer } from "../types/Entertainer";
import EditEntertainerForm from "../components/EditEntertainerForm";
import WelcomeBand from "../components/WelcomeBand";

const EditEntertainerPage = () => {
  const { id } = useParams();
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
    <div className="container mt-4">
      <WelcomeBand />
      <EditEntertainerForm entertainer={entertainer} />
    </div>
  );
};

export default EditEntertainerPage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEntertainerById, deleteEntertainer } from "../api/EntertainersAPI";
import { Entertainer } from "../types/Entertainer";
import WelcomeBand from "../components/WelcomeBand";

function EntertainerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));
        setEntertainer(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entertainer?")) return;

    try {
      await deleteEntertainer(Number(id));
      navigate("/entertainers");
    } catch (error) {
      alert("Failed to delete entertainer.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-entertainer/${id}`);
  };

  if (loading) return <p>Loading entertainer details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!entertainer) return <p>No entertainer found.</p>;

  return (
    <div className="container mt-4">
      <WelcomeBand />
      <h2>{entertainer.entStageName} - Details</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Address:</strong> {entertainer.entStreetAddress}, {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}</li>
        <li className="list-group-item"><strong>Phone:</strong> {entertainer.entPhoneNumber}</li>
        <li className="list-group-item"><strong>Email:</strong> {entertainer.entEMailAddress}</li>
        <li className="list-group-item"><strong>Website:</strong> {entertainer.entWebPage}</li>
        <li className="list-group-item"><strong>Date Entered:</strong> {new Date(entertainer.dateEntered).toLocaleDateString()}</li>
      </ul>

      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <button className="btn btn-secondary" onClick={() => navigate("/entertainers")}>Back</button>
      </div>
    </div>
  );
}

export default EntertainerDetailsPage;
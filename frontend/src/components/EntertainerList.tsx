import { useEffect, useState } from 'react';
import { fetchEntertainers } from '../api/EntertainersAPI';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { EntertainerSummary } from "../types/EntertainerSummary";


function EntertainerList() {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainers(pageSize, pageNum); // You'll define this API call
        setEntertainers(data.entertainers);
        setTotalPages(Math.ceil(data.totalEntertainers / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      {entertainers.map((e) => (
        <div key={e.entertainerID} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{e.entStageName}</h5>
            <p className="card-text">
              <strong>Times Booked:</strong> {e.bookingCount ?? 0}<br />
              <strong>Last Booking:</strong> {e.lastBookedDate ?? "Never"}
            </p>
            <button className="btn btn-outline-primary" onClick={() => navigate(`/entertainer/${e.entertainerID}`)}>
              Details
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default EntertainerList;

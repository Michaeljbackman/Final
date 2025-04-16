import EntertainerList from "../components/EntertainerList";
import WelcomeBand from "../components/WelcomeBand";

function EntertainersPage() {
  return (
    <div className="container mt-4">
      <WelcomeBand />
      <h2 className="text-center mb-4">Meet Our Entertainers</h2>
      <EntertainerList />
    </div>
  );
}

export default EntertainersPage;

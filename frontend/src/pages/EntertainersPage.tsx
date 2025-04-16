import EntertainerList from "../components/EntertainerList";
import WelcomeBand from "../components/WelcomeBand";

function EntertainersPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundColor: "#1e1e1e",
        color: "white",
        textAlign: "center",
      }}
    >
      <WelcomeBand />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
        <h2 className="mb-4">🎤 Meet Our Entertainers</h2>
        <EntertainerList />
      </div>
    </div>
  );
}

export default EntertainersPage;

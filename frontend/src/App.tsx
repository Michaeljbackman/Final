import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import EntertainersPage from './pages/EntertainersPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import DonatePage from './pages/EntertainerDetailsPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';
import EditEntertainerPage from './pages/EditEntertainerPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route path="/donate/:projectName/:projectId" element={<DonatePage />} />
          <Route path="/add" element={<AddEntertainerPage />} />
          <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
          <Route path="/edit-entertainer/:id" element={<EditEntertainerPage />} />
        </Routes>
      </Router>
  );
}

export default App;

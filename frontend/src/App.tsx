import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EntertainersPage from './pages/EntertainersPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';
import AddEntertainerForm from './components/AddEntertainerForm';
import EditEntertainerPage from './pages/EditEntertainerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntertainersPage />} />
        <Route path="/entertainers" element={<EntertainersPage />} />
        <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
        <Route path="/add-entertainer" element={<AddEntertainerForm />} />
        <Route path="/edit-entertainer/:id" element={<EditEntertainerPage />} />
      </Routes>
    </Router>
  );
}

export default App;

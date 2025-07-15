import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import LandlordDashboard from "./pages/LandlordDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        {/* We’ll add the tenant page soon */}
      </Routes>
    </Router>
  );
}

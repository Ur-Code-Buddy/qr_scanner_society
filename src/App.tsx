import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScanPage from "./pages/Scan";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
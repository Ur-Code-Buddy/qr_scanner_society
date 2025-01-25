import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScanPage from "./pages/Scan";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPage />} />
      </Routes>
    </Router>
  );
};

export default App;
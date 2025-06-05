import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NeuronAnalyzer from "./pages/NeuronAnalyzer";
import BiasDetector from "./pages/BiasDetector";
import FeatureImportance from "./pages/FeatureImportance";
import SummaryGenerator from "./pages/SummaryGenerator";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/neuron" element={<NeuronAnalyzer />} />
        <Route path="/bias" element={<BiasDetector />} />
        <Route path="/importance" element={<FeatureImportance />} />
        <Route path="/summary" element={<SummaryGenerator />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;

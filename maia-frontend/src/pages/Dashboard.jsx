import React from "react";
import { useAuth } from "../api/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-indigo-800">MAIA Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-all cursor-pointer"
        >
          Logout
        </button>
      </header>

      <div className="mb-6">
        <button
          onClick={handleBack}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-indigo-700 text-white p-4 rounded-lg shadow-lg mb-8">
        <div className="flex gap-6">
          <Link
            to="/neuron"
            className="hover:underline hover:text-indigo-300 transition-all cursor-pointer"
          >
            Neuron
          </Link>
          <Link
            to="/bias"
            className="hover:underline hover:text-indigo-300 transition-all cursor-pointer"
          >
            Bias
          </Link>
          <Link
            to="/importance"
            className="hover:underline hover:text-indigo-300 transition-all cursor-pointer"
          >
            Importance
          </Link>
          <Link
            to="/summary"
            className="hover:underline hover:text-indigo-300 transition-all cursor-pointer"
          >
            Summary
          </Link>
        </div>
      </nav>

      {/* Model Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Neuron Model Information */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-700">Neuron Model</h2>
          <p className="mt-4 text-gray-700">
            The Neuron model analyzes image inputs to visualize neuron-level activations within a deep learning model. It helps users interpret which areas of an image contribute most to a model’s decision.
          </p>
          <ul className="mt-4 text-gray-600 list-disc pl-5">
            <li>Highlights key regions triggering neural responses</li>
            <li>Shows how layers influence predictions</li>
            <li>Generates heatmaps for decision areas</li>
          </ul>

        </div>





        {/* Bias Detection Model */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-700">Bias Detection</h2>
          <p className="mt-4 text-gray-700">
            The Bias Detection model analyzes images or data for bias, identifying how a model's predictions may be
            influenced by unfair factors such as gender, age, or ethnicity.
          </p>
          <ul className="mt-4 text-gray-600 list-disc pl-5">
            <li>Detect biases in model predictions</li>
            <li>Evaluate fairness and equity</li>
            <li>Ensure ethical AI usage</li>
          </ul>
        </div>

        {/* Feature Importance Model */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-700">Feature Importance</h2>
          <p className="mt-4 text-gray-700">
            The Feature Importance model helps identify which features have the most influence on the predictions of a
            model. This is essential for understanding how different factors contribute to outcomes.
          </p>
          <ul className="mt-4 text-gray-600 list-disc pl-5">
            <li>Understand which features matter most</li>
            <li>Improve model interpretability</li>
            <li>Assist in model optimization</li>
          </ul>
        </div>

        {/* Summary Generation Model */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-700">Summary Generation</h2>
          <p className="mt-4 text-gray-700">
            The Summary Generation model automatically generates concise and meaningful summaries from large amounts of
            text, making it easier for users to grasp key points quickly.
          </p>
          <ul className="mt-4 text-gray-600 list-disc pl-5">
            <li>Generate summaries of lengthy documents</li>
            <li>Quickly highlight important information</li>
            <li>Improve content accessibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

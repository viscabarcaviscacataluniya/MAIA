import React, { useState } from "react";
import { analyzeNeuron } from "../api/maia";
import { useNavigate } from "react-router-dom";

const NeuronAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (image) {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeNeuron(image);
        setResult(data);
      } catch (err) {
        setError("Error analyzing image. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please upload an image.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <a
        href="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all cursor-pointer mb-6 inline-block"
      >
        Back to Dashboard
      </a>

      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Neuron Analyzer</h1>

      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="imageUpload" className="block text-lg font-medium text-gray-700 mb-2">
          Upload Image for Analysis
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all cursor-pointer w-full mt-4"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin">🔄</span>
        ) : (
          "Analyze Neuron"
        )}
      </button>

      {/* Error Handling */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Results */}
      {result?.heatmap_base64 && result?.original_image_base64 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-indigo-800">Model Interpretation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Original Image</p>
              <img
                src={`data:image/png;base64,${result.original_image_base64}`}
                alt="Original"
                className="max-w-full border rounded-lg shadow-lg"
              />
            </div>

            {/* Heatmap */}
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Neuron Heatmap</p>
              <img
                src={`data:image/png;base64,${result.heatmap_base64}`}
                alt="Neuron Heatmap"
                className="max-w-full border rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Score & Legend */}
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Convergence Delta:</strong> {result?.delta?.toFixed(5)}</p>
            <p className="mt-2">
              <strong>Legend:</strong> This heatmap shows which parts of the image the model focused on the most.
              Brighter areas indicate stronger neuron activation and greater importance to the model’s decision.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuronAnalyzer;

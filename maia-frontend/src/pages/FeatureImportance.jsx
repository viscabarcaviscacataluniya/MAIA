import React, { useState } from "react";
import { analyzeFeatureImportance } from "../api/maia";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

const FeatureImportance = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (image) {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeFeatureImportance(image);
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <a
        href="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all cursor-pointer mb-6 inline-block"
      >
        Back to Dashboard
      </a>

      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Feature Importance</h1>

      {/* Image Upload */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {image && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>Uploaded Image:</strong> {image.name}
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all w-full mb-6"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Error Handling */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Feature Importance Bar Chart */}
      {result?.heatmap_base64 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800">Feature Importance Chart:</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={result.features.map((feature, index) => ({
                name: feature,
                score: result.importance_scores[index],
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-90}
                textAnchor="end"
                interval={0}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8">
                <LabelList
                  dataKey="score"
                  position="top"
                  formatter={(value) => value.toFixed(2)}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <p className="mt-2 text-sm text-gray-500">
            Importance Score: {result.importanceScores?.toFixed(5) || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeatureImportance;

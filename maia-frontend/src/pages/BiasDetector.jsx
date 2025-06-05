import React, { useState } from "react";
import { analyzeBias } from "../api/maia";

const BiasDetector = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (image1 && image2) {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeBias(image1, image2);
        setResult(data);
      } catch (err) {
        setError("Error analyzing bias. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please upload two images.");
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

      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Bias Detector</h1>

      {/* Image Uploads */}
      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-700 mb-2">Upload Image 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
            className="p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {image1 && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(image1)}
                alt="Image 1 Preview"
                className="max-w-xs rounded-lg shadow-lg"
              />
              <p className="mt-1 text-sm text-gray-500">Image 1</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-700 mb-2">Upload Image 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0])}
            className="p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {image2 && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(image2)}
                alt="Image 2 Preview"
                className="max-w-xs rounded-lg shadow-lg"
              />
              <p className="mt-1 text-sm text-gray-500">Image 2</p>
            </div>
          )}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all w-full mb-6"
      >
        {loading ? (
          <span className="animate-spin">🔄</span>
        ) : (
          "Analyze Bias"
        )}
      </button>

      {/* Loading Indicator */}
      {loading && <p className="mt-4 text-blue-500">Analyzing images... Please wait.</p>}

      {/* Error Handling */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Bias Comparison */}
      {result && result.biasComparison && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-indigo-800">Bias Comparison Result:</h2>

          {/* Bias Detection Information */}
          <div className="text-sm text-gray-700 mb-4">
            <p>
              <strong>Prediction 1:</strong> {result.prediction_1_class} (Confidence:{" "}
              {result.confidence_1 ? result.confidence_1.toFixed(2) : "N/A"})
            </p>
            <p>
              <strong>Prediction 2:</strong> {result.prediction_2_class} (Confidence:{" "}
              {result.confidence_2 ? result.confidence_2.toFixed(2) : "N/A"})
            </p>

            <p className="mt-2 flex items-center gap-2">
              <strong>Bias Detected:</strong>
              {result.bias_detected ? (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Yes</span>
              ) : (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">No</span>
              )}
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Explanation:</strong> This analysis compares the two images to detect any potential bias in the model's predictions.
            </p>
            <p>
              Bias detection occurs when the model shows different behavior based on certain features of the images (e.g., age, gender, etc.).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasDetector;

import React, { useState } from "react";
import { generateSummary } from "../api/maia";

const SummaryGenerator = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (text.trim()) {
      setLoading(true);
      setError(null);
      try {
        const data = await generateSummary(text);
        setSummary(data.summary);
      } catch (err) {
        setError("Error generating summary. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter text to summarize.");
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

      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Summary Generator</h1>

      {/* Text Area for Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
        className="mb-4 p-2 border border-gray-300 rounded w-full h-40 resize-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Character Count */}
      <div className="text-sm text-gray-500">{text.length} / 1000 characters</div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all w-full mt-4"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {/* Error Handling */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display Summary */}
      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-800">Generated Summary:</h2>
          <p className="mt-2 text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryGenerator;

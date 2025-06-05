import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const analyzeNeuron = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(`${API_BASE}/analyze/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error communicating with backend.");
  }
};


export const analyzeBias = async (imageFile1, imageFile2) => {
    const formData = new FormData();
    formData.append("image1", imageFile1);
    formData.append("image2", imageFile2);
  
    try {
      const response = await axios.post(`${API_BASE}/bias-detect/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error communicating with backend.");
    }
  };

  
  export const analyzeFeatureImportance = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
  
    try {
      const response = await axios.post(`${API_BASE}/feature-importance/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error communicating with backend.");
    }
  };

  
  export const generateSummary = async (text) => {
    const response = await fetch("http://localhost:8000/api/summarize/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate summary");
    }
  
    return await response.json();
  };
  
  
# 🧠 MAIA – Multimodal Automated Interpretability Agent

MAIA is an explainable AI system designed to help educators and analysts interpret AI model decisions using multimodal data inputs (images, text, and tabular features). It leverages state-of-the-art deep learning models, explainable AI (XAI) techniques, and a user-friendly interface to enhance model transparency and trust.

## 🚀 Features

- Multimodal input support: image, text, and tabular data
- Integration of cutting-edge models: ResNet18, BLIP-2, Pegasus-XSum
- Explainability using LIME, SHAP, and Grad-CAM
- Neuron Analyzer: visualizes neuron activation and density
- Feature importance visualization using bar charts
- Bias Detection using Confidence metrix
- Responsive React frontend with role-based dashboards
- Assignment management, reports, and feedback system for educators

---

## 🏗️ Tech Stack

### Backend
- **Django** (REST Framework)
- **TorchVision**, **Captum**, **Transformers**
- **NumPy**, **Pandas**

### Frontend
- **React.js**
- **Tailwind CSS**
- **Chart.js / Recharts** (for bar charts and data visualizations)

### Models Used
- **ResNet18** – Image classification
- **BLIP-2 (Salesforce/blip2-opt-2.7b)** – Image captioning
- **Pegasus-XSum** – Text summarization

---


---

## 🧪 XAI Techniques Implemented

| Technique | Description |
|----------|-------------|
| **LIME** | Local Interpretable Model-Agnostic Explanations for tabular and text data |
| **SHAP** | SHapley Additive exPlanations to show global & local feature importance |
| **Grad-CAM** | Class Activation Mapping for visual explanations in CNNs |
| **Neuron Analyzer** | Visual tool for exploring neuron activation and density |

---


---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/maia-project.git
cd maia-project
```
### 2. Backend Setup

```bash
cd maia_backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 3.Frontend Setup

```bash
cd maia_frontend/
npm install
npm start
```
---
## 🎯 Use Cases
- Helping educators interpret AI grading models

- Explaining multimodal predictions in research and evaluation

- Visualizing feature influence in tabular ML datasets

---
## 📈 Future Enhancements
- Add support for more models and modalities

- Exportable PDF reports of interpretations

- Model training within the interface

- Cloud deployment (AWS/GCP/Azure)

---
## 👨‍💻 Author
Naman Shetty – Full Stack Data Scientist



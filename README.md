# 🔬 PathoVision AI — Digital Pathology Assistant

> An AI-powered web application that classifies microscopic cell images in real-time using a custom-trained deep learning model via the Roboflow Inference API.

---

## 🏥 About the Project

PathoVision AI is a full-stack healthcare web application built to demonstrate the potential of artificial intelligence in digital pathology. Upload a microscope cell image and the system instantly identifies the cell type, provides confidence scores, displays clinical information, and generates a professional cytology report.

This project was developed and presented at **Rajalakshmi Advanced Diagnostics & Applied Radiomics (RADAR)**.

---

## 👨‍💻 Team

| Name | Department |
|------|-----------|
| Devaprakash J | CSE (AIML) · III Year |
| Ashwin Karthik | CSE (AIML) · III Year |
| Barath S | CSE (AIML) · III Year |
| Aravind | CSE (AIML) · III Year |

---

## ✨ Features

- **🔬 AI Cell Classification** — Upload any microscope image and get instant cell type predictions
- **📊 Confidence Scores** — Top 3 predictions with visual confidence bars
- **🧬 Cell Information Panel** — Biological role, function, and clinical relevance for every cell type
- **📄 Cytology Report** — Auto-generate a professional printable pathology report
- **📈 Analytics Dashboard** — Pie and bar charts tracking cell distribution across scans
- **🎯 Presentation Mode** — One-click demo mode built for pitches and showcases
- **🏠 Landing Page** — Professional healthcare-themed landing page

---

## 🧬 Supported Cell Types

| Cell Type | Description |
|-----------|-------------|
| `columnar_epithelia` | Lines inner surfaces of organs and glands |
| `eosinophil` | Combats parasitic infections and allergic responses |
| `erythrocyte` | Oxygen transport via hemoglobin (RBC) |
| `hemosiderophage` | Macrophage containing hemosiderin iron |
| `lymphocyte` | Core adaptive immune system cell |
| `macrophage` | Phagocytic cell for pathogens and debris |
| `mast_cell` | Releases histamine during allergic reactions |
| `neutrophil` | First responder to bacterial infections |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Vite |
| Backend | Python, Flask, Flask-CORS |
| AI / ML | Roboflow Inference API |
| Charts | Recharts |
| File Upload | react-dropzone |
| HTTP Client | Axios |
| Model Training | PyTorch, ResNet18, torchvision |
| Dataset | Roboflow — `cell_classification-gvhkn/1` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- A Roboflow account with access to `cell_classification-gvhkn/1`

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/pathovision-ai.git
cd pathovision-ai
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file (use `.env.example` as reference):

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
ROBOFLOW_API_KEY=your_api_key_here
ROBOFLOW_MODEL_ID=cell_classification-gvhkn/1
```

Start the Flask server:

```bash
python app.py
```

Backend runs at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📁 Project Structure

```
pathoai-copilot/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt
│   ├── .env                # API keys (not committed)
│   └── .env.example        # Template for environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── LandingPage.jsx       # Initial landing page
│   │       ├── Navbar.jsx
│   │       ├── Dashboard.jsx         # Stats overview
│   │       ├── UploadSection.jsx     # Drag & drop upload
│   │       ├── ResultPanel.jsx       # AI prediction display
│   │       ├── CellInfoPanel.jsx     # Cell biology info
│   │       ├── AnalyticsDashboard.jsx # Charts
│   │       ├── CytologyReport.jsx    # Printable report
│   │       ├── RoadmapSection.jsx    # Future features
│   │       ├── PresentationMode.jsx  # Demo/pitch mode
│   │       └── Disclaimer.jsx
│   ├── package.json
│   └── vite.config.js
│
├── model/
│   ├── train.py            # Model training script (ResNet18)
│   ├── download_data.py    # Roboflow dataset downloader
│   └── requirements.txt
│
└── README.md
```

---

## 🌐 Deployment

| Service | Platform | Free Tier |
|---------|----------|-----------|
| Frontend | [Vercel](https://vercel.com) | ✅ Yes |
| Backend | [Render](https://render.com) | ✅ Yes |

### Deploy Frontend (Vercel)
1. Push to GitHub
2. Import project on Vercel
3. Set Root Directory: `pathoai-copilot/frontend`
4. Build Command: `npm run build` · Output: `dist`

### Deploy Backend (Render)
1. New Web Service → connect repo
2. Root Directory: `pathoai-copilot/backend`
3. Start Command: `python app.py`
4. Add environment variables: `ROBOFLOW_API_KEY`, `ROBOFLOW_MODEL_ID`

---

## ⚠️ Disclaimer

PathoVision AI is intended **exclusively for educational and research purposes**. It does not replace professional medical diagnosis or the expertise of a licensed pathologist. All AI-generated predictions must be verified by a qualified healthcare professional before any clinical decision is made.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  🔬 <strong>PathoVision AI</strong> · Rajalakshmi Advanced Diagnostics & Applied Radiomics (RADAR) · 2025
</p>

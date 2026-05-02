# 🌱 AgriVision - Intelligent Crop Scanning

AgriVision is an AI-powered agritech web application designed to help farmers and agricultural enthusiasts instantly identify crop diseases from photos. By simply uploading an image of a leaf, the system detects the disease and provides immediate, actionable treatment and prevention advice.

## 🌐 Live Demo
- **Frontend:** https://agrivision-xi.vercel.app
- **Backend API:** https://agrivision-j0t2.onrender.com/docs

## 🚀 Features

- **AI Disease Detection:** Uses a PyTorch deep learning model to classify 38 different plant/disease combinations.
- **Instant Advice:** Generates severity levels, treatment steps, and prevention strategies.
- **Analytics Dashboard:** Visualize scan history and health statistics through interactive charts.
- **Modern UI:** Built with a premium, glassmorphic design system using React and Tailwind CSS v4.


## 💻 Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons & Charts:** Lucide React, Recharts
- **Upload Handling:** React Dropzone

### Backend
- **Framework:** FastAPI
- **Machine Learning:** PyTorch, TorchVision (EfficientNet)
- **Database:** SQLite (SQLAlchemy ORM)

---

## 🛠️ Local Setup Instructions

Follow these instructions to run the application locally. You will need two separate terminal windows—one for the frontend and one for the backend.

### 1. Backend Setup

The backend serves the API and runs the machine learning inference.

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   # Windows (PowerShell)
   .\agrivision_env\Scripts\activate
   
   # Linux / Mac
   source agrivision_env/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The API will be running at `http://127.0.0.1:8000`. You can view the interactive API documentation at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup

The frontend provides the interactive user interface.

1. Open a **new** terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open in your browser at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
AgriVision/
├── backend/
│   ├── agrivision.db         # SQLite database
│   ├── main.py               # FastAPI application entry point
│   ├── database/             # SQLAlchemy models and setup
│   ├── model/                # PyTorch model architecture and inference script
│   ├── nlp/                  # Advice generation logic
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, UploadZone, ResultCard)
│   │   ├── pages/            # Page components (Home, Dashboards, History, About)
│   │   ├── App.jsx           # Routing configuration
│   │   └── index.css         # Global styles and Tailwind configuration
│   └── package.json          # Node dependencies
└── models/
    └── best_model.pth        # Trained PyTorch model weights
```

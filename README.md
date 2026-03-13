# Early Detection of Chronic Kidney Disease

Thesis project: ML-based early CKD detection, plus a web app for risk assessment.

## Run the web app locally

### 1. Backend (FastAPI + ML model)

```bash
# From project root (Early_Detection_of_Chronic_Kidney_Disease)
python -m venv .venv
source .venv/Scripts/activate    # Git Bash / WSL (Windows)
# .venv\Scripts\activate        # CMD or PowerShell
# source .venv/bin/activate     # macOS/Linux

pip install -r backend/requirements.txt
python backend/train_model.py   # trains and saves model (skip if already done)
python -m uvicorn backend.app.main:app --port 8000
```

API: `http://127.0.0.1:8000` — docs: `http://127.0.0.1:8000/docs`

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:3000`

Set `NEXT_PUBLIC_CKD_API_URL=http://127.0.0.1:8000` in `frontend/.env.local` if the backend runs on another host/port.

## Project layout

- **backend/** — FastAPI app, training script, saved model (`ml/ckd_model.pkl`)
- **frontend/** — Next.js app (form + result card)
- **CKD_Preprocessed.csv** — dataset used for training

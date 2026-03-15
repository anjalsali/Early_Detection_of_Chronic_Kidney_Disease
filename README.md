# Early Detection of Chronic Kidney Disease

Thesis project: ML-based early CKD detection and a web app for risk assessment.

## Dataset & model

- **Training data:** `CKD_initial_dataset.csv` (UCI CKD repository, raw columns: age, bp, sg, al, su, rbc, pc, …, `classification`: `ckd` / `notckd`).
- **Model:** Deep neural network (Keras): dense layers + dropout + batch norm, **binary cross-entropy**, **sigmoid** output = **P(CKD)**.
- **Preprocessing:** Median imputation + `StandardScaler` on 24 features (aligned with the web form).
- **Probability:** Model outputs logits; **temperature scaling** is applied at inference so risk % spreads across 0–100% (green / amber / red) instead of saturating at 0 or 100.

Train (from project root):

```bash
python -m venv .venv
source .venv/Scripts/activate   # or .venv\Scripts\activate on Windows CMD
pip install -r backend/requirements.txt
python backend/train_dnn.py
```

Writes:

- `backend/ml/preprocessor.pkl` — imputer + scaler + feature column order  
- `backend/ml/ckd_dnn.keras` — trained DNN  

**After upgrading backend dependencies** (e.g. a newer scikit-learn), run `python backend/train_dnn.py` again so the saved preprocessor matches the installed versions.

## Run the web app locally

### Backend (FastAPI)

```bash
python -m uvicorn backend.app.main:app --reload --port 8001
```

(On Windows, if port 8000 fails with permission errors, use 8001 as above.)

To reduce TensorFlow/oneDNN startup messages in the terminal:

```bash
# Git Bash / WSL
export TF_CPP_MIN_LOG_LEVEL=2
export TF_ENABLE_ONEDNN_OPTS=0
python -m uvicorn backend.app.main:app --reload --port 8001
```

```powershell
# PowerShell
$env:TF_CPP_MIN_LOG_LEVEL=2; $env:TF_ENABLE_ONEDNN_OPTS=0; python -m uvicorn backend.app.main:app --reload --port 8001
```

API: `http://127.0.0.1:8001` — docs: `http://127.0.0.1:8001/docs`

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:3000`

If the API is not on port 8000, set in `frontend/.env.local`:

```env
NEXT_PUBLIC_CKD_API_URL=http://127.0.0.1:8001
```

## Project layout

- **CKD_initial_dataset.csv** — source data for training  
- **backend/train_dnn.py** — trains DNN + saves artifacts  
- **backend/ml/feature_pipeline.py** — maps raw CSV → 24 API features  
- **backend/app/** — FastAPI app, `/predict`  
- **frontend/** — Next.js form + result card  
- **SAMPLE-TEST-VALUES.md** — example inputs vs expected risk  

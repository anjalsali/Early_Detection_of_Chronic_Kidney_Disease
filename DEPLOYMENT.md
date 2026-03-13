# Deploying the CKD Project

The app has two parts:
- **Frontend** (Next.js) → **Vercel**
- **Backend** (FastAPI + ML) → **Render** or **Railway** (Vercel doesn’t run long‑running Python/ML well)

---

## 1. Deploy backend first (Render — free tier)

You need a live backend URL before deploying the frontend.

### Option A: Render

1. Push your code to **GitHub** (include `backend/`, `CKD_Preprocessed.csv`, and `frontend/`).

2. Create **Render** account: https://render.com → Sign up with GitHub.

3. **New → Web Service**. Connect the repo. Set:
   - **Root Directory:** leave empty (repo root).
   - **Runtime:** Python 3.
   - **Build Command:**
     ```bash
     pip install -r backend/requirements.txt && python backend/train_model.py
     ```
   - **Start Command:**
     ```bash
     uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Environment:** Add variable `PORT` (Render sets this automatically; you can leave it or add `PORT=10000`).

4. Under **Environment**, add:
   - `PYTHON_VERSION` = `3.10.0` (optional, for consistency).

5. **Create Web Service**. Wait for deploy. Note the URL, e.g. `https://your-app-name.onrender.com`.

6. **Important:** Copy `backend/ml/ckd_model.pkl` into the repo (train locally and commit it), or ensure the build step runs `python backend/train_model.py` so the model is created at build time. If the CSV is in the repo root, the build will create the model.

### Option B: Railway

1. Push code to GitHub. Go to https://railway.app → **New Project** → **Deploy from GitHub** → select repo.

2. Set **Root Directory** to the repo root. Railway will try to detect. Add a **nixpacks.toml** or **Dockerfile** in the repo root if you want to force Python.

3. **Variables:** Add `PORT` if needed (Railway often injects it).

4. **Build:** `pip install -r backend/requirements.txt && python backend/train_model.py`  
   **Start:** `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`

5. Deploy and copy the public URL (e.g. `https://your-app.up.railway.app`).

---

## 2. Deploy frontend on Vercel

1. **Vercel:** https://vercel.com → Sign up / Log in (e.g. with GitHub).

2. **Add New Project** → **Import** your GitHub repo.

3. **Configure:**
   - **Root Directory:** click **Edit** → set to `frontend` (so Vercel builds the Next.js app).
   - **Framework Preset:** Next.js (auto-detected).
   - **Environment Variables:** add:
     - Name: `NEXT_PUBLIC_CKD_API_URL`  
     - Value: your backend URL from step 1 (e.g. `https://your-app-name.onrender.com`)  
     - Apply to Production, Preview, Development.

4. **Deploy**. Vercel will build and host the frontend. Your app will call the backend at the URL you set.

5. Optional: add a **custom domain** in Vercel (Project → Settings → Domains).

---

## 3. CORS on the backend

The backend already allows all origins in code (`allow_origins=["*"]`). If you later restrict CORS, add your Vercel URL (e.g. `https://your-project.vercel.app`) to the allowed origins in `backend/app/main.py`.

---

## Quick reference

| Part      | Where to deploy | URL you need                    |
|-----------|-----------------|----------------------------------|
| Backend   | Render / Railway| e.g. `https://xxx.onrender.com` |
| Frontend  | Vercel          | Set `NEXT_PUBLIC_CKD_API_URL` to backend URL |

After both are deployed, open the Vercel frontend URL and use the form; it will call the deployed backend.

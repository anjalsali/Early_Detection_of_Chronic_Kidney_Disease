# Deploying the CKD Project

The app has two parts:
- **Frontend** (Next.js) → **Vercel**
- **Backend** (FastAPI + ML) → **Render** (Vercel doesn’t run long‑running Python/ML well)

---

## 1. Deploy backend first (Render — free tier)

You need a live backend URL before deploying the frontend.

1. Push your code to **GitHub** (include `backend/`, `CKD_Preprocessed.csv`, and `frontend/`).

2. Create **Render** account: https://render.com → Sign up with GitHub.

3. **New → Web Service**. Connect the repo. Set:
   - **Root Directory:** leave empty (repo root).
   - **Runtime:** Python 3.
   - **Build Command:**
     ```bash
     pip install -r backend/requirements.txt && python backend/train_dnn.py
     ```
   - **Start Command:**
     ```bash
     uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Environment:** Add variable `PORT` (Render sets this automatically; you can leave it or add `PORT=10000`).

4. Under **Environment**, add:
   - `PYTHON_VERSION` = `3.10.0` (optional, for consistency).

5. **Create Web Service**. Wait for deploy. Note the URL, e.g. `https://your-app-name.onrender.com`.

6. **Important:** Ensure the build step runs `python backend/train_dnn.py` so the DNN and preprocessor are created at build time. The CSV must be at repo root.

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
| Backend   | Render         | e.g. `https://xxx.onrender.com` |
| Frontend  | Vercel          | Set `NEXT_PUBLIC_CKD_API_URL` to backend URL |

After both are deployed, open the Vercel frontend URL and use the form; it will call the deployed backend.

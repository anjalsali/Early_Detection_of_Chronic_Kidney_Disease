# Deploy in 2 steps (Render + Vercel)

## Before you start
- Code is pushed to **GitHub** (this folder = repo root, or a subfolder of the repo).
- You have accounts: **GitHub**, **Render**, **Vercel**.

---

## Step 1 — Backend on Render

1. Open **https://render.com** → Sign in with **GitHub**.
2. **New +** → **Web Service**.
3. **Connect** the repo that contains this project.
4. If this project is in a **subfolder** (e.g. `Early_Detection_of_Chronic_Kidney_Disease`), set **Root Directory** to that folder. If this folder *is* the repo root, leave Root Directory **empty**.
5. Set:
   - **Name:** `ckd-api` (or any name)
   - **Runtime:** Python 3
   - **Build Command:**  
     `pip install -r backend/requirements.txt && python backend/train_model.py`
   - **Start Command:**  
     `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
6. (Optional) **Environment** → Add **PYTHON_VERSION** = `3.10.0`
7. **Create Web Service**. Wait for the first deploy (a few minutes).
8. Copy the service URL (e.g. `https://ckd-api-xxxx.onrender.com`).  
   Test: open `https://your-url.onrender.com/health` → should show `{"status":"ok"}`.

---

## Step 2 — Frontend on Vercel

1. Open **https://vercel.com** → Sign in with **GitHub**.
2. **Add New** → **Project** → **Import** the same GitHub repo.
3. **Root Directory:** click **Edit** → choose **`frontend`** → **Continue**.
4. **Environment Variables:**  
   - Name: `NEXT_PUBLIC_CKD_API_URL`  
   - Value: paste the **Render URL** from Step 1 (no trailing slash)  
   - Apply to Production (and Preview/Development if you want).
5. **Deploy**. Wait for the build to finish.
6. Open the Vercel URL (e.g. `https://your-project.vercel.app`). Submit the form; it will call the Render backend.

Done. Share the Vercel link with recruiters.

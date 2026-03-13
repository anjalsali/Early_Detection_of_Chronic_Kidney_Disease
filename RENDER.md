# Deploy backend on Render (step-by-step)

## 1. Push code to GitHub

Your repo must include (at the root of what Render will use as root):

- `backend/` (with `app/`, `requirements.txt`, `train_model.py`)
- `CKD_Preprocessed.csv`
- `render.yaml` (optional; Render can use it for Blueprint deploy)

If your GitHub repo is a **parent folder** (e.g. "Portfolio Projects") and this project is in a subfolder (e.g. `Early_Detection_of_Chronic_Kidney_Disease`), in Render you will set **Root Directory** to that subfolder in step 3.

---

## 2. Create a Render account

1. Go to **https://render.com**
2. Click **Get Started** and sign up with **GitHub**
3. Authorize Render to access your repositories

---

## 3. Create a Web Service from your repo

1. In the Render dashboard, click **New +** → **Web Service**
2. Connect your **GitHub** account if asked, then select the repository that contains this project
3. Click **Connect**

---

## 4. Configure the service

Use these settings (adjust **Root Directory** only if your app is in a subfolder):

| Field | Value |
|-------|--------|
| **Name** | `ckd-api` (or any name you like) |
| **Region** | Choose the closest to you or your recruiters |
| **Root Directory** | Leave **empty** if this project *is* the repo root. If the project is in a subfolder (e.g. `Early_Detection_of_Chronic_Kidney_Disease`), set it to that folder name |
| **Runtime** | **Python 3** |
| **Build Command** | `pip install -r backend/requirements.txt && python backend/train_model.py` |
| **Start Command** | `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT` |

**Environment (optional):**

- Add variable **`PYTHON_VERSION`** = `3.10.0` if you want to pin the Python version.

Do **not** set **PORT** yourself; Render sets it automatically.

---

## 5. Deploy

1. Click **Create Web Service**
2. Render will clone the repo, run the build command, then start the app. The first deploy may take a few minutes (installing dependencies + training the model)
3. When the deploy finishes, open your service URL at the top (e.g. `https://ckd-api-xxxx.onrender.com`)
4. Test: open `https://your-url.onrender.com/health` — you should see `{"status":"ok"}`

---

## 6. Use this URL in your frontend

- **Vercel:** In the frontend project, add an environment variable:
  - **Name:** `NEXT_PUBLIC_CKD_API_URL`
  - **Value:** `https://your-url.onrender.com` (the Render URL from step 5, **no trailing slash**)
- Redeploy the frontend on Vercel so it picks up the new variable.

Your app is now deployed: **backend on Render**, **frontend on Vercel**. The small “First request may take 30–60 seconds” note on the frontend explains the free-tier cold start to recruiters.

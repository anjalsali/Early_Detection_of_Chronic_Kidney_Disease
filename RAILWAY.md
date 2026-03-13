# Deploy backend to Railway

## 1. Push your code to GitHub

Ensure your repo has:
- `backend/`
- `CKD_Preprocessed.csv` (at repo root)
- `Dockerfile` and `.dockerignore` (at repo root)

## 2. Create a Railway project

1. Go to **https://railway.app** and sign in with GitHub.
2. Click **New Project**.
3. Choose **Deploy from GitHub repo**.
4. Select your **Early_Detection_of_Chronic_Kidney_Disease** repo (or the repo that contains it). If the repo is the parent "Portfolio Projects", select it and set the **Root Directory** in the next step.
5. Railway will detect the **Dockerfile** and build the image. No extra config needed if the Dockerfile is at the repo root.
   - If your repo root is the parent folder (e.g. "Portfolio Projects"), either:
     - Move the Dockerfile and backend into that root and adjust paths, or
     - In Railway: **Settings** → **Root Directory** → set to `Early_Detection_of_Chronic_Kidney_Disease` so the Dockerfile is used.

## 3. Set root directory (if needed)

- If you opened the repo that has `Early_Detection_of_Chronic_Kidney_Disease` as the root, skip this.
- If you opened a parent repo and the Dockerfile is inside a subfolder:
  - **Project** → **Settings** → **Root Directory** → `Early_Detection_of_Chronic_Kidney_Disease` → Save.

## 4. Deploy

- Railway will run `docker build` (using the Dockerfile), then start the container. The first deploy can take a few minutes (install deps + train model).
- When it’s done, open **Settings** → **Networking** → **Generate Domain** (or **Public Networking**). Copy the URL, e.g. `https://your-service.up.railway.app`.

## 5. Use this URL in the frontend

In **Vercel** (or locally), set:

- **NEXT_PUBLIC_CKD_API_URL** = `https://your-service.up.railway.app`  
  (no trailing slash)

Your frontend will then call the Railway backend.

## 6. Optional: use Railway CLI

```bash
npm i -g @railway/cli
railway login
railway link   # link to your project
railway up     # deploy from current directory
```

---

**Troubleshooting**

- **Build fails on “CKD_Preprocessed.csv not found”**  
  Ensure the CSV is in the same directory as the Dockerfile (or the root directory you set in Railway), and that it isn’t listed in `.dockerignore`.

- **App crashes or 503**  
  In Railway **Deployments** → select the latest deploy → **View Logs**. Check for Python errors (e.g. missing model file). The Dockerfile runs `train_model.py` during build, so `backend/ml/ckd_model.pkl` should exist in the image.

- **CORS errors from the frontend**  
  The backend allows all origins (`allow_origins=["*"]`). If you restrict CORS later, add your Vercel URL to the allowed list in `backend/app/main.py`.

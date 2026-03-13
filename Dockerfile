# Backend (FastAPI + ML) for Railway / any Docker host
FROM python:3.10-slim

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend and data (model is built in next step)
COPY backend/ ./backend/
COPY CKD_Preprocessed.csv .

# Train model so it exists at backend/ml/ckd_model.pkl
RUN python backend/train_model.py

# Railway injects PORT; default for local runs
ENV PORT=8000
EXPOSE $PORT

CMD uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import CKDFeatures, PredictionResponse
from .predict import predict_ckd


app = FastAPI(title="CKD Early Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict:
    return {"message": "CKD Early Detection API", "docs": "/docs", "health": "/health"}


@app.api_route("/health", methods=["GET", "HEAD"])
def health() -> dict:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(payload: CKDFeatures) -> PredictionResponse:
    try:
        return predict_ckd(payload)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(exc)) from exc


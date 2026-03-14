import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from .models import CKDFeatures, PredictionResponse
from .predict import predict_ckd

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RenalCheck API", version="1.0.0")


class RequestLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info("Incoming request: %s %s", request.method, request.url.path)
        return await call_next(request)


app.add_middleware(RequestLogMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict:
    return {"message": "RenalCheck API", "docs": "/docs", "health": "/health"}


@app.api_route("/health", methods=["GET", "HEAD"])
def health() -> dict:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(payload: CKDFeatures) -> PredictionResponse:
    logger.info("CKD prediction request received from frontend")
    try:
        result = predict_ckd(payload)
        logger.info("CKD prediction completed: prediction=%s, probability=%.2f", result.prediction, result.probability)
        return result
    except Exception as exc:  # noqa: BLE001
        logger.exception("CKD prediction failed")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


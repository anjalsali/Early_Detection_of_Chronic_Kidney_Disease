"""
CKD prediction: P(CKD) from trained DNN + median impute + StandardScaler.
Train: python backend/train_dnn.py (CKD_initial_dataset.csv).
"""
from pathlib import Path
from typing import Dict, List

import joblib
import numpy as np

from .models import CKDFeatures, PredictionResponse

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
ML_DIR = PROJECT_ROOT / "backend" / "ml"
PREPROCESSOR_PATH = ML_DIR / "preprocessor.pkl"
DNN_PATH = ML_DIR / "ckd_dnn.keras"


def _load_artifacts():
    if not PREPROCESSOR_PATH.exists():
        raise FileNotFoundError(
            f"Run: python backend/train_dnn.py (missing {PREPROCESSOR_PATH})"
        )
    if not DNN_PATH.exists():
        raise FileNotFoundError(f"Run: python backend/train_dnn.py (missing {DNN_PATH})")
    bundle = joblib.load(PREPROCESSOR_PATH)
    pipeline = bundle["pipeline"]
    feature_columns: List[str] = list(bundle["feature_columns"])
    temperature: float = float(bundle.get("temperature", 1.0))
    from tensorflow import keras

    model = keras.models.load_model(DNN_PATH)
    return pipeline, model, feature_columns, temperature


_pipeline, _model, _FEATURE_COLUMNS, _TEMPERATURE = _load_artifacts()


def _features_to_dict(features: CKDFeatures) -> Dict[str, float]:
    try:
        d = features.model_dump()
    except AttributeError:
        d = features.dict()
    return {k: float(d[k]) for k in d}


def predict_ckd(features: CKDFeatures) -> PredictionResponse:
    """
    Returns P(CKD) with temperature-scaled probability so values spread across 0–100%
    instead of saturating at 0 or 1. Model outputs logits; we apply sigmoid(logit / T).
    """
    feature_dict = _features_to_dict(features)
    row = np.array([[feature_dict[c] for c in _FEATURE_COLUMNS]], dtype=np.float64)
    X = np.asarray(_pipeline.transform(row), dtype=np.float32)
    logits = _model.predict(X, verbose=0)
    logit_val = float(logits[0, 0])
    # Temperature scaling: softer probabilities (T > 1)
    p_ckd = 1.0 / (1.0 + np.exp(-logit_val / _TEMPERATURE))
    p_ckd = float(np.clip(p_ckd, 0.0, 1.0))
    pred = 1 if p_ckd >= 0.5 else 0
    return PredictionResponse(prediction=pred, probability=p_ckd)

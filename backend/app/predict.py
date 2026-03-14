"""
CKD prediction using the trained Deep Neural Network (DNN).
Requires preprocessor.pkl and ckd_dnn.keras from running: python backend/train_dnn.py
"""
from pathlib import Path
from typing import Dict

import joblib
import numpy as np
import pandas as pd

from .models import CKDFeatures, PredictionResponse


PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
ML_DIR = PROJECT_ROOT / "backend" / "ml"
PREPROCESSOR_PATH = ML_DIR / "preprocessor.pkl"
DNN_PATH = ML_DIR / "ckd_dnn.keras"


def _load_preprocessor():
    if not PREPROCESSOR_PATH.exists():
        raise FileNotFoundError(
            f"Preprocessor not found at {PREPROCESSOR_PATH}. Run: python backend/train_dnn.py"
        )
    return joblib.load(PREPROCESSOR_PATH)


def _load_dnn():
    if not DNN_PATH.exists():
        raise FileNotFoundError(
            f"DNN model not found at {DNN_PATH}. Run: python backend/train_dnn.py"
        )
    from tensorflow import keras
    return keras.models.load_model(DNN_PATH)


_preprocessor = _load_preprocessor()
_dnn_model = _load_dnn()


def predict_ckd(features: CKDFeatures) -> PredictionResponse:
    feature_dict: Dict[str, float | int] = features.dict()
    input_df = pd.DataFrame([feature_dict])

    X = _preprocessor.transform(input_df)
    if hasattr(X, "toarray"):
        X = X.toarray()
    X = np.asarray(X, dtype=np.float32)

    proba: np.ndarray = _dnn_model.predict(X, verbose=0)
    ckd_probability = float(proba[0, 0])
    predicted_class = 1 if ckd_probability >= 0.5 else 0

    return PredictionResponse(
        prediction=predicted_class,
        probability=ckd_probability,
    )

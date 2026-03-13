from pathlib import Path
from typing import Dict

import joblib
import numpy as np
import pandas as pd

from .models import CKDFeatures, PredictionResponse


PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
MODEL_PATH = PROJECT_ROOT / "backend" / "ml" / "ckd_model.pkl"


def _load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. Train the model first.")
    return joblib.load(MODEL_PATH)


ckd_model = _load_model()


def predict_ckd(features: CKDFeatures) -> PredictionResponse:
    feature_dict: Dict[str, float | int] = features.dict()
    input_df = pd.DataFrame([feature_dict])

    probabilities: np.ndarray = ckd_model.predict_proba(input_df)[0]
    predicted_index = int(np.argmax(probabilities))
    predicted_class = int(ckd_model.classes_[predicted_index])
    predicted_probability = float(probabilities[predicted_index])

    return PredictionResponse(prediction=predicted_class, probability=predicted_probability)


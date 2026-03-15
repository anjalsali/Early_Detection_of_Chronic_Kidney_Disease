"""
Build the 24 feature columns (API / frontend names) from the raw UCI CKD CSV.
Used by train_dnn.py; inference uses the same column names via the API.
"""
from __future__ import annotations

import numpy as np
import pandas as pd

FEATURE_COLUMNS: list[str] = [
    "age",
    "bloodPressure",
    "specificGravity",
    "albumin",
    "sugar",
    "redBloodCells",
    "pusCells",
    "pusCellClumps",
    "bacteria",
    "bloodGlucoseRandom",
    "bloodUrea",
    "serumCreatinine",
    "sodium",
    "potassium",
    "haemoglobin",
    "packedCellVolume",
    "whiteBloodCellCount",
    "redBloodCellCount",
    "hypertension",
    "diabetesMellitus",
    "coronaryArteryDisease",
    "appetite",
    "pedalEdema",
    "anemia",
]


def _norm_str(value: object) -> str:
    if pd.isna(value) or value is None:
        return ""
    return str(value).strip().lower()


def _encode_abnormal_normal(value: object) -> float:
    t = _norm_str(value)
    if not t:
        return np.nan
    if t == "abnormal":
        return 1.0
    if t == "normal":
        return 0.0
    return np.nan


def _encode_present(value: object) -> float:
    t = _norm_str(value)
    if not t:
        return np.nan
    if t == "present":
        return 1.0
    if t == "notpresent":
        return 0.0
    return np.nan


def _encode_yes_no(value: object) -> float:
    t = _norm_str(value)
    if not t:
        return np.nan
    if t in ("yes", "y"):
        return 1.0
    if t in ("no", "n"):
        return 0.0
    return np.nan


def _encode_appetite(value: object) -> float:
    t = _norm_str(value)
    if not t:
        return np.nan
    if t == "poor":
        return 1.0
    if t == "good":
        return 0.0
    return np.nan


def raw_ckd_csv_to_features(df: pd.DataFrame) -> tuple[pd.DataFrame, np.ndarray]:
    """
    From CKD_initial_dataset.csv columns. Returns (X, y) with y=1 CKD, y=0 not CKD.
    """
    y = (df["classification"].astype(str).str.strip().str.lower() == "ckd").to_numpy(dtype=np.int32)

    out = pd.DataFrame(index=df.index)
    out["age"] = pd.to_numeric(df["age"], errors="coerce")
    mid = df["bp"] if "bp" in df.columns else df.get("bloodPressure")
    out["bloodPressure"] = pd.to_numeric(mid, errors="coerce")
    out["specificGravity"] = pd.to_numeric(df["sg"], errors="coerce")
    out["albumin"] = pd.to_numeric(df["al"], errors="coerce")
    out["sugar"] = pd.to_numeric(df["su"], errors="coerce")
    out["redBloodCells"] = df["rbc"].map(_encode_abnormal_normal)
    out["pusCells"] = df["pc"].map(_encode_abnormal_normal)
    out["pusCellClumps"] = df["pcc"].map(_encode_present)
    out["bacteria"] = df["ba"].map(_encode_present)
    out["bloodGlucoseRandom"] = pd.to_numeric(df["bgr"], errors="coerce")
    out["bloodUrea"] = pd.to_numeric(df["bu"], errors="coerce")
    out["serumCreatinine"] = pd.to_numeric(df["sc"], errors="coerce")
    out["sodium"] = pd.to_numeric(df["sod"], errors="coerce")
    out["potassium"] = pd.to_numeric(df["pot"], errors="coerce")
    out["haemoglobin"] = pd.to_numeric(df["hemo"], errors="coerce")
    out["packedCellVolume"] = pd.to_numeric(df["pcv"], errors="coerce")
    out["whiteBloodCellCount"] = pd.to_numeric(df["wc"], errors="coerce")
    out["redBloodCellCount"] = pd.to_numeric(df["rc"], errors="coerce")
    out["hypertension"] = df["htn"].map(_encode_yes_no)
    out["diabetesMellitus"] = df["dm"].map(_encode_yes_no)
    out["coronaryArteryDisease"] = df["cad"].map(_encode_yes_no)
    out["appetite"] = df["appet"].map(_encode_appetite)
    out["pedalEdema"] = df["pe"].map(_encode_yes_no)
    out["anemia"] = df["ane"].map(_encode_yes_no)

    out = out[FEATURE_COLUMNS].astype(np.float64)
    return out, y


def api_row_to_dataframe(row: dict) -> pd.DataFrame:
    """Single API payload -> DataFrame with FEATURE_COLUMNS order."""
    data = {col: float(row[col]) for col in FEATURE_COLUMNS}
    return pd.DataFrame([data], columns=FEATURE_COLUMNS)

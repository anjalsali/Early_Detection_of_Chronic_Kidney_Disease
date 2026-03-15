"""
Train DNN on CKD_initial_dataset.csv from project root.
Target: y=1 for CKD, y=0 for notckd. Saves preprocessor + model for the API.
Run from project root: python backend/train_dnn.py
"""
from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

try:
    from ml.feature_pipeline import FEATURE_COLUMNS, raw_ckd_csv_to_features
except ImportError:
    import sys

    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from ml.feature_pipeline import FEATURE_COLUMNS, raw_ckd_csv_to_features

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = PROJECT_ROOT / "CKD_initial_dataset.csv"
MODEL_DIR = PROJECT_ROOT / "backend" / "ml"
PREPROCESSOR_PATH = MODEL_DIR / "preprocessor.pkl"
DNN_PATH = MODEL_DIR / "ckd_dnn.keras"


def build_preprocessing_pipeline() -> Pipeline:
    return Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )


def build_dnn(input_dim: int):
    from tensorflow import keras
    from tensorflow.keras import layers

    # Output logits (no sigmoid) so we can apply temperature scaling at inference for calibrated probabilities.
    model = keras.Sequential(
        [
            layers.Input(shape=(input_dim,)),
            layers.Dense(128, activation="relu"),
            layers.BatchNormalization(),
            layers.Dropout(0.35),
            layers.Dense(64, activation="relu"),
            layers.Dropout(0.25),
            layers.Dense(32, activation="relu"),
            layers.Dropout(0.2),
            layers.Dense(1),  # logits
        ]
    )
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss=keras.losses.BinaryCrossentropy(from_logits=True),
        metrics=["accuracy", keras.metrics.AUC(name="auc")],
    )
    return model


def train_and_save() -> None:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset missing: {DATA_PATH}")

    raw = pd.read_csv(DATA_PATH)
    if "id" in raw.columns:
        raw = raw.drop(columns=["id"])

    X_df, y = raw_ckd_csv_to_features(raw)
    X_df = X_df[FEATURE_COLUMNS]

    X_train, X_test, y_train, y_test = train_test_split(
        X_df.values,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    prep = build_preprocessing_pipeline()
    X_train_t = prep.fit_transform(X_train)
    X_test_t = prep.transform(X_test)

    n_pos = float(np.sum(y_train == 1))
    n_neg = float(np.sum(y_train == 0))
    weight_for_0 = (n_pos + n_neg) / (2.0 * n_neg) if n_neg else 1.0
    weight_for_1 = (n_pos + n_neg) / (2.0 * n_pos) if n_pos else 1.0
    sample_weight = np.where(y_train == 1, weight_for_1, weight_for_0)

    input_dim = X_train_t.shape[1]
    model = build_dnn(input_dim)

    from tensorflow import keras

    early = keras.callbacks.EarlyStopping(
        monitor="val_loss",
        patience=12,
        restore_best_weights=True,
    )
    model.fit(
        X_train_t,
        y_train,
        sample_weight=sample_weight,
        validation_data=(X_test_t, y_test),
        epochs=80,
        batch_size=16,
        callbacks=[early],
        verbose=1,
    )

    logits_test = model.predict(X_test_t, verbose=0).ravel()
    # Temperature scaling: T > 1 softens probabilities so low / moderate / high cases spread across 0–100%.
    TEMPERATURE = 5.0
    proba_test = 1.0 / (1.0 + np.exp(-logits_test / TEMPERATURE))
    pred_test = (proba_test >= 0.5).astype(int)
    acc = float(np.mean(pred_test == y_test))
    print(f"Test accuracy (T={TEMPERATURE}): {acc:.4f}")
    print(f"Mean P(CKD) on CKD test rows: {float(np.mean(proba_test[y_test == 1])):.4f}")
    print(f"Mean P(CKD) on not-CKD test rows: {float(np.mean(proba_test[y_test == 0])):.4f}")

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(
        {"pipeline": prep, "feature_columns": FEATURE_COLUMNS, "temperature": TEMPERATURE},
        PREPROCESSOR_PATH,
    )
    model.save(DNN_PATH)
    print(f"Saved preprocessor -> {PREPROCESSOR_PATH}")
    print(f"Saved DNN -> {DNN_PATH}")


if __name__ == "__main__":
    train_and_save()

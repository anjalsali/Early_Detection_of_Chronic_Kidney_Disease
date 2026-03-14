"""
Train Deep Neural Network for CKD detection (report architecture).
Saves preprocessor (joblib) and DNN model (.keras) for use by the API.
"""
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = PROJECT_ROOT / "CKD_Preprocessed.csv"
MODEL_DIR = PROJECT_ROOT / "backend" / "ml"
PREPROCESSOR_PATH = MODEL_DIR / "preprocessor.pkl"
DNN_PATH = MODEL_DIR / "ckd_dnn.keras"

NUMERIC_FEATURES = [
    "age", "bloodPressure", "specificGravity", "albumin", "sugar",
    "bloodGlucoseRandom", "bloodUrea", "serumCreatinine", "sodium", "potassium",
    "haemoglobin", "packedCellVolume", "whiteBloodCellCount", "redBloodCellCount",
]
CATEGORICAL_FEATURES = [
    "redBloodCells", "pusCells", "pusCellClumps", "bacteria",
    "hypertension", "diabetesMellitus", "coronaryArteryDisease",
    "appetite", "pedalEdema", "anemia",
]


def load_data() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Data not found at {DATA_PATH}")
    return pd.read_csv(DATA_PATH)


def build_preprocessor():
    return ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), NUMERIC_FEATURES),
            ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_FEATURES),
        ],
        remainder="drop",
    )


def build_dnn(input_dim: int):
    import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras import layers

    model = keras.Sequential([
        layers.Input(shape=(input_dim,)),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.3),
        layers.Dense(128, activation="relu"),
        layers.Dropout(0.4),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.3),
        layers.Dense(1, activation="sigmoid"),
    ])
    model.compile(
        optimizer=keras.optimizers.Adam(),
        loss="binary_crossentropy",
        metrics=["accuracy"],
    )
    return model


def train_and_save() -> None:
    df = load_data()
    target_column = "class"
    feature_columns = [c for c in df.columns if c != target_column]
    X = df[feature_columns]
    y = df[target_column].astype(np.float32)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    preprocessor = build_preprocessor()
    X_train_t = preprocessor.fit_transform(X_train)
    X_test_t = preprocessor.transform(X_test)

    if hasattr(X_train_t, "toarray"):
        X_train_t = X_train_t.toarray()
        X_test_t = X_test_t.toarray()
    input_dim = X_train_t.shape[1]

    model = build_dnn(input_dim)
    model.fit(
        X_train_t, y_train,
        validation_data=(X_test_t, y_test),
        epochs=20,
        batch_size=16,
        verbose=1,
    )

    y_pred_proba = model.predict(X_test_t)
    y_pred = (y_pred_proba >= 0.5).astype(int).flatten()
    print("Classification report:")
    print(classification_report(y_test, y_pred))
    print("Confusion matrix:")
    print(confusion_matrix(y_test, y_pred))

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(preprocessor, PREPROCESSOR_PATH)
    model.save(DNN_PATH)
    print(f"Preprocessor saved to {PREPROCESSOR_PATH}")
    print(f"DNN saved to {DNN_PATH}")


if __name__ == "__main__":
    train_and_save()

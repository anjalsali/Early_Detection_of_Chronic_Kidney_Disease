import joblib
from pathlib import Path

import pandas as pd  # pyright: ignore[reportMissingImports]
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.svm import SVC


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = PROJECT_ROOT / "CKD_Preprocessed.csv"
MODEL_DIR = PROJECT_ROOT / "backend" / "ml"
MODEL_PATH = MODEL_DIR / "ckd_model.pkl"


def load_data() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Expected data file not found at {DATA_PATH}")
    df = pd.read_csv(DATA_PATH)
    return df


def build_pipeline(feature_columns: list[str], target_column: str) -> Pipeline:
    numeric_features = [
        "age",
        "bloodPressure",
        "specificGravity",
        "albumin",
        "sugar",
        "bloodGlucoseRandom",
        "bloodUrea",
        "serumCreatinine",
        "sodium",
        "potassium",
        "haemoglobin",
        "packedCellVolume",
        "whiteBloodCellCount",
        "redBloodCellCount",
    ]

    categorical_features = [
        "redBloodCells",
        "pusCells",
        "pusCellClumps",
        "bacteria",
        "hypertension",
        "diabetesMellitus",
        "coronaryArteryDisease",
        "appetite",
        "pedalEdema",
        "anemia",
    ]

    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown="ignore")

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features),
        ],
        remainder="drop",
    )

    classifier = SVC(probability=True, random_state=42)

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("classifier", classifier),
        ]
    )

    return pipeline


def train_and_save_model() -> None:
    df = load_data()

    target_column = "class"
    feature_columns = [col for col in df.columns if col != target_column]

    X = df[feature_columns]
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        stratify=y,
        random_state=42,
    )

    pipeline = build_pipeline(feature_columns, target_column)
    pipeline.fit(X_train, y_train)

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")


if __name__ == "__main__":
    train_and_save_model()


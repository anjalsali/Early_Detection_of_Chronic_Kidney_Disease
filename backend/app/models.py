from pydantic import BaseModel, Field


class CKDFeatures(BaseModel):
    age: float = Field(..., description="Age in years")
    bloodPressure: float = Field(..., description="Blood pressure (mm/Hg)")
    specificGravity: float = Field(..., description="Specific gravity")
    albumin: float = Field(..., description="Urine albumin")
    sugar: float = Field(..., description="Urine sugar")
    redBloodCells: int = Field(..., description="Red blood cells (encoded)")
    pusCells: int = Field(..., description="Pus cells (encoded)")
    pusCellClumps: int = Field(..., description="Pus cell clumps (encoded)")
    bacteria: int = Field(..., description="Bacteria (encoded)")
    bloodGlucoseRandom: float = Field(..., description="Random blood glucose")
    bloodUrea: float = Field(..., description="Blood urea")
    serumCreatinine: float = Field(..., description="Serum creatinine")
    sodium: float = Field(..., description="Sodium")
    potassium: float = Field(..., description="Potassium")
    haemoglobin: float = Field(..., description="Haemoglobin")
    packedCellVolume: float = Field(..., description="Packed cell volume")
    whiteBloodCellCount: float = Field(..., description="White blood cell count")
    redBloodCellCount: float = Field(..., description="Red blood cell count")
    hypertension: int = Field(..., description="Hypertension (0/1)")
    diabetesMellitus: int = Field(..., description="Diabetes mellitus (0/1)")
    coronaryArteryDisease: int = Field(..., description="Coronary artery disease (0/1)")
    appetite: int = Field(..., description="Appetite (encoded)")
    pedalEdema: int = Field(..., description="Pedal edema (0/1)")
    anemia: int = Field(..., description="Anemia (0/1)")


class PredictionResponse(BaseModel):
    prediction: int
    probability: float


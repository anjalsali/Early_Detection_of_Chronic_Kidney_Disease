export type CKDFeatures = {
  age: number;
  bloodPressure: number;
  specificGravity: number;
  albumin: number;
  sugar: number;
  redBloodCells: number;
  pusCells: number;
  pusCellClumps: number;
  bacteria: number;
  bloodGlucoseRandom: number;
  bloodUrea: number;
  serumCreatinine: number;
  sodium: number;
  potassium: number;
  haemoglobin: number;
  packedCellVolume: number;
  whiteBloodCellCount: number;
  redBloodCellCount: number;
  hypertension: number;
  diabetesMellitus: number;
  coronaryArteryDisease: number;
  appetite: number;
  pedalEdema: number;
  anemia: number;
};

export type PredictionResponse = {
  prediction: number;
  probability: number;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_CKD_API_URL ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

export const predictCKD = async (
  payload: CKDFeatures
): Promise<PredictionResponse> => {
  const url = `${API_BASE_URL}/predict`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 404) {
      throw new Error(
        "API not found. Set NEXT_PUBLIC_CKD_API_URL to your Render URL (no trailing slash) and redeploy."
      );
    }
    let message = text || `Prediction failed: ${res.statusText}`;
    try {
      const json = JSON.parse(text) as { detail?: string };
      if (typeof json.detail === "string") message = json.detail;
    } catch {
      /* use message as-is */
    }
    throw new Error(message);
  }

  return res.json();
};

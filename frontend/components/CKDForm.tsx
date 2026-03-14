"use client";

import { useState, type FormEvent } from "react";
import type { CKDFeatures, PredictionResponse } from "@/lib/api";
import { predictCKD } from "@/lib/api";

const initialFormState: CKDFeatures = {
  age: 0,
  bloodPressure: 0,
  specificGravity: 1.02,
  albumin: 0,
  sugar: 0,
  redBloodCells: 0,
  pusCells: 0,
  pusCellClumps: 0,
  bacteria: 0,
  bloodGlucoseRandom: 0,
  bloodUrea: 0,
  serumCreatinine: 0,
  sodium: 0,
  potassium: 0,
  haemoglobin: 0,
  packedCellVolume: 0,
  whiteBloodCellCount: 0,
  redBloodCellCount: 0,
  hypertension: 0,
  diabetesMellitus: 0,
  coronaryArteryDisease: 0,
  appetite: 0,
  pedalEdema: 0,
  anemia: 0,
};

const NUMERIC_FIELDS: (keyof CKDFeatures)[] = [
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
];

const BINARY_FIELDS: { key: keyof CKDFeatures; label: string }[] = [
  { key: "redBloodCells", label: "Red blood cells (abnormal in urine)" },
  { key: "pusCells", label: "Pus cells (abnormal in urine)" },
  { key: "pusCellClumps", label: "Pus cell clumps present" },
  { key: "bacteria", label: "Bacteria present in urine" },
  { key: "hypertension", label: "Hypertension" },
  { key: "diabetesMellitus", label: "Diabetes mellitus" },
  { key: "coronaryArteryDisease", label: "Coronary artery disease" },
  { key: "appetite", label: "Poor appetite" },
  { key: "pedalEdema", label: "Pedal edema (swollen feet/ankles)" },
  { key: "anemia", label: "Anemia" },
];

const NUMERIC_META: Record<
  string,
  { label: string; unit?: string; normal: string; step: string; min: string }
> = {
  age: { label: "Age", unit: "years", normal: "1–120", step: "1", min: "1" },
  bloodPressure: {
    label: "Blood pressure",
    unit: "mm/Hg (e.g. diastolic or mean)",
    normal: "60–90 diastolic; 90–120 systolic",
    step: "1",
    min: "0",
  },
  specificGravity: {
    label: "Specific gravity (urine)",
    unit: "",
    normal: "1.010–1.025",
    step: "0.01",
    min: "1",
  },
  albumin: { label: "Albumin (urine)", unit: "0–5 scale", normal: "0", step: "0.1", min: "0" },
  sugar: { label: "Sugar (urine)", unit: "0–5 scale", normal: "0", step: "0.1", min: "0" },
  bloodGlucoseRandom: {
    label: "Blood glucose (random)",
    unit: "mg/dL",
    normal: "70–140",
    step: "0.1",
    min: "0",
  },
  bloodUrea: { label: "Blood urea", unit: "mg/dL", normal: "7–20", step: "0.1", min: "0" },
  serumCreatinine: {
    label: "Serum creatinine",
    unit: "mg/dL",
    normal: "0.6–1.2 (adults)",
    step: "0.1",
    min: "0",
  },
  sodium: { label: "Sodium", unit: "mEq/L", normal: "135–145", step: "0.1", min: "0" },
  potassium: { label: "Potassium", unit: "mEq/L", normal: "3.5–5.0", step: "0.1", min: "0" },
  haemoglobin: {
    label: "Haemoglobin",
    unit: "g/dL",
    normal: "12–17 (adults)",
    step: "0.1",
    min: "0",
  },
  packedCellVolume: {
    label: "Packed cell volume (hematocrit)",
    unit: "%",
    normal: "38–50",
    step: "0.1",
    min: "0",
  },
  whiteBloodCellCount: {
    label: "White blood cell count",
    unit: "per µL",
    normal: "4,000–11,000",
    step: "1",
    min: "0",
  },
  redBloodCellCount: {
    label: "Red blood cell count",
    unit: "millions/cmm",
    normal: "4.5–5.5",
    step: "0.1",
    min: "0",
  },
};

type CKDFormProps = {
  onResult: (result: PredictionResponse) => void;
};

const CKDForm = ({ onResult }: CKDFormProps) => {
  const [formState, setFormState] = useState<CKDFeatures>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNumericChange = (field: keyof CKDFeatures) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const value = raw === "" ? 0 : parseFloat(raw);
    setFormState((prev) => ({ ...prev, [field]: isNaN(value) ? 0 : value }));
  };

  const handleBinaryChange = (field: keyof CKDFeatures) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "1" ? 1 : 0;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (formState.age <= 0) {
      setError("Please enter a valid age.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await predictCKD(formState);
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to get prediction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
      aria-label="CKD risk assessment form"
    >
      <div className="rounded-xl border border-red-100 bg-linear-to-br from-red-50/40 to-white p-6 ">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Demographics &amp; vitals
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {NUMERIC_FIELDS.slice(0, 2).map((field) => {
            const meta = NUMERIC_META[field];
            return (
              <div key={field}>
                <label htmlFor={field} className="mb-1 block text-sm font-medium text-zinc-800">
                  {meta?.label ?? field}
                  {meta?.unit && <span className="ml-1 font-normal text-zinc-500">({meta.unit})</span>}
                </label>
                <input
                  id={field}
                  name={field}
                  type="number"
                  inputMode="decimal"
                  step={meta?.step ?? "0.1"}
                  min={meta?.min ?? "0"}
                  value={formState[field] === 0 && field !== "specificGravity" ? "" : formState[field]}
                  onChange={handleNumericChange(field)}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/25 "
                  aria-required={field === "age"}
                  aria-describedby={`${field}-hint`}
                />
                <p id={`${field}-hint`} className="mt-1 text-xs text-zinc-500">
                  Normal range: {meta?.normal ?? "—"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-red-100 bg-linear-to-br from-red-50/40 to-white p-6 ">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Urine &amp; lab values
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NUMERIC_FIELDS.slice(2).map((field) => {
            const meta = NUMERIC_META[field];
            return (
              <div key={field}>
                <label htmlFor={field} className="mb-1 block text-sm font-medium text-zinc-800">
                  {meta?.label ?? field}
                  {meta?.unit && <span className="ml-1 font-normal text-zinc-500">({meta.unit})</span>}
                </label>
                <input
                  id={field}
                  name={field}
                  type="number"
                  inputMode="decimal"
                  step={meta?.step ?? "0.1"}
                  min={meta?.min ?? "0"}
                  value={formState[field] === 0 && field !== "specificGravity" ? "" : formState[field]}
                  onChange={handleNumericChange(field)}
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/25 "
                  aria-describedby={`${field}-hint`}
                />
                <p id={`${field}-hint`} className="mt-1 text-xs text-zinc-500">
                  Normal: {meta?.normal ?? "—"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-red-100 bg-linear-to-br from-red-50/40 to-white p-6 ">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Yes / No — conditions and findings
        </h3>
        <p className="mb-4 text-sm text-zinc-600">
          For each item below, choose <strong>Yes</strong> if the condition or finding is present, otherwise <strong>No</strong>.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {BINARY_FIELDS.map(({ key, label }) => (
            <div key={key} className="rounded-lg border border-zinc-200 bg-white p-4 ">
              <label htmlFor={key} className="mb-2 block text-sm font-medium text-zinc-800">
                {label}
              </label>
              <select
                id={key}
                name={key}
                value={formState[key]}
                onChange={handleBinaryChange(key)}
                className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/25"
                aria-label={`${label}: Yes or No`}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 " role="alert">
          <p className="text-sm font-medium text-red-800 ">{error}</p>
        </div>
      )}

      <p className="text-xs text-amber-700">
        First request may take 30–60 seconds if the server is waking up.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-linear-to-r from-red-600 to-rose-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition hover:from-red-700 hover:to-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
      >
        {isSubmitting ? "Evaluating…" : "Check CKD risk"}
      </button>
    </form>
  );
};

export default CKDForm;

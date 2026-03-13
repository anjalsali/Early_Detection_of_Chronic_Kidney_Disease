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
  { key: "redBloodCells", label: "Red blood cells (abnormal)" },
  { key: "pusCells", label: "Pus cells (abnormal)" },
  { key: "pusCellClumps", label: "Pus cell clumps" },
  { key: "bacteria", label: "Bacteria" },
  { key: "hypertension", label: "Hypertension" },
  { key: "diabetesMellitus", label: "Diabetes mellitus" },
  { key: "coronaryArteryDisease", label: "Coronary artery disease" },
  { key: "appetite", label: "Poor appetite" },
  { key: "pedalEdema", label: "Pedal edema" },
  { key: "anemia", label: "Anemia" },
];

const NUMERIC_LABELS: Record<string, string> = {
  age: "Age (years)",
  bloodPressure: "Blood pressure (mm/Hg)",
  specificGravity: "Specific gravity",
  albumin: "Albumin",
  sugar: "Sugar",
  bloodGlucoseRandom: "Blood glucose random (mg/dL)",
  bloodUrea: "Blood urea (mg/dL)",
  serumCreatinine: "Serum creatinine (mg/dL)",
  sodium: "Sodium (mEq/L)",
  potassium: "Potassium (mEq/L)",
  haemoglobin: "Haemoglobin (g/dL)",
  packedCellVolume: "Packed cell volume",
  whiteBloodCellCount: "White blood cell count",
  redBloodCellCount: "Red blood cell count (millions/cmm)",
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
      className="space-y-6"
      aria-label="CKD risk assessment form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {NUMERIC_FIELDS.map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {NUMERIC_LABELS[field] ?? field}
            </label>
            <input
              id={field}
              name={field}
              type="number"
              inputMode="decimal"
              step={field === "specificGravity" ? 0.01 : field === "age" ? 1 : 0.1}
              min={0}
              value={formState[field] === 0 && field !== "specificGravity" ? "" : formState[field]}
              onChange={handleNumericChange(field)}
              className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              aria-required={field === "age"}
            />
          </div>
        ))}
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Yes / No
        </span>
        <div className="grid gap-3 sm:grid-cols-2">
          {BINARY_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label htmlFor={key} className="sr-only">
                {label}
              </label>
              <select
                id={key}
                name={key}
                value={formState[key]}
                onChange={handleBinaryChange(key)}
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                aria-label={label}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Evaluating…" : "Check CKD risk"}
      </button>
    </form>
  );
};

export default CKDForm;

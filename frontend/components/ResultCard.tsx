"use client";

import type { PredictionResponse } from "@/lib/api";

type ResultCardProps = {
  result: PredictionResponse | null;
};

const ResultCard = ({ result }: ResultCardProps) => {
  if (!result) return null;

  const isCKD = result.prediction === 1;
  const riskPercent = Math.round(result.probability * 100);

  return (
    <section
      className={`mt-8 rounded-xl border p-6 shadow-sm md:mt-0 ${
        isCKD
          ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
          : "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
      }`}
      aria-live="polite"
    >
      <h2 className="text-lg font-semibold">
        {isCKD ? "High likelihood of CKD" : "Low likelihood of CKD"}
      </h2>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        Estimated risk: <span className="font-semibold">{riskPercent}%</span>
      </p>
      <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
        This is a decision-support tool and does not replace clinical judgment.
        Always consult a qualified healthcare professional for diagnosis and
        treatment.
      </p>
    </section>
  );
};

export default ResultCard;

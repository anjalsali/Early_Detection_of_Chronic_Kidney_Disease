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
      className={`mt-8 rounded-2xl border-2 p-6 shadow-lg md:mt-0 md:sticky md:top-24 ${
        isCKD
          ? "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40"
          : "border-teal-400 bg-teal-50 dark:border-teal-700 dark:bg-teal-950/40"
      }`}
      aria-live="polite"
    >
      <h2 className="text-xl font-bold">
        {isCKD ? "High likelihood of CKD" : "Low likelihood of CKD"}
      </h2>
      <p className="mt-3 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
        Estimated risk of CKD: <span className={isCKD ? "text-red-700 dark:text-red-300" : "text-teal-700 dark:text-teal-300"}>{riskPercent}%</span>
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

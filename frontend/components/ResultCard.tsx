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
         className={`mt-8 rounded-2xl border-2 p-6 shadow-xl md:mt-0 md:sticky md:top-24 ${
            isCKD ? "border-rose-400 bg-linear-to-br from-rose-50 to-red-50" : "border-emerald-400 bg-linear-to-br from-emerald-50 to-green-50"
         }`}
         aria-live="polite"
      >
         <h2 className="text-xl font-bold">{isCKD ? "High likelihood of CKD" : "Low likelihood of CKD"}</h2>
         <p className="mt-3 text-2xl font-semibold text-zinc-800">
            Estimated risk of CKD: <span className={isCKD ? "text-rose-700" : "text-emerald-700"}>{riskPercent}%</span>
         </p>
         <p className="mt-4 text-xs text-zinc-600">
            This is a decision-support tool and does not replace clinical judgment. Always consult a qualified healthcare professional for diagnosis and treatment.
         </p>
      </section>
   );
};

export default ResultCard;

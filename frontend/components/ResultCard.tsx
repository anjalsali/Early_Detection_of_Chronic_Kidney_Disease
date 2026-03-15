"use client";

import type { PredictionResponse } from "@/lib/api";

type ResultCardProps = {
   result: PredictionResponse | null;
};

const ResultCard = ({ result }: ResultCardProps) => {
   if (!result) return null;

   const riskPercent = Math.round(result.probability * 100);
   const riskBand = riskPercent < 40 ? "low" : riskPercent <= 75 ? "moderate" : "high";
   const likelihoodLabel =
      riskBand === "high" ? "High likelihood of CKD" : riskBand === "moderate" ? "Moderate likelihood of CKD" : "Low likelihood of CKD";

   const borderShadowClass =
      riskBand === "high"
         ? "border-2 border-red-300 shadow-lg shadow-red-200/50"
         : riskBand === "moderate"
           ? "border-2 border-amber-300 shadow-lg shadow-amber-200/50"
           : "border-2 border-emerald-300 shadow-lg shadow-emerald-200/50";

   return (
      <section className={`mt-8 overflow-hidden rounded-2xl bg-white ${borderShadowClass} md:mt-0 md:sticky md:top-24`} aria-live="polite">
         <div className="border-b border-zinc-100 bg-zinc-50/80 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Assessment result</h2>
         </div>

         <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
               <span
                  className={`inline-flex rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                     riskBand === "high" ? "bg-red-100 text-red-800" : riskBand === "moderate" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}
               >
                  {likelihoodLabel}
               </span>
               <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">Risk band: {riskBand}</span>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
               <span className="text-4xl font-bold tabular-nums text-zinc-900">{riskPercent}</span>
               <span className="text-xl font-medium text-zinc-500">%</span>
            </div>
            <p className="mt-1 text-sm font-medium text-zinc-600">Estimated probability of chronic kidney disease</p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
               <div
                  className={`h-full rounded-full transition-all ${riskBand === "high" ? "bg-red-500" : riskBand === "moderate" ? "bg-amber-500" : "bg-emerald-500"}`}
                  style={{ width: `${Math.min(riskPercent, 100)}%` }}
                  role="progressbar"
                  aria-valuenow={riskPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="CKD risk percentage"
               />
            </div>
            <div className="mt-2 flex justify-between text-xs text-zinc-400">
               <span>0%</span>
               <span>50%</span>
               <span>100%</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-zinc-600">
               Based on the 24 clinical and demographic parameters you entered, the Deep Neural Network (DNN) model estimates a <strong className="text-zinc-800">{riskPercent}%</strong> probability of
               early chronic kidney disease. This result is for <strong>decision support only</strong> and does not replace clinical assessment, laboratory diagnosis, or specialist care.
            </p>

            <div className="mt-5 rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3">
               <p className="text-xs font-medium text-amber-900/90">
                  Disclaimer: NephroSight is a research-based tool. Always consult a qualified healthcare professional for diagnosis and treatment decisions.
               </p>
            </div>
         </div>
      </section>
   );
};

export default ResultCard;

"use client";

import { useState } from "react";
import CKDForm from "@/components/CKDForm";
import ResultCard from "@/components/ResultCard";
import type { PredictionResponse } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleResult = (res: PredictionResponse) => {
    setResult(res);
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 md:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Early detection of chronic kidney disease
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Enter patient details to estimate the likelihood of early CKD. This
          tool is for decision support only.
        </p>
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
          First request may take 30–60 seconds (server waking up).
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,minmax(280px,1fr)]">
          <CKDForm onResult={handleResult} />
          <ResultCard result={result} />
        </div>
      </div>
    </main>
  );
}

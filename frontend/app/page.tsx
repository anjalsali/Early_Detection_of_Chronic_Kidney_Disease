"use client";

import { useState } from "react";
import CKDForm from "@/components/CKDForm";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ResultCard from "@/components/ResultCard";
import Section from "@/components/Section";
import type { PredictionResponse } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleResult = (res: PredictionResponse) => {
    setResult(res);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Hero />

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Section
            id="about"
            title="About this project"
            subtitle="A research-based decision support tool for estimating early chronic kidney disease likelihood."
          >
            <div className="mx-auto max-w-3xl space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-700 dark:bg-zinc-800/30">
              <p className="text-zinc-700 dark:text-zinc-300">
                Chronic kidney disease (CKD) often goes undetected until later stages. This tool uses a machine-learning model trained on clinical and laboratory data to estimate the likelihood of early CKD. It is intended to support clinical reasoning, not to replace professional diagnosis or treatment.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                The model uses inputs such as age, blood pressure, urine and blood test results, and selected medical history. Enter values as they appear in routine clinical or lab reports. Reference ranges are shown to help you enter data in the expected units and scale.
              </p>
            </div>
          </Section>

          <Section
            id="how-it-works"
            title="How it works"
            subtitle="From data entry to risk estimate in a few steps."
            className="mt-24"
          >
            <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">1</span>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">Enter patient data</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Fill in demographics, vitals, lab values, and yes/no conditions. Normal ranges are shown to guide input.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">2</span>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">Get risk estimate</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  The model returns an estimated risk of CKD (percentage) and a simple high/low likelihood result.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">3</span>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">Use as support only</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Use the result to support, not replace, clinical judgment. Always follow local guidelines and specialist advice.
                </p>
              </li>
            </ul>
          </Section>

          <Section
            id="detection"
            title="CKD risk assessment"
            subtitle="Enter patient data below. All fields use the same units and scales as in the form labels and normal ranges."
            className="mt-24"
          >
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,minmax(300px,1fr)]">
              <div className="min-w-0">
                <CKDForm onResult={handleResult} />
              </div>
              <div className="lg:pl-4">
                {result ? (
                  <ResultCard result={result} />
                ) : (
                  <div className="mt-8 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800/30 md:mt-0 md:sticky md:top-24">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Result</p>
                    <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">Submit the form to see the estimated CKD risk here.</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </div>

        <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 md:px-6">
            <p>Early Detection of Chronic Kidney Disease — Decision support only. Not a substitute for professional medical care.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

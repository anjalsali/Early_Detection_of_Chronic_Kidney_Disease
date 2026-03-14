"use client";

import { useState } from "react";
import CKDForm from "@/components/CKDForm";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ResultCard from "@/components/ResultCard";
import Section from "@/components/Section";
import StudyCharts from "@/components/StudyCharts";
import type { PredictionResponse } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleResult = (res: PredictionResponse) => {
    setResult(res);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-zinc-900">
        <Hero />

        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Section
            id="about"
            title="About this project"
            subtitle="MSc research from the University of Hertfordshire on early CKD detection using machine learning."
          >
            <div className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-red-100 bg-linear-to-br from-red-50/60 to-white p-8 shadow-lg shadow-zinc-200/40">
              <p className="text-zinc-700">
                Chronic Kidney Disease (CKD) poses a significant global health challenge: the gradual decline of kidney function can lead to cardiovascular disease, anaemia, bone disorders, and end-stage renal failure. Early stages are often <strong>asymptomatic</strong>, making timely detection difficult. Early detection is critical to intervene with targeted treatments, slow or halt progression, and reduce the need for costly interventions such as dialysis or transplantation.
              </p>
              <p className="text-zinc-700">
                This study uses a comprehensive dataset (clinical and demographic variables) from the <strong>UCI Chronic Kidney Disease repository</strong>—400 patient records with 24 attributes—to examine the effectiveness of three machine learning methods: <strong>Support Vector Machines (SVM)</strong>, <strong>K-Nearest Neighbors (KNN)</strong>, and a <strong>Deep Neural Network (DNN)</strong>. After data collection, cleaning, exploratory data analysis (EDA), and preprocessing (imputation, encoding, SMOTE for class imbalance, MinMax scaling), the models were evaluated using accuracy, precision, recall, F1-score, and AUC. <strong>Comparative analysis showed the DNN achieved the highest accuracy (97.87%)</strong>, followed by KNN (79.2%) and SVM (61.6%), highlighting the algorithms’ strengths and limitations and contributing to the discourse on machine learning in healthcare.
              </p>
              <p className="text-zinc-600 text-sm">
                RenalCheck uses the trained <strong>Deep Neural Network (DNN)</strong> to estimate the <strong>likelihood of early CKD</strong> from the same 24 inputs. It is a <strong>decision-support tool</strong> only and does not replace clinical assessment, laboratory diagnosis, or specialist care. Research: <em>Early Detection of Chronic Kidney Disease Using Machine Learning Techniques</em> (University of Hertfordshire, 2023). Keywords: CKD, SVM, KNN, Deep Neural Network (DNN).
              </p>
            </div>
          </Section>

          <Section
            id="study-results"
            title="Study results at a glance"
            subtitle="Model accuracy, AUC, precision/recall/F1, dataset distribution, and methodology from the research."
            className="mt-24"
          >
            <StudyCharts />
          </Section>

          <Section
            id="how-it-works"
            title="How it works"
            subtitle="Research methodology and how this app uses it to produce a risk estimate."
            className="mt-24"
          >
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                <h3 className="font-semibold text-zinc-900">Data collection and cleaning</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  The <strong>UCI CKD dataset</strong> has 400 instances (250 CKD, 150 not CKD) and <strong>24 clinical attributes</strong>: age, blood pressure, specific gravity, albumin, sugar, red blood cells, pus cells, pus cell clumps, bacteria, blood glucose, blood urea, serum creatinine, sodium, potassium, haemoglobin, packed cell volume, white and red blood cell counts, and binary yes/no for hypertension, diabetes mellitus, coronary artery disease, appetite, pedal oedema, and anaemia. Cleaning included dropping the id column, renaming columns, and converting categorical values (e.g. packed cell volume, WBC, RBC count) to numerical form.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                <h3 className="font-semibold text-zinc-900">Exploratory data analysis (EDA) and preprocessing</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  EDA used <strong>distribution plots</strong> for numerical features and <strong>counterplots</strong> for categorical ones; a <strong>correlation heatmap</strong> identified relationships between attributes. Preprocessing included: <strong>missing value imputation</strong> (random value imputation for numerical columns with higher nulls, mode imputation for categorical); <strong>Label Encoding</strong> for categorical columns (e.g. redBloodCells, pusCells, hypertension, diabetesMellitus, class → 0/1); <strong>SMOTE</strong> to address class imbalance; and <strong>MinMax scaling</strong> to normalise features (e.g. to a fixed range) for model training.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                <h3 className="font-semibold text-zinc-900">Machine learning models and results</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Three models were implemented and evaluated: <strong>SVM</strong> (optimal hyperplane, maximum margin), <strong>KNN</strong> (k-nearest neighbors, Euclidean distance), and <strong>Deep Neural Network (DNN)</strong> (Keras Sequential: input 64 ReLU, dropout 30%; hidden 128 ReLU, dropout 40%; hidden 64 ReLU, dropout 30%; output 1 sigmoid; Adam optimizer, binary cross-entropy). Evaluation used <strong>accuracy, precision, recall, F1-score, and AUC-ROC</strong>. The <strong>DNN achieved the highest accuracy (97.87%)</strong>, with perfect precision, recall, and F1 for the test set; KNN reached 79.2% and SVM 61.6%. <strong>Risk assessment in this app is powered by the DNN</strong>: your 24 inputs are mapped to an estimated probability of CKD, shown as a percentage and as high/low likelihood, for decision support only.
                </p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-3">
                <li className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-red-100 to-rose-100 text-lg font-bold text-red-800">1</span>
                  <h3 className="mt-4 font-semibold text-zinc-900">Enter the 24 attributes</h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Fill in demographics, vitals, urine and blood lab values, and yes/no conditions. Normal ranges are shown to guide input in the expected units.
                  </p>
                </li>
                <li className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-red-100 to-rose-100 text-lg font-bold text-red-800">2</span>
                  <h3 className="mt-4 font-semibold text-zinc-900">Get the risk estimate</h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    The DNN model returns an estimated risk of CKD (percentage) and a high/low likelihood result, for use as decision support only.
                  </p>
                </li>
                <li className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-red-100 to-rose-100 text-lg font-bold text-red-800">3</span>
                  <h3 className="mt-4 font-semibold text-zinc-900">Use as support only</h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    The result does not replace clinical judgment, lab diagnosis, or specialist care. Always follow local guidelines and professional advice.
                  </p>
                </li>
              </ul>
            </div>
          </Section>

          <Section
            id="detection"
            title="CKD risk assessment"
            subtitle="Enter patient data below. Predictions use the Deep Neural Network (DNN) model. All fields use the same units and scales as in the form labels and normal ranges."
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
                  <div className="mt-8 rounded-2xl border-2 border-dashed border-red-200 bg-red-50/30 p-8 text-center md:mt-0 md:sticky md:top-24">
                    <p className="text-sm font-medium text-zinc-500">Result</p>
                    <p className="mt-2 text-sm text-zinc-400">Submit the form to see the estimated CKD risk here.</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </div>

        <footer className="border-t border-red-100 bg-linear-to-b from-slate-50 to-white py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 md:px-6">
            <p>RenalCheck — Decision support only. Not a substitute for professional medical care.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

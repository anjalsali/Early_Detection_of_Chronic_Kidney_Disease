"use client";

import Image from "next/image";
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
               <Section id="about" title="About this project" subtitle="A Research Project on Early detection of Chronic Kidney Disease using machine learning.">
                  <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-red-100 bg-linear-to-br from-red-50/60 to-white shadow-lg shadow-zinc-200/40">
                     <div className="p-6 md:p-8">
                        <Image
                           src="/kidney-preview.png"
                           alt="Kidney anatomy — context for chronic kidney disease"
                           width={720}
                           height={540}
                           className="float-none block w-full max-w-md object-cover md:float-right md:max-w-[55%] md:w-[55%]"
                           sizes="(max-width: 768px) 100vw, 55vw"
                           priority={false}
                        />
                        <p className="text-zinc-700">
                           Chronic Kidney Disease (CKD) poses a significant global health challenge: the gradual decline of kidney function can lead to cardiovascular disease, anaemia, bone disorders,
                           and end-stage renal failure. Early stages are often <strong>asymptomatic</strong>, making timely detection difficult. Early detection is critical to intervene with targeted
                           treatments, slow or halt progression, and reduce the need for costly interventions such as dialysis or transplantation.
                        </p>
                        <p className="mt-5 text-zinc-700">
                           This study uses a comprehensive dataset (clinical and demographic variables) from the <strong>UCI Chronic Kidney Disease repository</strong>—400 patient records with 24
                           attributes—to examine the effectiveness of three machine learning methods: <strong>Support Vector Machines (SVM)</strong>, <strong>K-Nearest Neighbors (KNN)</strong>, and a{" "}
                           <strong>Deep Neural Network (DNN)</strong>. After data collection, cleaning, exploratory data analysis (EDA), and preprocessing (imputation, encoding, SMOTE for class
                           imbalance, MinMax scaling), the models were evaluated using accuracy, precision, recall, F1-score, and AUC.{" "}
                           <strong>Comparative analysis showed the DNN achieved the highest accuracy (97.87%)</strong>, followed by KNN (79.2%) and SVM (61.6%), highlighting the algorithms’ strengths
                           and limitations and contributing to the discourse on machine learning in healthcare.
                        </p>
                        <p className="mt-5 text-zinc-600 text-sm">
                           RenalCheck uses the trained <strong>Deep Neural Network (DNN)</strong> to estimate the <strong>likelihood of early CKD</strong> from the same 24 inputs. It is a{" "}
                           <strong>decision-support tool</strong> only and does not replace clinical assessment, laboratory diagnosis, or specialist care.{" "}
                           <strong>Dataset:</strong> UCI Chronic Kidney Disease dataset (UCI Machine Learning Repository). Research:{" "}
                           <em>Early Detection of Chronic Kidney Disease Using Machine Learning Techniques</em> (Anjal Sali, University of Hertfordshire, 2024). Keywords: CKD, SVM, KNN, Deep Neural
                           Network (DNN).
                        </p>
                        <div className="clear-both" />
                     </div>
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

               <Section id="how-it-works" title="How it works" subtitle="Research methodology and how this app uses it to produce a risk estimate." className="mt-24">
                  <div className="mx-auto max-w-4xl space-y-8">
                     <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                        <h3 className="font-semibold text-zinc-900">Data collection and cleaning</h3>
                        <p className="mt-2 text-sm text-zinc-600">
                           The <strong>UCI CKD dataset</strong> has 400 instances (250 CKD, 150 not CKD) and <strong>24 clinical attributes</strong>: age, blood pressure, specific gravity, albumin,
                           sugar, red blood cells, pus cells, pus cell clumps, bacteria, blood glucose, blood urea, serum creatinine, sodium, potassium, haemoglobin, packed cell volume, white and red
                           blood cell counts, and binary yes/no for hypertension, diabetes mellitus, coronary artery disease, appetite, pedal oedema, and anaemia. Cleaning included dropping the id
                           column, renaming columns, and converting categorical values (e.g. packed cell volume, WBC, RBC count) to numerical form.
                        </p>
                     </div>
                     <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                        <h3 className="font-semibold text-zinc-900">Exploratory data analysis (EDA) and preprocessing</h3>
                        <p className="mt-2 text-sm text-zinc-600">
                           EDA used <strong>distribution plots</strong> for numerical features and <strong>counterplots</strong> for categorical ones; a <strong>correlation heatmap</strong> identified
                           relationships between attributes. Preprocessing included: <strong>missing value imputation</strong> (random value imputation for numerical columns with higher nulls, mode
                           imputation for categorical); <strong>Label Encoding</strong> for categorical columns (e.g. redBloodCells, pusCells, hypertension, diabetesMellitus, class → 0/1);{" "}
                           <strong>SMOTE</strong> to address class imbalance; and <strong>MinMax scaling</strong> to normalise features (e.g. to a fixed range) for model training.
                        </p>
                     </div>
                     <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                        <h3 className="font-semibold text-zinc-900">Machine learning models and results</h3>
                        <p className="mt-2 text-sm text-zinc-600">
                           Three models were implemented and evaluated: <strong>SVM</strong> (optimal hyperplane, maximum margin), <strong>KNN</strong> (k-nearest neighbors, Euclidean distance), and{" "}
                           <strong>Deep Neural Network (DNN)</strong> (Keras Sequential: input 64 ReLU, dropout 30%; hidden 128 ReLU, dropout 40%; hidden 64 ReLU, dropout 30%; output 1 sigmoid; Adam
                           optimizer, binary cross-entropy). Evaluation used <strong>accuracy, precision, recall, F1-score, and AUC-ROC</strong>. The{" "}
                           <strong>DNN achieved the highest accuracy (97.87%)</strong>, with perfect precision, recall, and F1 for the test set; KNN reached 79.2% and SVM 61.6%.{" "}
                           <strong>Risk assessment in this app is powered by the DNN</strong>: your 24 inputs are mapped to an estimated probability of CKD, shown as a percentage and as high/low
                           likelihood, for decision support only.
                        </p>
                     </div>
                     <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                        <h3 className="font-semibold text-zinc-900">The 24 input parameters</h3>
                        <p className="mt-2 text-sm text-zinc-600">
                           The same <strong>24 clinical and demographic attributes</strong> from the UCI CKD dataset are used both to train the DNN and to produce a risk estimate in this app. Each value
                           you enter is preprocessed the same way as in the study (MinMax scaling, categorical encoding), then passed through the trained model. Below, parameters are grouped by
                           category for comparison; units and normal ranges match the form and the original dataset.
                        </p>
                        <div className="mt-6 overflow-x-auto">
                           <table className="w-full min-w-[640px] border-collapse text-left text-sm" aria-label="CKD model parameters by category">
                              <thead>
                                 <tr className="border-b border-zinc-200 bg-zinc-50/80">
                                    <th className="py-3 pr-4 font-semibold text-zinc-900">Parameter</th>
                                    <th className="py-3 pr-4 font-semibold text-zinc-900">Category</th>
                                    <th className="py-3 pr-4 font-semibold text-zinc-900">Unit / format</th>
                                    <th className="py-3 font-semibold text-zinc-900">Role in CKD assessment</th>
                                 </tr>
                              </thead>
                              <tbody className="text-zinc-600">
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Age</td>
                                    <td className="py-2.5 pr-4">Demographics &amp; vitals</td>
                                    <td className="py-2.5 pr-4">Years</td>
                                    <td className="py-2.5">Risk increases with age; used as a demographic factor.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Blood pressure</td>
                                    <td className="py-2.5 pr-4">Demographics &amp; vitals</td>
                                    <td className="py-2.5 pr-4">mm/Hg</td>
                                    <td className="py-2.5">Hypertension is a major risk factor and can both cause and result from CKD.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Specific gravity (urine)</td>
                                    <td className="py-2.5 pr-4">Urine tests</td>
                                    <td className="py-2.5 pr-4">1.010–1.025</td>
                                    <td className="py-2.5">Low values can indicate poor concentrating ability of the kidneys.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Albumin (urine)</td>
                                    <td className="py-2.5 pr-4">Urine tests</td>
                                    <td className="py-2.5 pr-4">0–5 scale</td>
                                    <td className="py-2.5">Proteinuria (elevated albumin) is a key marker of kidney damage.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Sugar (urine)</td>
                                    <td className="py-2.5 pr-4">Urine tests</td>
                                    <td className="py-2.5 pr-4">0–5 scale</td>
                                    <td className="py-2.5">Glycosuria can reflect diabetes, a leading cause of CKD.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Red blood cells (urine)</td>
                                    <td className="py-2.5 pr-4">Urine (binary)</td>
                                    <td className="py-2.5 pr-4">Normal / abnormal</td>
                                    <td className="py-2.5">Haematuria may indicate glomerular or other kidney pathology.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Pus cells (urine)</td>
                                    <td className="py-2.5 pr-4">Urine (binary)</td>
                                    <td className="py-2.5 pr-4">Normal / abnormal</td>
                                    <td className="py-2.5">Pyuria can suggest infection or inflammation.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Pus cell clumps</td>
                                    <td className="py-2.5 pr-4">Urine (binary)</td>
                                    <td className="py-2.5 pr-4">Present / not present</td>
                                    <td className="py-2.5">Additional urine sediment finding.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Bacteria (urine)</td>
                                    <td className="py-2.5 pr-4">Urine (binary)</td>
                                    <td className="py-2.5 pr-4">Present / not present</td>
                                    <td className="py-2.5">Bacteriuria can indicate UTI; recurrent infections may affect kidney function.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Blood glucose (random)</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">mg/dL</td>
                                    <td className="py-2.5">Diabetes is a leading cause of CKD; glucose level is a proxy for control.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Blood urea</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">mg/dL</td>
                                    <td className="py-2.5">Elevated urea often reflects reduced glomerular filtration (kidney function).</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Serum creatinine</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">mg/dL</td>
                                    <td className="py-2.5">Primary marker of kidney function; raised levels indicate impaired filtration.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Sodium</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">mEq/L</td>
                                    <td className="py-2.5">Electrolyte imbalance can occur in CKD; used with potassium for context.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Potassium</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">mEq/L</td>
                                    <td className="py-2.5">Hyperkalaemia is common in advanced CKD; critical for risk stratification.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Haemoglobin</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">g/dL</td>
                                    <td className="py-2.5">Anaemia is a frequent complication of CKD (reduced EPO).</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Packed cell volume (hematocrit)</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">%</td>
                                    <td className="py-2.5">Correlates with haemoglobin; low values support anaemia.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">White blood cell count</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">per µL</td>
                                    <td className="py-2.5">Infection or inflammation marker; context for urine findings.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Red blood cell count</td>
                                    <td className="py-2.5 pr-4">Blood tests</td>
                                    <td className="py-2.5 pr-4">millions/cmm</td>
                                    <td className="py-2.5">Low count can indicate anaemia associated with CKD.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Hypertension</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Major cause and consequence of CKD; strong risk factor.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Diabetes mellitus</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Leading cause of CKD; diabetic nephropathy is common.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Coronary artery disease</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Cardiovascular comorbidity; CKD and CVD often coexist.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Poor appetite</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Symptom of uraemia and advancing CKD.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Pedal oedema</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Fluid retention; can reflect volume overload in kidney disease.</td>
                                 </tr>
                                 <tr className="border-b border-zinc-100">
                                    <td className="py-2.5 pr-4 font-medium text-zinc-800">Anaemia</td>
                                    <td className="py-2.5 pr-4">Clinical (yes/no)</td>
                                    <td className="py-2.5 pr-4">Yes / No</td>
                                    <td className="py-2.5">Common complication of CKD; reinforces haemoglobin/PCV.</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <p className="mt-4 text-sm text-zinc-500">
                           In the app, numerical parameters use the units above; binary and categorical inputs are encoded (e.g. 0/1) before being scaled with the same preprocessor used in training. The
                           DNN then outputs a single probability, which is shown as a percentage and classified as high or low likelihood.
                        </p>
                     </div>
                     <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
                        <h3 className="font-semibold text-zinc-900">From form to risk estimate</h3>
                        <p className="mt-2 text-sm text-zinc-600">
                           When you submit the risk assessment form: (1) your <strong>24 inputs</strong> are sent to the backend in the same structure as the UCI dataset; (2) the same{" "}
                           <strong>preprocessor</strong> (saved from training) applies MinMax scaling and any encoding so the feature vector matches what the DNN was trained on; (3) the{" "}
                           <strong>trained DNN</strong> produces a probability between 0 and 1; (4) the app displays this as a <strong>percentage</strong> and a <strong>high/low likelihood</strong> label
                           (threshold 50%). This pipeline is identical in structure to the research workflow—only the input source changes (user form instead of dataset rows).
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
                           <p className="mt-2 text-sm text-zinc-600">The DNN model returns an estimated risk of CKD (percentage) and a high/low likelihood result, for use as decision support only.</p>
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

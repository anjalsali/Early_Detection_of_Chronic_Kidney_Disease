"use client";

// Distinct palette: DNN = red (brand), KNN = emerald, SVM = amber (easy to tell apart in every chart)
const DNN_COLOR = "rgb(220, 38, 38)";   // red-600
const KNN_COLOR = "rgb(5, 150, 105)";    // emerald-600
const SVM_COLOR = "rgb(217, 119, 6)";    // amber-600
const NOT_CKD_COLOR = "rgb(71, 85, 105)"; // slate-600

const MODEL_ACCURACY = [
  { name: "Deep Neural Network", value: 97.87, color: DNN_COLOR },
  { name: "K-Nearest Neighbors", value: 79.2, color: KNN_COLOR },
  { name: "Support Vector Machine", value: 61.6, color: SVM_COLOR },
];

const MODEL_AUC = [
  { name: "Deep Neural Network", value: 100, color: DNN_COLOR },
  { name: "K-Nearest Neighbors", value: 91, color: KNN_COLOR },
  { name: "Support Vector Machine", value: 65, color: SVM_COLOR },
];

const MODEL_METRICS = [
  { name: "Deep Neural Network", precision: 100, recall: 100, f1: 100, color: DNN_COLOR },
  { name: "K-Nearest Neighbors", precision: 71, recall: 84.6, f1: 77, color: KNN_COLOR },
  { name: "Support Vector Machine", precision: 34.9, recall: 75.9, f1: 47.9, color: SVM_COLOR },
];

const DATASET_DISTRIBUTION = [
  { label: "CKD", value: 250, pct: 62.5, color: DNN_COLOR },
  { label: "Not CKD", value: 150, pct: 37.5, color: NOT_CKD_COLOR },
];

const METHODOLOGY_STEPS = [
  "Data collection",
  "Cleaning",
  "EDA",
  "Preprocessing",
  "Models (SVM, KNN, DNN)",
  "Evaluation",
];

// Confusion matrix: rows = Actual (CKD, Not CKD), cols = Predicted (CKD, Not CKD)
// [[TP, FN], [FP, TN]]
const CONFUSION_MATRICES = [
  { name: "Support Vector Machine", matrix: [[22, 7], [41, 55]], color: SVM_COLOR },
  { name: "K-Nearest Neighbors", matrix: [[44, 7], [19, 55]], color: KNN_COLOR },
  { name: "Deep Neural Network", matrix: [[61, 0], [0, 62]], color: DNN_COLOR },
];

// ROC: viewBox 0 0 100 100, x=FPR*100, y=(1-TPR)*100. Diagonal = random.
const ROC_CURVES = [
  { name: "DNN (AUC 1.0)", auc: 1.0, color: DNN_COLOR, path: "M 0 100 L 0 0 L 100 0" },
  { name: "KNN (AUC 0.91)", auc: 0.91, color: KNN_COLOR, path: "M 0 100 C 8 80 25 25 100 0" },
  { name: "SVM (AUC 0.65)", auc: 0.65, color: SVM_COLOR, path: "M 0 100 C 45 65 55 35 100 0" },
];

const BarRow = ({
  label,
  value,
  color,
  max = 100,
}: {
  label: string;
  value: number;
  color: string;
  max?: number;
}) => (
  <div>
    <div className="mb-1 flex items-center justify-between text-sm">
      <span className="font-medium text-zinc-700">{label}</span>
      <span className="tabular-nums text-zinc-600">
        {value}%
      </span>
    </div>
    <div
      className="h-3 overflow-hidden rounded-full bg-zinc-100"
      role="img"
      aria-label={`${label}: ${value}%`}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, (value / max) * 100)}%`,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
);

const chartCardClass = "rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/50";

const MODEL_LEGEND = [
  { name: "DNN", color: DNN_COLOR },
  { name: "KNN", color: KNN_COLOR },
  { name: "SVM", color: SVM_COLOR },
] as const;

const StudyCharts = () => (
  <div className="space-y-10">
    <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-red-50/50 py-3 px-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Model colours</span>
      {MODEL_LEGEND.map(({ name, color }) => (
        <span key={name} className="flex items-center gap-2 text-sm font-medium text-zinc-700">
          <span className="h-3.5 w-3.5 rounded-full ring-2 ring-white shadow" style={{ backgroundColor: color }} aria-hidden />
          {name}
        </span>
      ))}
    </div>
    <div className="grid gap-8 md:grid-cols-2">
      <div className={chartCardClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Model accuracy comparison
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          Test set accuracy (%)
        </p>
        <div className="mt-6 space-y-4">
          {MODEL_ACCURACY.map((item) => (
            <BarRow key={item.name} label={item.name} value={item.value} color={item.color} />
          ))}
        </div>
      </div>

      <div className={chartCardClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
          AUC (Area Under ROC Curve)
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          Ability to distinguish CKD vs not CKD (×100)
        </p>
        <div className="mt-6 space-y-4">
          {MODEL_AUC.map((item) => (
            <BarRow key={item.name} label={item.name} value={item.value} color={item.color} max={100} />
          ))}
        </div>
      </div>
    </div>

    <div className={chartCardClass}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Precision, recall &amp; F1-score by model
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        Test set metrics (%)
      </p>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[280px] space-y-5">
          {MODEL_METRICS.map((model) => (
            <div key={model.name} className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">
                {model.name}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="mb-0.5 text-xs text-zinc-500">Precision</p>
                  <div className="h-2 overflow-hidden rounded bg-zinc-100">
                    <div
                      className="h-full rounded transition-all duration-700"
                      style={{
                        width: `${model.precision}%`,
                        backgroundColor: model.color,
                      }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs tabular-nums text-zinc-600">
                    {model.precision}%
                  </p>
                </div>
                <div>
                  <p className="mb-0.5 text-xs text-zinc-500">Recall</p>
                  <div className="h-2 overflow-hidden rounded bg-zinc-100">
                    <div
                      className="h-full rounded transition-all duration-700"
                      style={{
                        width: `${model.recall}%`,
                        backgroundColor: model.color,
                      }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs tabular-nums text-zinc-600">
                    {model.recall}%
                  </p>
                </div>
                <div>
                  <p className="mb-0.5 text-xs text-zinc-500">F1-score</p>
                  <div className="h-2 overflow-hidden rounded bg-zinc-100">
                    <div
                      className="h-full rounded transition-all duration-700"
                      style={{
                        width: `${model.f1}%`,
                        backgroundColor: model.color,
                      }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs tabular-nums text-zinc-600">
                    {model.f1}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
      <div className={chartCardClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Dataset class distribution
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          UCI CKD dataset (n = 400)
        </p>
        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="relative h-40 w-40 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
              {DATASET_DISTRIBUTION.map((item, i) => {
                const circumference = 2 * Math.PI * 40;
                const dashLength = (item.pct / 100) * circumference;
                const offset = DATASET_DISTRIBUTION.slice(0, i).reduce(
                  (s, x) => s + (x.pct / 100) * circumference,
                  0
                );
                return (
                  <circle
                    key={item.label}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={`${dashLength} ${circumference}`}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 50 50)"
                  />
                );
              })}
            </svg>
          </div>
          <ul className="space-y-2">
            {DATASET_DISTRIBUTION.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-zinc-700"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
                <span>
                  {item.label}: {item.value} ({item.pct}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={chartCardClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Methodology pipeline
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          Research workflow
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {METHODOLOGY_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-red-200 bg-red-50/90 px-3 py-1.5 text-xs font-medium text-red-800 ">
                {step}
              </span>
              {i < METHODOLOGY_STEPS.length - 1 && (
                <span className="text-zinc-300" aria-hidden>
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Confusion matrices */}
    <div className={chartCardClass}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Confusion matrices
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        Rows = Actual, Columns = Predicted (CKD | Not CKD). TP, FN, FP, TN.
      </p>
      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        {CONFUSION_MATRICES.map(({ name, matrix, color }) => (
          <div key={name} className="flex flex-col items-center">
            <p className="mb-3 text-center text-sm font-medium text-zinc-700">
              {name}
            </p>
            <table className="w-full max-w-[180px] border-collapse rounded-lg border border-zinc-200" role="figure" aria-label={`Confusion matrix for ${name}`}>
              <thead>
                <tr>
                  <th className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-500  " scope="col" />
                  <th className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-500  " scope="col">Pred. CKD</th>
                  <th className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-500  " scope="col">Pred. Not</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-left text-xs font-medium text-zinc-500  " scope="row">Actual CKD</th>
                  <td className="border border-zinc-200 px-2 py-2 text-center text-sm font-semibold " style={{ backgroundColor: color.replace("rgb", "rgba").replace(")", ", 0.15)") }}>{matrix[0][0]}</td>
                  <td className="border border-zinc-200 px-2 py-2 text-center text-sm ">{matrix[0][1]}</td>
                </tr>
                <tr>
                  <th className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-left text-xs font-medium text-zinc-500  " scope="row">Actual Not</th>
                  <td className="border border-zinc-200 px-2 py-2 text-center text-sm ">{matrix[1][0]}</td>
                  <td className="border border-zinc-200 px-2 py-2 text-center text-sm font-semibold " style={{ backgroundColor: color.replace("rgb", "rgba").replace(")", ", 0.15)") }}>{matrix[1][1]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>

    {/* ROC curves - separate per model */}
    <div className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">
        ROC curves
      </h3>
      <p className="text-xs text-zinc-500">
        True Positive Rate vs False Positive Rate. Diagonal = random classifier (AUC 0.5).
      </p>
      <div className="grid gap-8 sm:grid-cols-3">
        {ROC_CURVES.map(({ name, path, color, auc }) => (
          <div key={name} className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-lg shadow-zinc-200/40">
            <p className="mb-3 text-center text-sm font-medium text-zinc-700">
              {name}
            </p>
            <div className="flex justify-center">
              <svg viewBox="0 0 100 100" className="h-52 w-52 max-w-full" aria-label={`ROC curve ${name}, AUC ${auc}`}>
                <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300" />
                <line x1="0" y1="100" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300" />
                <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-zinc-400" />
                <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StudyCharts;

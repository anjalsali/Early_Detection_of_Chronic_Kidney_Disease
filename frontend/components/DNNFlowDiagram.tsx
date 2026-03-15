"use client";

/**
 * Visual flow: Form inputs → Preprocessing → DNN → Temperature scaling → P(CKD) %
 * Matches backend pipeline (train_dnn.py + predict.py).
 */
export default function DNNFlowDiagram() {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-zinc-200/40">
      <h3 className="font-semibold text-zinc-900">From your inputs to CKD risk %</h3>
      <p className="mt-1 text-sm text-zinc-500">
        Pipeline used by this app (simplified)
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4" role="img" aria-label="Flow: 24 form inputs, then preprocess impute and scale, then DNN layers 128 to 64 to 32 to 1 logit, then temperature scaling, then P(CKD) percent.">
        {/* 24 inputs */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-xl border-2 border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center"
            aria-hidden
          >
            <span className="block text-2xl font-bold text-emerald-800">24</span>
            <span className="block text-xs font-medium text-emerald-700">inputs</span>
          </div>
          <span className="mt-1 text-xs text-zinc-500">Form data</span>
        </div>

        <Arrow />

        {/* Preprocess */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-xl border-2 border-amber-200 bg-amber-50/80 px-4 py-3 text-center min-w-[100px]"
            aria-hidden
          >
            <span className="block text-sm font-bold text-amber-800">Impute</span>
            <span className="block text-sm font-bold text-amber-800">+ Scale</span>
          </div>
          <span className="mt-1 text-xs text-zinc-500">Preprocess</span>
        </div>

        <Arrow />

        {/* DNN blocks */}
        <div className="flex flex-col items-center">
          <div className="flex items-stretch gap-1 rounded-xl border-2 border-red-200 bg-red-50/80 p-2" aria-hidden>
            <div className="rounded-lg bg-red-100/80 px-2 py-2 text-center">
              <span className="block text-xs font-bold text-red-800">128</span>
              <span className="block text-[10px] text-red-700">ReLU</span>
            </div>
            <div className="rounded-lg bg-red-100/80 px-2 py-2 text-center">
              <span className="block text-xs font-bold text-red-800">64</span>
              <span className="block text-[10px] text-red-700">ReLU</span>
            </div>
            <div className="rounded-lg bg-red-100/80 px-2 py-2 text-center">
              <span className="block text-xs font-bold text-red-800">32</span>
              <span className="block text-[10px] text-red-700">ReLU</span>
            </div>
            <div className="rounded-lg bg-red-200/80 px-2 py-2 text-center">
              <span className="block text-xs font-bold text-red-900">1</span>
              <span className="block text-[10px] text-red-800">logit</span>
            </div>
          </div>
          <span className="mt-1 text-xs text-zinc-500">DNN</span>
        </div>

        <Arrow />

        {/* Temperature */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-xl border-2 border-violet-200 bg-violet-50/80 px-4 py-3 text-center"
            aria-hidden
          >
            <span className="block text-sm font-bold text-violet-800">T-scale</span>
          </div>
          <span className="mt-1 text-xs text-zinc-500">Calibrate</span>
        </div>

        <Arrow />

        {/* Output */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-xl border-2 border-zinc-300 bg-zinc-100 px-4 py-3 text-center"
            aria-hidden
          >
            <span className="block text-2xl font-bold text-zinc-800">P(CKD)</span>
            <span className="block text-xs font-medium text-zinc-600">%</span>
          </div>
          <span className="mt-1 text-xs text-zinc-500">Risk %</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-zinc-500 text-center">
        Dropout and batch norm applied in the DNN; logits converted to probability with temperature scaling.
      </p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex shrink-0 items-center text-zinc-300" aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );
}

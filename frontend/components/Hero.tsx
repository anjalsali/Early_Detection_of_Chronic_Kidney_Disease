"use client";

const GITHUB_REPO_URL =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/anjalsali/Early_Detection_of_Chronic_Kidney_Disease";

const heroButtonClass =
  "inline-flex min-w-[200px] items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

const Hero = () => (
  <section
    id="hero"
    className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center md:pt-32"
  >
    <div className="absolute inset-0 bg-linear-to-b from-red-50/80 via-white to-slate-50/50" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(220,38,38,0.12),transparent_50%)]" />
    <div className="relative z-10 mx-auto max-w-3xl space-y-8">
      <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl [font-family:var(--font-plus-jakarta),ui-sans-serif,sans-serif]">
        <span className="text-red-700">Renal</span>
        <span className="text-slate-800">Check</span>
      </h1>
      <p className="text-2xl font-medium text-zinc-700 md:text-3xl lg:text-4xl" role="doc-subtitle">
        Early detection of{" "}
        <span className="bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Chronic Kidney Disease</span>
      </p>
      <p className="text-lg text-zinc-600 md:text-xl">
        A decision-support tool that estimates CKD risk from routine clinical and lab values. For healthcare professionals and research use.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <a
          href="#detection"
          className={`${heroButtonClass} bg-linear-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:scale-105 hover:from-red-700 hover:to-rose-700 hover:shadow-xl hover:shadow-red-500/40 focus-visible:outline-red-600`}
        >
          Risk Assessment
        </a>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${heroButtonClass} gap-2 border-2 border-black bg-white text-zinc-900 hover:scale-105 hover:bg-zinc-100 hover:shadow-lg hover:shadow-zinc-300/50 focus-visible:outline-black`}
          aria-label="View project on GitHub"
        >
          <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Hero;

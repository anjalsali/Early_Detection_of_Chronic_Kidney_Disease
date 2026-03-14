"use client";

const Hero = () => (
  <section
    id="hero"
    className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center md:pt-32"
  >
    <div className="absolute inset-0 bg-linear-to-b from-violet-50/80 via-white to-slate-50/50" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent_50%)]" />
    <div className="relative z-10 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
        Early detection of{" "}
        <span className="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          chronic kidney disease
        </span>
      </h1>
      <p className="mt-6 text-lg text-zinc-600 md:text-xl">
        A decision-support tool that estimates the likelihood of early CKD from routine clinical and lab values. For healthcare professionals and research use.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#detection"
          className="inline-flex items-center rounded-xl bg-linear-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:from-violet-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          Start risk assessment
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center rounded-xl border-2 border-violet-200 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700 hover:border-violet-300 hover:bg-violet-50/80"
        >
          How it works
        </a>
      </div>
    </div>
  </section>
);

export default Hero;

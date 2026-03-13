"use client";

const Hero = () => (
  <section
    id="hero"
    className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center md:pt-32"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.08),transparent)]" />
    <div className="relative z-10 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
        Early detection of{" "}
        <span className="text-teal-600 dark:text-teal-400">chronic kidney disease</span>
      </h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
        A decision-support tool that estimates the likelihood of early CKD from routine clinical and lab values. For healthcare professionals and research use.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#detection"
          className="inline-flex items-center rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Start risk assessment
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          How it works
        </a>
      </div>
    </div>
  </section>
);

export default Hero;

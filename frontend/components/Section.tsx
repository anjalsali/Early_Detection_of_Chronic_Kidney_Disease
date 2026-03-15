"use client";

import { useInView } from "@/hooks/useInView";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  /** When true, subtitle uses full width of the section instead of max-w-2xl. */
  subtitleFullWidth?: boolean;
};

const Section = ({ id, children, className = "", title, subtitle, subtitleFullWidth }: SectionProps) => {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-24 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">{title}</h2>}
          {subtitle && (
            <p
              className={`mt-3 text-zinc-600 ${subtitleFullWidth ? "w-full text-left" : "max-w-2xl mx-auto"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;

"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return [ref, inView];
}

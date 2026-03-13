"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#detection", label: "Risk assessment" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur dark:bg-zinc-900/95" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6" aria-label="Main navigation">
        <a href="#hero" className="text-lg font-semibold text-teal-700 dark:text-teal-300">
          CKD Early Detection
        </a>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-zinc-600 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="rounded p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <ul className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="block py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
                onClick={handleNavClick}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;

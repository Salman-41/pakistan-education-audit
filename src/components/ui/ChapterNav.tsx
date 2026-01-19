"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const chapters = [
  { id: "context", label: "Context", number: 1 },
  { id: "disparities", label: "Disparities", number: 2 },
  { id: "systems", label: "Systems", number: 3 },
  { id: "patterns", label: "Patterns", number: 4 },
  { id: "interpretation", label: "Interpretation", number: 5 },
];

export function ChapterNav() {
  const [activeChapter, setActiveChapter] = useState("context");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Update pill position when active chapter changes
  useEffect(() => {
    const activeButton = buttonsRef.current.get(activeChapter);
    if (activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setPillStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeChapter, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Update active chapter based on scroll position
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveChapter(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleScroll = () => setIsMobileMenuOpen(false);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobileMenuOpen]);

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const setButtonRef = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      buttonsRef.current.set(id, el);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 hidden md:block ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          ref={navRef}
          className="relative flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-xl rounded-full shadow-lg shadow-slate-200/50 border border-slate-200/50"
        >
          {/* Animated pill background */}
          <div
            className="absolute top-1.5 h-[calc(100%-12px)] bg-slate-900 rounded-full transition-all duration-300 ease-out"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
            }}
          />

          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              ref={setButtonRef(chapter.id)}
              onClick={() => scrollToChapter(chapter.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                activeChapter === chapter.id
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label={`Go to ${chapter.label}`}
              aria-current={activeChapter === chapter.id ? "true" : undefined}
            >
              <span className="relative z-10">{chapter.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-4 right-4 z-50 md:hidden transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full shadow-lg shadow-slate-200/50 border border-slate-200/50 text-slate-700 hover:text-slate-900 transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile dropdown */}
        <div
          className={`absolute top-14 right-0 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="p-2">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeChapter === chapter.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    activeChapter === chapter.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {chapter.number}
                </span>
                <span className="font-medium">{chapter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Progress indicator on mobile */}
      <div
        className={`fixed top-4 left-4 z-50 md:hidden transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-xl rounded-full shadow-lg shadow-slate-200/50 border border-slate-200/50">
          <span className="w-6 h-6 flex items-center justify-center bg-slate-900 text-white text-xs font-bold rounded-full">
            {chapters.find((c) => c.id === activeChapter)?.number}
          </span>
          <span className="text-sm font-medium text-slate-700">
            {chapters.find((c) => c.id === activeChapter)?.label}
          </span>
        </div>
      </div>
    </>
  );
}

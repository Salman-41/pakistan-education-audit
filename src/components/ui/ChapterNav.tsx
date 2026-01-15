"use client";

import { useState, useEffect } from "react";

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

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 p-1.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-slate-200/50">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollToChapter(chapter.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeChapter === chapter.id
                ? "text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            aria-label={`Go to ${chapter.label}`}
          >
            {/* Active background pill */}
            {activeChapter === chapter.id && (
              <span className="absolute inset-0 bg-slate-900 rounded-full -z-10" />
            )}
            <span className="relative z-10">{chapter.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

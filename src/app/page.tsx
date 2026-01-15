"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { ChapterNav } from "@/components/ui/ChapterNav";
import { HeroSection } from "@/components/chapters/HeroSection";
import { DisparitiesChapter } from "@/components/chapters/DisparitiesChapter";
import { SystemsChapter } from "@/components/chapters/SystemsChapter";
import { PatternsChapter } from "@/components/chapters/PatternsChapter";
import { InterpretationChapter } from "@/components/chapters/InterpretationChapter";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="relative">
      {/* Chapter navigation */}
      <ChapterNav />

      {/* Chapter 1: Context / Hero */}
      <HeroSection />

      {/* Chapter 2: Disparities */}
      <DisparitiesChapter />

      {/* Chapter 3: Systems View */}
      <SystemsChapter />

      {/* Chapter 4: Hidden Patterns */}
      <PatternsChapter />

      {/* Chapter 5: Interpretation */}
      <InterpretationChapter />

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 bg-slate-50">
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 text-center">
          <p className="text-lg font-bold text-slate-900 mb-4">
            Pakistan Education Analysis
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-8">
            Data source: Pakistan Education Performance Dataset (2013-2016) via
            Kaggle. Built as an interactive research publication exploring
            regional disparities and policy implications.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
            <span>© 2026</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Research-first design</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Built with Next.js, GSAP, Lenis</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

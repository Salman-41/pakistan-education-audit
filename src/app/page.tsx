"use client";

import { useEffect, useRef, useState } from "react";
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

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-200/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

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
      {/* Scroll progress indicator */}
      <ScrollProgress />

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
      <footer className="relative py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative w-full px-6 md:px-12 lg:px-16 xl:px-24">
          {/* Main footer content */}
          <div className="max-w-4xl mx-auto">
            {/* Logo/Title */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Pakistan Education Analysis
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                A data-driven exploration of Pakistan&apos;s education landscape,
                analyzing regional disparities and policy implications from 2013-2016.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">146</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Cities Analyzed</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">8</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Provinces</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-violet-400 mb-1">4</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Years of Data</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">12+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Key Metrics</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Data source:</span>
                <span className="text-slate-400">Kaggle Pakistan Education Dataset</span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-500">
                <span>© 2026</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <span className="flex items-center gap-1.5">
                  Built with 
                  <span className="text-slate-400">Next.js</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">GSAP</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">p5.js</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

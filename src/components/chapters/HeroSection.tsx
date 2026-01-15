"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { keyInsights } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animations
      gsap.set(".hero-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".stat-pill", { y: 50, opacity: 0, scale: 0.9 });
      gsap.set(".hero-badge", { y: -30, opacity: 0 });
      gsap.set(".title-line", { y: 100, opacity: 0 });
      gsap.set(".hero-subtitle", { y: 40, opacity: 0 });
      gsap.set(".scroll-indicator", { opacity: 0 });
      gsap.set(".bg-shape", { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // Background shapes fade in
      tl.to(".bg-shape", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      })
        // Badge drops in
        .to(
          ".hero-badge",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=1"
        )
        // Title lines reveal with stagger
        .to(
          ".title-line",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.5"
        )
        // Accent line draws
        .to(
          ".hero-line",
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        // Subtitle fades up
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.3"
        )
        // Stats bounce in
        .to(
          ".stat-pill",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.3"
        )
        // Scroll indicator
        .to(
          ".scroll-indicator",
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.2"
        );

      // Scroll-triggered animations - Hero content parallax
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
        ease: "none",
      });

      // Title scale down on scroll
      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
        scale: 0.9,
        ease: "none",
      });

      // Background shapes parallax
      gsap.to(".bg-shape-1", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -150,
        rotation: 45,
        ease: "none",
      });

      gsap.to(".bg-shape-2", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
        x: 50,
        ease: "none",
      });

      gsap.to(".bg-shape-3", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -200,
        scale: 1.2,
        ease: "none",
      });

      // Stats parallax - move slower
      gsap.to(".stats-row", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });

      // Scroll indicator bounce
      gsap.to(".scroll-dot", {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power2.inOut",
      });

      // Hide scroll indicator on scroll
      gsap.to(".scroll-indicator", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "5% top",
          end: "10% top",
          scrub: true,
        },
        opacity: 0,
        y: 20,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="context"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Large gradient circle - top right */}
        <div className="bg-shape bg-shape-1 absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-60 will-change-transform" />

        {/* Medium circle - bottom left */}
        <div className="bg-shape bg-shape-2 absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-violet-100 to-purple-50 opacity-50 will-change-transform" />

        {/* Small accent circle */}
        <div className="bg-shape bg-shape-3 absolute top-[30%] left-[15%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-cyan-100 to-blue-50 opacity-40 will-change-transform" />

        {/* Decorative dots */}
        <div className="bg-shape absolute top-[20%] right-[20%] w-3 h-3 rounded-full bg-blue-400/30" />
        <div className="bg-shape absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-indigo-400/30" />
        <div className="bg-shape absolute top-[40%] left-[25%] w-2 h-2 rounded-full bg-violet-400/30" />
      </div>

      <div
        ref={contentRef}
        className="hero-content w-full px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 py-20"
      >
        {/* Badge */}
        <div className="hero-badge mb-8">
          <span className="inline-flex items-center gap-3 px-5 py-2.5 bg-white text-slate-800 text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full shadow-lg shadow-slate-200/50 border border-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Research Publication
            <span className="w-px h-3 bg-slate-200" />
            2013–2016
          </span>
        </div>

        {/* Main title */}
        <div className="hero-title mb-6 max-w-5xl">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[1] tracking-[-0.03em]">
            <span className="title-line block text-slate-900 will-change-transform">
              Pakistan Education
            </span>
            <span className="title-line block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent will-change-transform">
              Policy Audit
            </span>
          </h1>
        </div>

        {/* Animated accent line */}
        <div className="hero-line h-1 w-full max-w-md bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent rounded-full mb-8" />

        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl">
          A comprehensive data-driven exploration examining regional
          disparities, gender gaps, and infrastructure constraints across{" "}
          <span className="text-slate-900 font-semibold">
            {keyInsights.totalCities} cities
          </span>{" "}
          and <span className="text-slate-900 font-semibold">8 provinces</span>.
        </p>

        {/* Stats row */}
        <div className="stats-row flex flex-wrap items-center gap-3">
          <div className="stat-pill group flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <span className="text-2xl md:text-3xl font-black text-blue-600 group-hover:scale-110 transition-transform origin-center">
              {keyInsights.totalCities}
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Cities
            </span>
          </div>
          <div className="stat-pill group flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <span className="text-2xl md:text-3xl font-black text-emerald-600 group-hover:scale-110 transition-transform origin-center">
              4
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Years
            </span>
          </div>
          <div className="stat-pill group flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-violet-200 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <span className="text-2xl md:text-3xl font-black text-violet-600 group-hover:scale-110 transition-transform origin-center">
              8
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Provinces
            </span>
          </div>
          <div className="stat-pill group flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <span className="text-2xl md:text-3xl font-black text-amber-600 group-hover:scale-110 transition-transform origin-center">
              12+
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Metrics
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <div className="scroll-dot w-1.5 h-2.5 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  chapter?: number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hero" | "narrow" | "wide";
}

export function Section({
  id,
  chapter,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate chapter number with scale
      if (headerRef.current) {
        const chapterNumber =
          headerRef.current.querySelector(".chapter-number");
        const chapterLine = headerRef.current.querySelector(".chapter-line");
        const titleEl = headerRef.current.querySelector(".section-title");
        const subtitleEl = headerRef.current.querySelector(".section-subtitle");

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (chapterNumber) {
          headerTl.from(chapterNumber, {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        }

        if (chapterLine) {
          headerTl.from(
            chapterLine,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }

        if (titleEl) {
          headerTl.from(
            titleEl,
            {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }

        if (subtitleEl) {
          headerTl.from(
            subtitleEl,
            {
              y: 40,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }
      }

      // Animate content with staggered children
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Parallax effect for section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        backgroundPosition: "50% 100%",
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-20 md:py-28 bg-white ${className}`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24">
        {(chapter || title) && (
          <header ref={headerRef} className="mb-12">
            {chapter && (
              <div className="flex items-center gap-4 mb-5">
                <span className="chapter-number inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white text-sm font-bold rounded-full shadow-lg">
                  {chapter}
                </span>
                <div className="chapter-line h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent max-w-xs" />
              </div>
            )}
            {title && (
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="section-subtitle text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}
          </header>
        )}
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
}

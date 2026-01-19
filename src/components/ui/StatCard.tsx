"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  change?: number;
  description?: string;
  accent?: boolean;
  animate?: boolean;
  icon?: React.ReactNode;
  color?: "blue" | "emerald" | "violet" | "amber" | "slate";
}

export function StatCard({
  value,
  label,
  suffix = "",
  prefix = "",
  change,
  description,
  accent = false,
  animate = true,
  icon,
  color = "blue",
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(
    typeof value === "number" ? 0 : value
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  const colorClasses = {
    blue: {
      accent: "border-l-blue-500",
      value: "text-blue-600",
      icon: "bg-blue-50 text-blue-600",
    },
    emerald: {
      accent: "border-l-emerald-500",
      value: "text-emerald-600",
      icon: "bg-emerald-50 text-emerald-600",
    },
    violet: {
      accent: "border-l-violet-500",
      value: "text-violet-600",
      icon: "bg-violet-50 text-violet-600",
    },
    amber: {
      accent: "border-l-amber-500",
      value: "text-amber-600",
      icon: "bg-amber-50 text-amber-600",
    },
    slate: {
      accent: "border-l-slate-500",
      value: "text-slate-900",
      icon: "bg-slate-100 text-slate-600",
    },
  };

  useEffect(() => {
    if (!animate || typeof value !== "number" || hasAnimated) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 85%",
        onEnter: () => {
          setHasAnimated(true);
          gsap.to(
            { val: 0 },
            {
              val: value,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                const currentVal = this.targets()[0].val;
                // Handle decimals properly
                if (value % 1 !== 0) {
                  setDisplayValue(Math.round(currentVal * 100) / 100);
                } else {
                  setDisplayValue(Math.round(currentVal));
                }
              },
            }
          );
        },
        once: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, [value, animate, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden
        p-5 md:p-6 
        bg-white 
        border border-slate-200/80 
        ${accent ? `border-l-4 ${colorClasses[color].accent}` : ""}
        rounded-xl 
        shadow-sm 
        hover:shadow-lg hover:shadow-slate-200/50
        hover:border-slate-300/80
        hover:-translate-y-0.5
        transition-all duration-300
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 to-slate-100/0 group-hover:from-slate-50/50 group-hover:to-slate-100/30 transition-all duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Icon (if provided) */}
        {icon && (
          <div className={`w-10 h-10 rounded-lg ${colorClasses[color].icon} flex items-center justify-center mb-4`}>
            {icon}
          </div>
        )}

        {/* Value */}
        <div 
          className={`
            font-mono 
            text-2xl md:text-3xl lg:text-4xl 
            font-bold 
            leading-none 
            ${accent ? colorClasses[color].value : "text-slate-900"}
            tabular-nums
            tracking-tight
          `} 
          ref={valueRef}
        >
          {prefix}
          <span className="transition-colors duration-200">
            {typeof value === "number" ? displayValue : value}
          </span>
          {suffix && <span className="text-lg md:text-xl ml-0.5 opacity-70">{suffix}</span>}
        </div>

        {/* Label */}
        <div className="text-sm md:text-base font-medium text-slate-600 mt-2">
          {label}
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <div 
            className={`
              inline-flex items-center gap-1 
              mt-3 px-2 py-1 
              rounded-full 
              text-xs font-semibold
              ${change >= 0 
                ? "bg-emerald-50 text-emerald-700" 
                : "bg-red-50 text-red-700"
              }
            `}
          >
            <svg 
              className={`w-3 h-3 ${change >= 0 ? "" : "rotate-180"}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(change)}% from baseline
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

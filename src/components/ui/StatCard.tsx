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
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(
    typeof value === "number" ? 0 : value
  );

  useEffect(() => {
    if (!animate || typeof value !== "number") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: value,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                setDisplayValue(Math.round(this.targets()[0].val * 10) / 10);
              },
            }
          );
        },
        once: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, [value, animate]);

  return (
    <div
      ref={cardRef}
      className={`stat-card ${accent ? "border-l-4 border-l-blue-600" : ""}`}
    >
      <div className="stat-value text-slate-900" ref={valueRef}>
        {prefix}
        <span>{typeof value === "number" ? displayValue : value}</span>
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
      {change !== undefined && (
        <div className={`stat-change ${change >= 0 ? "positive" : "negative"}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from baseline
        </div>
      )}
      {description && <p className="body-sm mt-3">{description}</p>}
    </div>
  );
}

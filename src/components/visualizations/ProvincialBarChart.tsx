"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { REGION_PALETTE, provincialStats } from "@/lib/data";

interface ProvincialBarChartProps {
  metric?: "educationScore" | "learningScore" | "gpi" | "icc";
  showLabels?: boolean;
}

export function ProvincialBarChart({
  metric = "educationScore",
  showLabels = true,
}: ProvincialBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  // Sort by selected metric
  const sortedStats = [...provincialStats].sort((a, b) => {
    const aVal =
      metric === "gpi" || metric === "icc" ? a[metric].mean : a[metric].mean;
    const bVal =
      metric === "gpi" || metric === "icc" ? b[metric].mean : b[metric].mean;
    return bVal - aVal;
  });

  const maxValue = metric === "gpi" ? 1 : metric === "icc" ? 1 : 100;

  useEffect(() => {
    if (!chartRef.current) return;

    const bars = chartRef.current.querySelectorAll(".bar-fill");

    gsap.fromTo(
      bars,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        transformOrigin: "left center",
      }
    );
  }, [metric]);

  const getLabel = () => {
    switch (metric) {
      case "educationScore":
        return "Education Score";
      case "learningScore":
        return "Learning Score";
      case "gpi":
        return "Gender Parity Index";
      case "icc":
        return "Infrastructure Composite";
      default:
        return "";
    }
  };

  return (
    <div 
      ref={chartRef} 
      className="viz-container"
      role="figure"
      aria-label={`Bar chart showing ${getLabel()} by province`}
    >
      <div className="viz-title">{getLabel()} by Province</div>

      <div className="space-y-2 md:space-y-3">
        {sortedStats.map((stat, index) => {
          const value = stat[metric].mean;
          const percentage = (value / maxValue) * 100;
          const isHovered = hoveredProvince === stat.province;

          return (
            <div
              key={stat.province}
              className="group"
              onMouseEnter={() => setHoveredProvince(stat.province)}
              onMouseLeave={() => setHoveredProvince(null)}
            >
            <div className="flex items-center gap-2 md:gap-4">
              {/* Rank */}
              <span className="w-5 md:w-6 text-[10px] md:text-xs font-mono text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Province name */}
              <span
                className={`w-16 md:w-24 text-xs md:text-sm font-medium transition-colors duration-200 truncate ${
                  isHovered ? "text-slate-900" : "text-slate-600"
                }`}
              >
                {stat.province}
              </span>

              {/* Bar container */}
              <div className="flex-1 h-6 md:h-8 bg-slate-100 rounded relative overflow-hidden">
                  {/* Bar fill */}
                  <div
                    className="bar-fill absolute inset-y-0 left-0 rounded transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: isHovered
                        ? REGION_PALETTE[stat.province]
                        : REGION_PALETTE[stat.province] + "AA",
                      boxShadow: isHovered
                        ? `0 0 20px ${REGION_PALETTE[stat.province]}40`
                        : "none",
                    }}
                  />

                  {/* Std deviation indicator */}
                  {stat[metric].std && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-3 border-l-2 border-r-2 border-slate-400/50 opacity-70"
                      style={{
                        left: `${
                          ((value - stat[metric].std) / maxValue) * 100
                        }%`,
                        width: `${((stat[metric].std * 2) / maxValue) * 100}%`,
                      }}
                    />
                  )}
                </div>

              {/* Value */}
              <span
                className={`w-12 md:w-16 text-right font-mono text-xs md:text-sm transition-colors duration-200 ${
                  isHovered ? "text-blue-600 font-semibold" : "text-slate-500"
                }`}
              >
                {metric === "gpi" || metric === "icc"
                  ? value.toFixed(2)
                  : value.toFixed(1)}
              </span>
            </div>

            {/* Expanded details on hover */}
            {isHovered &&
              showLabels &&
              (metric === "educationScore" || metric === "learningScore") && (
                <div className="ml-5 md:ml-10 mt-2 pl-16 md:pl-24 text-[10px] md:text-xs text-slate-500 animate-fade-in">
                  <span>{stat.cityCount} cities</span>
                  <span className="mx-2">-</span>
                  <span>
                    Range: {stat[metric].min.toFixed(1)} -{" "}
                    {stat[metric].max.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded" />
          <span>Bar = Mean value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 border-l border-r border-slate-400" />
          <span>±1 Std Dev</span>
        </div>
      </div>
    </div>
  );
}

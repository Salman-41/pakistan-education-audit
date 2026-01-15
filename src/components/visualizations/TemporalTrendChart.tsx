"use client";

import { useState } from "react";
import { REGION_PALETTE, temporalTrends } from "@/lib/data";

export function TemporalTrendChart() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const provinces = Object.keys(temporalTrends.provinces) as Array<
    keyof typeof temporalTrends.provinces
  >;
  const years = temporalTrends.years;

  // Chart dimensions
  const width = 700;
  const height = 400;
  const padding = { top: 40, right: 120, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scales
  const xScale = (year: number) =>
    padding.left +
    ((year - years[0]) / (years[years.length - 1] - years[0])) * chartWidth;

  const yScale = (value: number) =>
    padding.top + chartHeight - ((value - 30) / 60) * chartHeight;

  // Generate path for each province
  const generatePath = (province: keyof typeof temporalTrends.provinces) => {
    const values = temporalTrends.provinces[province];
    return years
      .map((year, i) => {
        const x = xScale(year);
        const y = yScale(values[i]);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="viz-container">
      <div className="viz-title">Education Score Trajectories (2013–2016)</div>

      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        <g className="grid-lines">
          {[40, 50, 60, 70, 80].map((value) => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={yScale(value)}
                x2={width - padding.right}
                y2={yScale(value)}
                stroke="rgba(0,0,0,0.08)"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={yScale(value)}
                fill="#64748b"
                fontSize={10}
                textAnchor="end"
                dominantBaseline="middle"
                fontFamily="monospace"
              >
                {value}
              </text>
            </g>
          ))}
        </g>

        {/* Year labels */}
        {years.map((year) => (
          <g key={year}>
            <line
              x1={xScale(year)}
              y1={padding.top}
              x2={xScale(year)}
              y2={height - padding.bottom}
              stroke="rgba(0,0,0,0.05)"
            />
            <text
              x={xScale(year)}
              y={height - padding.bottom + 20}
              fill="#64748b"
              fontSize={11}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {year}
            </text>
            {/* Hover zone */}
            <rect
              x={xScale(year) - 30}
              y={padding.top}
              width={60}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
            />
          </g>
        ))}

        {/* Trend lines */}
        {provinces.map((province) => {
          const isSelected =
            selectedProvince === province || selectedProvince === null;
          const isHovered = selectedProvince === province;

          return (
            <g key={province}>
              {/* Line */}
              <path
                d={generatePath(province)}
                fill="none"
                stroke={REGION_PALETTE[province]}
                strokeWidth={isHovered ? 3 : 2}
                strokeOpacity={isSelected ? (isHovered ? 1 : 0.7) : 0.15}
                style={{ transition: "all 0.3s ease" }}
              />

              {/* Data points */}
              {years.map((year, i) => {
                const values = temporalTrends.provinces[province];
                const x = xScale(year);
                const y = yScale(values[i]);

                return (
                  <circle
                    key={year}
                    cx={x}
                    cy={y}
                    r={hoveredYear === year && isSelected ? 6 : 4}
                    fill={REGION_PALETTE[province]}
                    opacity={isSelected ? 1 : 0.2}
                    style={{ transition: "all 0.2s ease" }}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Hover tooltip */}
        {hoveredYear && (
          <g
            transform={`translate(${xScale(hoveredYear)}, ${padding.top - 10})`}
          >
            <rect
              x={-40}
              y={-30}
              width={80}
              height={24}
              fill="white"
              stroke="rgba(0,0,0,0.1)"
              rx={4}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            />
            <text
              textAnchor="middle"
              fill="#2563eb"
              fontSize={12}
              fontFamily="monospace"
              fontWeight="600"
              y={-13}
            >
              {hoveredYear}
            </text>
          </g>
        )}

        {/* Y-axis label */}
        <text
          transform={`translate(20, ${height / 2}) rotate(-90)`}
          fill="#64748b"
          fontSize={11}
          textAnchor="middle"
        >
          Education Score
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {provinces.map((province) => (
          <button
            key={province}
            onClick={() =>
              setSelectedProvince(
                selectedProvince === province ? null : province
              )
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedProvince === province
                ? "bg-white ring-1 ring-slate-300 shadow-sm"
                : selectedProvince === null
                ? "bg-slate-100 hover:bg-slate-200"
                : "bg-slate-100/50 opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: REGION_PALETTE[province] }}
            />
            <span className="text-slate-700">{province}</span>
          </button>
        ))}
      </div>

      <p className="viz-caption">
        Click a province to isolate its trajectory. ICT leads consistently;
        Balochistan shows slow but steady improvement.
      </p>
    </div>
  );
}

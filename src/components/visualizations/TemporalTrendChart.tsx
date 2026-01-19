"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { REGION_PALETTE, temporalTrends } from "@/lib/data";

export function TemporalTrendChart() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 400 });

  const provinces = Object.keys(temporalTrends.provinces) as Array<
    keyof typeof temporalTrends.provinces
  >;
  const years = temporalTrends.years;

  // Handle resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const width = Math.min(containerWidth, 700);
      const height = Math.min(400, Math.max(280, width * 0.55));
      setDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Chart dimensions
  const width = dimensions.width;
  const height = dimensions.height;
  const isMobile = width < 500;
  const padding = isMobile
    ? { top: 30, right: 20, bottom: 45, left: 45 }
    : { top: 40, right: 120, bottom: 50, left: 60 };
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
    <div className="viz-container" ref={containerRef}>
      <div className="viz-title">Education Score Trajectories (2013-2016)</div>

      <div className="overflow-x-auto">
        <svg 
          width={width} 
          height={height} 
          className="overflow-visible mx-auto block"
          role="img"
          aria-label="Line chart showing education score trends for different provinces from 2013 to 2016"
        >
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
                  fontSize={isMobile ? 9 : 10}
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
                fontSize={isMobile ? 10 : 11}
                textAnchor="middle"
                fontFamily="monospace"
              >
                {year}
              </text>
              {/* Hover zone */}
              <rect
                x={xScale(year) - (isMobile ? 20 : 30)}
                y={padding.top}
                width={isMobile ? 40 : 60}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredYear(year)}
                onMouseLeave={() => setHoveredYear(null)}
                onTouchStart={() => setHoveredYear(year)}
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
                      r={hoveredYear === year && isSelected ? (isMobile ? 5 : 6) : (isMobile ? 3 : 4)}
                      fill={REGION_PALETTE[province]}
                      opacity={isSelected ? 1 : 0.2}
                      style={{ transition: "all 0.2s ease" }}
                    />
                  );
                })}

                {/* Province label at end of line (desktop only) */}
                {!isMobile && (
                  <text
                    x={xScale(years[years.length - 1]) + 10}
                    y={yScale(temporalTrends.provinces[province][years.length - 1])}
                    fill={REGION_PALETTE[province]}
                    fontSize={10}
                    fontWeight={isHovered ? 600 : 400}
                    dominantBaseline="middle"
                    opacity={isSelected ? 1 : 0.3}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {province}
                  </text>
                )}
              </g>
            );
          })}

          {/* Hover tooltip */}
          {hoveredYear && (
            <g
              transform={`translate(${xScale(hoveredYear)}, ${padding.top - 10})`}
            >
              <rect
                x={-30}
                y={-25}
                width={60}
                height={22}
                fill="white"
                stroke="rgba(0,0,0,0.1)"
                rx={4}
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
              />
              <text
                textAnchor="middle"
                fill="#2563eb"
                fontSize={11}
                fontFamily="monospace"
                fontWeight="600"
                y={-10}
              >
                {hoveredYear}
              </text>
            </g>
          )}

          {/* Y-axis label */}
          <text
            transform={`translate(${isMobile ? 14 : 18}, ${height / 2}) rotate(-90)`}
            fill="#64748b"
            fontSize={isMobile ? 9 : 11}
            textAnchor="middle"
          >
            Education Score
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 md:gap-3 justify-center">
        {provinces.map((province) => (
          <button
            key={province}
            onClick={() =>
              setSelectedProvince(
                selectedProvince === province ? null : province
              )
            }
            className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedProvince === province
                ? "bg-white ring-1 ring-slate-300 shadow-sm"
                : selectedProvince === null
                ? "bg-slate-100 hover:bg-slate-200"
                : "bg-slate-100/50 opacity-40 hover:opacity-70"
            }`}
            aria-pressed={selectedProvince === province}
            aria-label={`${selectedProvince === province ? "Deselect" : "Select"} ${province}`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { correlationMatrix } from "@/lib/data";

const metrics = ["Education Score", "Learning Score", "ICC", "GPI", "SFS"];

export function CorrelationHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{
    row: string;
    col: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(80);
  const [labelWidth, setLabelWidth] = useState(120);

  // Handle resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const isMobile = containerWidth < 500;
      setCellSize(isMobile ? 50 : 70);
      setLabelWidth(isMobile ? 80 : 100);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Build matrix from correlation data
  const getCorrelation = (metric1: string, metric2: string): number => {
    if (metric1 === metric2) return 1;
    const found = correlationMatrix.find(
      (c) =>
        (c.metric1 === metric1 && c.metric2 === metric2) ||
        (c.metric1 === metric2 && c.metric2 === metric1)
    );
    return found?.value ?? 0;
  };

  const getColor = (value: number): string => {
    if (value === 1) return "rgba(37, 99, 235, 0.9)"; // Diagonal - blue
    if (value > 0) {
      const intensity = value;
      return `rgba(22, 163, 74, ${0.15 + intensity * 0.55})`; // Green for positive
    } else {
      const intensity = Math.abs(value);
      return `rgba(220, 38, 38, ${0.15 + intensity * 0.55})`; // Red for negative
    }
  };

  const isMobile = cellSize < 60;

  return (
    <div className="viz-container" ref={containerRef}>
      <div className="viz-title">Metric Correlation Matrix</div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="inline-block min-w-fit">
          {/* Column headers */}
          <div className="flex" style={{ marginLeft: labelWidth }}>
            {metrics.map((metric) => (
              <div
                key={metric}
                className="text-[10px] md:text-xs text-slate-500 font-mono text-center font-medium"
                style={{ width: cellSize }}
              >
                <span className="block transform -rotate-45 origin-left translate-y-4 whitespace-nowrap">
                  {isMobile ? metric.split(" ")[0] : metric}
                </span>
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          <div className="mt-8">
            {metrics.map((rowMetric, rowIndex) => (
              <div key={rowMetric} className="flex items-center">
                {/* Row label */}
                <div
                  className="text-[10px] md:text-xs text-slate-500 font-mono text-right pr-2 md:pr-4 truncate font-medium"
                  style={{ width: labelWidth }}
                >
                  {isMobile ? rowMetric.split(" ")[0] : rowMetric}
                </div>

                {/* Cells */}
                {metrics.map((colMetric, colIndex) => {
                  const value = getCorrelation(rowMetric, colMetric);
                  const isHovered =
                    hoveredCell?.row === rowMetric &&
                    hoveredCell?.col === colMetric;
                  const isDiagonal = rowIndex === colIndex;

                  // Only show lower triangle + diagonal
                  if (colIndex > rowIndex) {
                    return (
                      <div
                        key={colMetric}
                        style={{ width: cellSize, height: cellSize }}
                        className="flex items-center justify-center"
                      />
                    );
                  }

                  return (
                    <div
                      key={colMetric}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: getColor(value),
                      }}
                      className={`
                        flex items-center justify-center cursor-pointer
                        transition-all duration-200 border border-slate-200
                        rounded-sm
                        ${
                          isHovered ? "ring-2 ring-blue-500 z-10 scale-105 shadow-lg" : ""
                        }
                      `}
                      onMouseEnter={() =>
                        setHoveredCell({ row: rowMetric, col: colMetric })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      onTouchStart={() =>
                        setHoveredCell({ row: rowMetric, col: colMetric })
                      }
                      role="cell"
                      aria-label={`Correlation between ${rowMetric} and ${colMetric}: ${value.toFixed(2)}`}
                    >
                      <span
                        className={`font-mono text-xs md:text-sm ${
                          isDiagonal
                            ? "text-white font-bold"
                            : value > 0
                            ? "text-green-900"
                            : "text-red-900"
                        }`}
                      >
                        {value.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "rgba(220, 38, 38, 0.5)" }}
          />
          <span className="text-slate-500">Negative correlation</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "rgba(22, 163, 74, 0.5)" }}
          />
          <span className="text-slate-500">Positive correlation</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "rgba(37, 99, 235, 0.9)" }}
          />
          <span className="text-slate-500">Self (1.0)</span>
        </div>
      </div>

      {/* Insight */}
      {hoveredCell && (
        <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm animate-fade-in">
          <span className="text-blue-600 font-mono font-semibold">
            {hoveredCell.row}
          </span>
          <span className="text-slate-500"> x </span>
          <span className="text-blue-600 font-mono font-semibold">
            {hoveredCell.col}
          </span>
          <span className="text-slate-500"> = </span>
          <span className="text-slate-900 font-mono font-bold">
            {getCorrelation(hoveredCell.row, hoveredCell.col).toFixed(2)}
          </span>
        </div>
      )}

      <p className="viz-caption">
        Strong correlation (0.86) between Education and Learning scores confirms
        construct validity. Moderate ICC-GPI correlation (0.54) suggests
        infrastructure affects female enrollment. Security (SFS) shows weak
        negative correlations across all metrics.
      </p>
    </div>
  );
}

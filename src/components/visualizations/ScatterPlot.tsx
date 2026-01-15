"use client";

import { useRef, useEffect, useState } from "react";
import type p5Type from "p5";
import { REGION_PALETTE, sampleCities, CityData } from "@/lib/data";

interface ScatterPlotProps {
  xMetric: "icc" | "sfs" | "gpi";
  yMetric: "learningScore" | "retentionScore" | "educationScore";
  title?: string;
}

export function ScatterPlot({
  xMetric = "icc",
  yMetric = "learningScore",
  title = "Infrastructure vs Learning Outcomes",
}: ScatterPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5Type | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Dynamic import for p5 (client-side only)
    let cleanup = false;

    import("p5").then((p5Module) => {
      if (cleanup || !containerRef.current) return;

      const p5 = p5Module.default;

      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }

      // Local copy of data with explicit type
      const cities: CityData[] = [...sampleCities];

      const sketch = (p: p5Type) => {
        const width = 600;
        const height = 450;
        const margin = { top: 30, right: 30, bottom: 50, left: 60 };

        let hoveredCity: CityData | null = null;

        // Scale functions
        const getXRange = () => {
          switch (xMetric) {
            case "icc":
              return { min: 0, max: 1 };
            case "sfs":
              return { min: 0, max: 8 };
            case "gpi":
              return { min: 0.3, max: 1.1 };
          }
        };

        const getYRange = () => {
          return { min: 20, max: 100 };
        };

        const xRange = getXRange();
        const yRange = getYRange();

        const xScale = (val: number) =>
          p.map(val, xRange.min, xRange.max, margin.left, width - margin.right);

        const yScale = (val: number) =>
          p.map(
            val,
            yRange.min,
            yRange.max,
            height - margin.bottom,
            margin.top
          );

        const getXLabel = () => {
          switch (xMetric) {
            case "icc":
              return "Infrastructure Composite Index";
            case "sfs":
              return "Security Fragility Score";
            case "gpi":
              return "Gender Parity Index";
          }
        };

        const getYLabel = () => {
          switch (yMetric) {
            case "learningScore":
              return "Learning Score";
            case "retentionScore":
              return "Retention Score";
            case "educationScore":
              return "Education Score";
          }
        };

        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          canvas.style("display", "block");
        };

        p.draw = () => {
          p.background(255, 255, 255);

          // Grid lines
          p.stroke(0, 0, 0, 10);
          p.strokeWeight(1);

          // X grid
          for (let i = 0; i <= 5; i++) {
            const x = p.map(i, 0, 5, margin.left, width - margin.right);
            p.line(x, margin.top, x, height - margin.bottom);
          }

          // Y grid
          for (let i = 0; i <= 5; i++) {
            const y = p.map(i, 0, 5, height - margin.bottom, margin.top);
            p.line(margin.left, y, width - margin.right, y);
          }

          // Axes
          p.stroke(0, 0, 0, 30);
          p.strokeWeight(1);
          p.line(
            margin.left,
            height - margin.bottom,
            width - margin.right,
            height - margin.bottom
          );
          p.line(margin.left, margin.top, margin.left, height - margin.bottom);

          // Axis labels
          p.noStroke();
          p.fill(100, 116, 139);
          p.textSize(11);
          p.textAlign(p.CENTER, p.TOP);
          p.text(getXLabel(), width / 2, height - 15);

          p.push();
          p.translate(15, height / 2);
          p.rotate(-p.HALF_PI);
          p.text(getYLabel(), 0, 0);
          p.pop();

          // Check hover
          hoveredCity = null;

          // Draw points
          cities.forEach((city) => {
            const xVal = city[xMetric];
            const yVal = city[yMetric];
            const x = xScale(xVal);
            const y = yScale(yVal);

            // Size based on population
            const size = p.map(city.population, 100000, 15000000, 8, 30);

            // Check hover
            const dist = p.dist(p.mouseX, p.mouseY, x, y);
            if (dist < size + 5) {
              hoveredCity = city;
            }

            const isHovered = hoveredCity === city;
            const color = REGION_PALETTE[city.province] || "#ffffff";

            // Glow for hovered
            if (isHovered) {
              p.noStroke();
              p.fill(color + "25");
              p.circle(x, y, size * 2.5);
            }

            // Point
            p.noStroke();
            p.fill(isHovered ? color : color + "CC");
            p.circle(x, y, isHovered ? size * 1.3 : size);
          });

          // Tooltip
          if (hoveredCity !== null) {
            const city = hoveredCity as CityData;
            const xVal = city[xMetric] as number;
            const yVal = city[yMetric] as number;
            const x = xScale(xVal);
            const y = yScale(yVal);

            // Tooltip box
            const tooltipWidth = 180;
            const tooltipHeight = 80;
            let tooltipX = x + 15;
            let tooltipY = y - tooltipHeight / 2;

            // Keep in bounds
            if (tooltipX + tooltipWidth > width - 10)
              tooltipX = x - tooltipWidth - 15;
            if (tooltipY < 10) tooltipY = 10;
            if (tooltipY + tooltipHeight > height - 10)
              tooltipY = height - tooltipHeight - 10;

            p.fill(255);
            p.stroke(0, 0, 0, 15);
            p.strokeWeight(1);
            // Add shadow effect
            (p.drawingContext as CanvasRenderingContext2D).shadowColor = "rgba(0, 0, 0, 0.1)";
            (p.drawingContext as CanvasRenderingContext2D).shadowBlur = 10;
            (p.drawingContext as CanvasRenderingContext2D).shadowOffsetY = 4;
            p.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
            (p.drawingContext as CanvasRenderingContext2D).shadowColor = "transparent";

            p.noStroke();
            p.fill(15, 23, 42);
            p.textSize(12);
            p.textAlign(p.LEFT, p.TOP);
            p.text(city.city, tooltipX + 12, tooltipY + 12);

            p.fill(100, 116, 139);
            p.textSize(10);
            p.text(city.province, tooltipX + 12, tooltipY + 30);

            p.fill(37, 99, 235);
            p.textSize(11);
            const xLabel = xMetric.toUpperCase();
            const yLabel =
              yMetric === "learningScore"
                ? "Learning"
                : yMetric === "retentionScore"
                ? "Retention"
                : "Education";
            p.text(
              `${xLabel}: ${xVal.toFixed(2)}`,
              tooltipX + 12,
              tooltipY + 48
            );
            p.text(
              `${yLabel}: ${yVal.toFixed(1)}`,
              tooltipX + 12,
              tooltipY + 64
            );
          }

          // Trend line (simple linear regression visualization)
          const xVals = cities.map((c) => c[xMetric]);
          const yVals = cities.map((c) => c[yMetric]);
          const n = xVals.length;
          const sumX = xVals.reduce((a, b) => a + b, 0);
          const sumY = yVals.reduce((a, b) => a + b, 0);
          const sumXY = xVals.reduce((acc, x, i) => acc + x * yVals[i], 0);
          const sumX2 = xVals.reduce((acc, x) => acc + x * x, 0);

          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;

          // Draw trend line
          p.stroke(37, 99, 235, 120);
          p.strokeWeight(2);
          const x1 = margin.left;
          const x2 = width - margin.right;
          const y1 = yScale(intercept + slope * xRange.min);
          const y2 = yScale(intercept + slope * xRange.max);
          p.line(x1, y1, x2, y2);
        };
      };

      p5InstanceRef.current = new p5(sketch, containerRef.current);
    });

    return () => {
      cleanup = true;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [xMetric, yMetric, mounted]);

  if (!mounted) {
    return (
      <div className="viz-container">
        <div className="viz-title">{title}</div>
        <div className="h-[450px] bg-slate-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="viz-container">
      <div className="viz-title">{title}</div>
      <div
        ref={containerRef}
        className="p5-container rounded-lg overflow-hidden"
      />
      <p className="viz-caption">
        Point size indicates population. Hover for details. Trend line shows
        overall relationship direction.
      </p>
    </div>
  );
}

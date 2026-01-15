"use client";

import { useRef, useEffect, useState } from "react";
import type p5Type from "p5";
import { REGION_PALETTE, provincialStats } from "@/lib/data";

interface ParticleMapProps {
  width?: number;
  height?: number;
}

export function ParticleMap({ width = 600, height = 500 }: ParticleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5Type | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let cleanup = false;

    import("p5").then((p5Module) => {
      if (cleanup || !containerRef.current) return;

      const p5 = p5Module.default;

      // Clean up existing instance
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }

      const sketch = (p: p5Type) => {
        interface Particle {
          x: number;
          y: number;
          vx: number;
          vy: number;
          province: string;
          score: number;
          size: number;
          targetX: number;
          targetY: number;
        }

        let particles: Particle[] = [];
        let hoveredProvince: string | null = null;

        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          canvas.style("display", "block");

          // Create particles for each province based on city count
          provincialStats.forEach((stat, index) => {
            const baseX = (index % 4) * (width / 4) + width / 8;
            const baseY = Math.floor(index / 4) * (height / 2) + height / 4;

            for (let i = 0; i < stat.cityCount; i++) {
              particles.push({
                x: baseX + p.random(-60, 60),
                y: baseY + p.random(-60, 60),
                vx: p.random(-0.3, 0.3),
                vy: p.random(-0.3, 0.3),
                province: stat.province,
                score: stat.educationScore.mean + p.random(-10, 10),
                size: p.map(stat.educationScore.mean, 30, 80, 4, 12),
                targetX: baseX,
                targetY: baseY,
              });
            }
          });
        };

        p.draw = () => {
          p.background(250, 250, 250);

          // Draw grid
          p.stroke(0, 0, 0, 8);
          p.strokeWeight(1);
          for (let x = 0; x < width; x += 60) {
            p.line(x, 0, x, height);
          }
          for (let y = 0; y < height; y += 60) {
            p.line(0, y, width, y);
          }

          // Check for hover
          hoveredProvince = null;

          // Update and draw particles
          particles.forEach((particle) => {
            // Gentle drift
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Soft bounds
            const margin = 40;
            if (particle.x < margin || particle.x > width - margin)
              particle.vx *= -1;
            if (particle.y < margin || particle.y > height - margin)
              particle.vy *= -1;

            // Attract to target position
            particle.x += (particle.targetX - particle.x) * 0.002;
            particle.y += (particle.targetY - particle.y) * 0.002;

            // Check hover
            const dist = p.dist(p.mouseX, p.mouseY, particle.x, particle.y);
            if (dist < particle.size + 10) {
              hoveredProvince = particle.province;
            }

            // Draw particle
            const color = REGION_PALETTE[particle.province] || "#ffffff";
            const isHighlighted = hoveredProvince === particle.province;

            p.noStroke();

            // Glow effect
            if (isHighlighted) {
              p.fill(color + "30");
              p.circle(particle.x, particle.y, particle.size * 3);
            }

            // Main particle
            p.fill(isHighlighted ? color : color + "DD");
            p.circle(
              particle.x,
              particle.y,
              particle.size * (isHighlighted ? 1.5 : 1)
            );
          });

          // Draw province labels
          p.textFont("monospace");
          p.textSize(10);
          p.textAlign(p.CENTER, p.CENTER);

          provincialStats.forEach((stat, index) => {
            const x = (index % 4) * (width / 4) + width / 8;
            const y = Math.floor(index / 4) * (height / 2) + height / 4 + 80;

            const isHighlighted = hoveredProvince === stat.province;
            p.fill(isHighlighted ? "#2563eb" : "#64748b");
            p.text(stat.province, x, y);

            if (isHighlighted) {
              p.fill("#a1a1aa");
              p.textSize(9);
              p.text(
                `Score: ${stat.educationScore.mean.toFixed(1)}`,
                x,
                y + 14
              );
              p.textSize(10);
            }
          });
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
  }, [width, height, mounted]);

  if (!mounted) {
    return (
      <div
        className="p5-container rounded-lg overflow-hidden bg-zinc-900 animate-pulse"
        style={{ width, height }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="p5-container rounded-lg overflow-hidden"
      style={{ width, height }}
    />
  );
}

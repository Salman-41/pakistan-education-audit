"use client";

import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { ProvincialBarChart } from "@/components/visualizations/ProvincialBarChart";
import { keyInsights, provincialStats, infraGpiCorrelation } from "@/lib/data";

export function DisparitiesChapter() {
  // Calculate some derived stats
  const topProvince = provincialStats.find((p) => p.province === "ICT");
  const bottomProvince = provincialStats.find(
    (p) => p.province === "Balochistan"
  );
  const scoreGap =
    topProvince && bottomProvince
      ? (
          topProvince.educationScore.mean - bottomProvince.educationScore.mean
        ).toFixed(1)
      : "40";

  return (
    <Section
      id="disparities"
      chapter={2}
      title="The Education Divide"
      subtitle="Pakistan's education outcomes follow deep geographic and demographic fault lines. This section maps the regional performance hierarchy, gender access barriers, and infrastructure inequalities."
    >
      {/* Key insight callout */}
      <div className="p-8 mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 mb-2">Key Finding</p>
            <p className="text-lg text-slate-600 leading-relaxed">
              A {scoreGap}-point gap exists between the highest (ICT) and lowest
              (Balochistan) performing provinces. This disparity persists across
              all measured dimensions: enrollment, learning outcomes, and
              infrastructure access.
            </p>
          </div>
        </div>
      </div>

      {/* Provincial rankings */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Provincial Performance Hierarchy
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Provinces ranked by mean education score. The variance within each
          province (shown by error bars) often exceeds the gap between
          provinces—suggesting intra-provincial policies matter as much as
          federal intervention.
        </p>
        <ProvincialBarChart metric="educationScore" />
      </div>

      {/* Gender parity section */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          The Gender Parity Landscape
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Gender Parity Index (GPI) measures female-to-male enrollment ratio. A
          value of 1.0 indicates perfect parity. Values below 1.0 indicate male
          dominance in enrollment.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ProvincialBarChart metric="gpi" showLabels={false} />

          {/* Infrastructure impact on GPI */}
          <div className="viz-container">
            <div className="viz-title">
              Infrastructure Impact on Female Access
            </div>
            <div className="space-y-4 mt-6">
              {infraGpiCorrelation.map((item) => (
                <div key={item.factor} className="flex items-center gap-4">
                  <span className="w-32 text-sm text-slate-500">
                    {item.factor}
                  </span>
                  <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded"
                      style={{ width: `${item.correlation * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-sm text-slate-600">
                    {item.correlation.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <p className="viz-caption">
              Correlation coefficient between infrastructure factors and GPI.
              Boundary walls and toilet facilities show strongest association
              with female enrollment—validating the hypothesis that physical
              privacy is a primary barrier for girls' education in rural areas.
            </p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          value={keyInsights.gpiGap}
          label="GPI Gap"
          description="Difference between highest and lowest provincial GPI"
        />
        <StatCard
          value={0.52}
          label="Balochistan GPI"
          description="Lowest provincial gender parity"
        />
        <StatCard
          value={0.98}
          label="ICT GPI"
          description="Highest provincial gender parity"
        />
        <StatCard
          value={0.52}
          label="Wall-GPI Correlation"
          description="Boundary wall impact on female access"
        />
      </div>
    </Section>
  );
}

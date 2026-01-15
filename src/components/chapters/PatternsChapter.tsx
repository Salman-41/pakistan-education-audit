"use client";

import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import {
  positiveDeviants,
  ghostEnrollmentZones,
  REGION_PALETTE,
} from "@/lib/data";

export function PatternsChapter() {
  return (
    <Section
      id="patterns"
      chapter={4}
      title="Hidden Patterns"
      subtitle="Beyond the expected correlations lie counter-intuitive findings: schools that thrive despite scarcity, enrollment numbers that mask learning failures, and efficiency outliers that challenge conventional assumptions."
    >
      {/* Positive Deviants */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Positive Deviants
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          These districts achieve top-quartile learning outcomes with
          bottom-quartile infrastructure. Their &quot;efficiency ratio&quot;
          (learning score ÷ infrastructure) far exceeds the national average of
          ~1.0. What are they doing differently?
        </p>

        <div className="viz-container">
          <div className="viz-title">
            High-Efficiency Districts (Low Infra, High Learning)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full mt-4">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">District</th>
                  <th className="pb-3 pr-4">Province</th>
                  <th className="pb-3 pr-4 text-right">ICC</th>
                  <th className="pb-3 pr-4 text-right">Learning</th>
                  <th className="pb-3 text-right">Efficiency</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {positiveDeviants.map((district, index) => (
                  <tr
                    key={district.city}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 pr-4 text-slate-900 font-medium">
                      {district.city}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className="inline-flex items-center gap-2"
                        style={{ color: REGION_PALETTE[district.province] }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: REGION_PALETTE[district.province],
                          }}
                        />
                        {district.province}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right text-slate-500">
                      {district.icc.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right text-slate-500">
                      {district.learningScore.toFixed(1)}
                    </td>
                    <td className="py-3 text-right text-blue-600 font-semibold">
                      {district.efficiency.toFixed(2)}×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="viz-caption">
            Gilgit-Baltistan dominates this list, suggesting regional governance
            practices or community investment patterns worth investigating as
            policy models.
          </p>
        </div>
      </div>

      {/* Ghost Enrollment */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          The Ghost Enrollment Problem
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          High enrollment scores can mask systemic learning failures. These
          districts show the largest gaps between enrollment metrics and actual
          learning outcomes— suggesting either data quality issues or
          &quot;attendance without learning&quot; patterns.
        </p>

        <div className="viz-container">
          <div className="viz-title">
            Enrollment-Learning Gap (Potential Ghost Enrollment)
          </div>
          <div className="space-y-4 mt-6">
            {ghostEnrollmentZones.map((zone) => (
              <div key={zone.city} className="group">
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-28 text-sm text-slate-700 font-medium">
                    {zone.city}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: REGION_PALETTE[zone.province] + "20",
                      color: REGION_PALETTE[zone.province],
                    }}
                  >
                    {zone.province}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-8 bg-slate-100 rounded relative overflow-hidden">
                    {/* Enrollment bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-500/50 rounded-l"
                      style={{ width: `${zone.enrollmentScore}%` }}
                    />
                    {/* Learning bar (overlay) */}
                    <div
                      className="absolute inset-y-0 left-0 bg-red-500/70 rounded-l"
                      style={{ width: `${zone.learningScore}%` }}
                    />
                    {/* Gap indicator */}
                    <div
                      className="absolute inset-y-0 bg-red-500/10 border-l-2 border-red-500"
                      style={{
                        left: `${zone.learningScore}%`,
                        width: `${zone.gap}%`,
                      }}
                    />
                  </div>
                  <span className="w-20 text-right font-mono text-sm text-red-600">
                    -{zone.gap.toFixed(1)} gap
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-emerald-500/50 rounded" />
              <span>Enrollment Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-red-500/70 rounded" />
              <span>Learning Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-red-500/10 border-l border-red-500" />
              <span>Gap (potential ghost enrollment)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Counter-intuitive findings */}
      <div className="mb-12">
        <h3 className="headline-sm mb-6">Counter-Intuitive Findings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="text-blue-600 font-mono text-sm mb-3 font-semibold">
              Finding #1
            </div>
            <p className="text-slate-900 font-semibold mb-2">
              Security ≠ Dropout
            </p>
            <p className="body-sm">
              12 districts maintain top-quartile retention despite ranking in
              the top quartile of security fragility. Institutional resilience
              exists independent of conflict.
            </p>
          </div>

          <div className="card p-6">
            <div className="text-blue-600 font-mono text-sm mb-3 font-semibold">
              Finding #2
            </div>
            <p className="text-slate-900 font-semibold mb-2">
              Rural Efficiency
            </p>
            <p className="body-sm">
              Several rural GB districts outperform urban Sindh centers with 40%
              less infrastructure investment, suggesting governance quality
              trumps resources.
            </p>
          </div>

          <div className="card p-6">
            <div className="text-blue-600 font-mono text-sm mb-3 font-semibold">
              Finding #3
            </div>
            <p className="text-slate-900 font-semibold mb-2">
              The Funnel Effect
            </p>
            <p className="body-sm">
              Secondary-to-primary school ratios as low as 0.15 in some
              districts create structural bottlenecks where primary graduates
              have no path forward.
            </p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          value={positiveDeviants.length}
          label="Positive Deviants"
          description="Districts exceeding expectations"
        />
        <StatCard
          value={12}
          label="Resilient Districts"
          description="High retention despite conflict"
        />
        <StatCard
          value="34.2"
          label="Max Enrollment Gap"
          suffix=" pts"
          description="Largest ghost enrollment indicator"
        />
        <StatCard
          value="2.08"
          label="Peak Efficiency"
          suffix="×"
          description="Highest learning-to-infra ratio"
        />
      </div>
    </Section>
  );
}

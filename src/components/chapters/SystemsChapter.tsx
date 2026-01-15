"use client";

import { Section } from "@/components/ui/Section";
import { CorrelationHeatmap } from "@/components/visualizations/CorrelationHeatmap";
import { ScatterPlot } from "@/components/visualizations/ScatterPlot";
import { TemporalTrendChart } from "@/components/visualizations/TemporalTrendChart";

export function SystemsChapter() {
  return (
    <Section
      id="systems"
      chapter={3}
      title="Systems View"
      subtitle="Education outcomes emerge from interconnected systems: infrastructure, security, demographics, and policy. This section explores the causal relationships and feedback loops that drive—or inhibit—learning."
    >
      {/* Correlation analysis */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          How Metrics Interact
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          The correlation matrix reveals structural relationships between key
          metrics. Strong correlations suggest shared underlying causes; weak
          correlations indicate independent factors that may require separate
          interventions.
        </p>
        <CorrelationHeatmap />
      </div>

      {/* Infrastructure-Learning relationship */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          The Infrastructure-Learning Link
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Does better infrastructure guarantee better outcomes? The data
          suggests a moderate relationship (r=0.42)—infrastructure is necessary
          but not sufficient. Districts with identical infrastructure scores
          show wide variance in learning outcomes, pointing to &quot;management
          efficiency&quot; as a hidden variable.
        </p>
        <ScatterPlot
          xMetric="icc"
          yMetric="learningScore"
          title="Infrastructure Composite vs Learning Score"
        />
      </div>

      {/* Security impact */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Security and Educational Resilience
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Security fragility (measured by bomb blasts and terrorist incidents)
          shows a weak negative correlation with retention. However, some
          high-conflict districts maintain strong retention—demonstrating
          institutional resilience.
        </p>
        <ScatterPlot
          xMetric="sfs"
          yMetric="retentionScore"
          title="Security Fragility vs Student Retention"
        />
      </div>

      {/* Temporal trends */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Trajectories Over Time
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Tracking provincial progress from 2013–2016 reveals divergent
          trajectories. While most provinces show improvement, the rate of
          change varies significantly. The gap between leaders and laggards is
          widening, not closing.
        </p>
        <TemporalTrendChart />
      </div>

      {/* Key insight */}
      <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 mb-2">
              Systems Insight
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              The data reveals a &quot;threshold effect&quot;: below ~0.5 ICC
              (infrastructure composite), learning outcomes cluster around 30-40
              points regardless of other factors. Above this threshold, outcomes
              become more variable—suggesting infrastructure acts as a
              prerequisite that enables (but doesn&apos;t guarantee) learning
              gains.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

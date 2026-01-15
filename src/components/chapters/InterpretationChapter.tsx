"use client";

import { Section } from "@/components/ui/Section";

export function InterpretationChapter() {
  return (
    <Section
      id="interpretation"
      chapter={5}
      title="Interpretation"
      subtitle="What the data suggests—and what it cannot claim. A careful reading of the evidence, its limitations, and the questions it raises for policy."
    >
      {/* What we know */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          What We Know With Confidence
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">
              Regional disparities are structural
            </p>
            <p className="text-slate-600 leading-relaxed">
              The 40-point gap between ICT and Balochistan is not noise—it
              persists across all years and metrics. These are embedded
              inequalities in resource allocation and governance capacity.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">
              Gender parity is infrastructure-sensitive
            </p>
            <p className="text-slate-600 leading-relaxed">
              The strong correlation (0.52) between boundary walls and female
              enrollment is robust across provinces. Physical privacy is a
              measurable barrier to girls&apos; education—and an addressable
              one.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">
              Infrastructure has a threshold effect
            </p>
            <p className="text-slate-600 leading-relaxed">
              Below ~0.5 ICC, learning outcomes are suppressed regardless of
              other factors. Above this threshold, outcomes become
              variable—suggesting infrastructure is necessary but not
              sufficient.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-slate-900 mb-2">
              Positive deviance exists and is learnable
            </p>
            <p className="text-slate-600 leading-relaxed">
              Districts like Hunza and Ghanche achieve elite outcomes with
              minimal resources. These are not anomalies but replicable
              models—if we can identify and transfer their practices.
            </p>
          </div>
        </div>
      </div>

      {/* What remains uncertain */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          What Remains Uncertain
        </h3>
        <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl space-y-6">
          <div className="flex items-start gap-4">
            <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
              <span className="text-amber-700 font-bold">?</span>
            </span>
            <p className="text-lg text-slate-700">
              <strong className="text-slate-900">Causality direction:</strong>{" "}
              Do better facilities cause enrollment, or do high-enrollment areas
              attract more investment?
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
              <span className="text-amber-700 font-bold">?</span>
            </span>
            <p className="text-lg text-slate-700">
              <strong className="text-slate-900">
                Learning measurement validity:
              </strong>{" "}
              Are the &quot;Learning Scores&quot; comparable across provinces,
              or do assessment practices vary?
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
              <span className="text-amber-700 font-bold">?</span>
            </span>
            <p className="text-lg text-slate-700">
              <strong className="text-slate-900">Teacher quality:</strong> The
              dataset lacks teacher qualification or training metrics—a critical
              missing variable.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
              <span className="text-amber-700 font-bold">?</span>
            </span>
            <p className="text-lg text-slate-700">
              <strong className="text-slate-900">
                Ghost enrollment magnitude:
              </strong>{" "}
              The enrollment-learning gaps suggest data quality issues, but we
              cannot distinguish measurement error from genuine patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Policy implications */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Questions for Policy
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Rather than prescriptions, the data raises questions that require
          local context and stakeholder input to answer:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wide">
              Resource Allocation
            </p>
            <p className="text-slate-600 leading-relaxed">
              Should investment prioritize lifting lagging provinces to the
              infrastructure threshold, or deepening capacity in regions already
              above it?
            </p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wide">
              Gender Equity
            </p>
            <p className="text-slate-600 leading-relaxed">
              Given the boundary wall correlation, should girls&apos; school
              construction prioritize privacy infrastructure over classroom
              capacity?
            </p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wide">
              Efficiency Models
            </p>
            <p className="text-slate-600 leading-relaxed">
              What governance practices in GB enable 2× efficiency? Can they
              transfer to districts with similar resource profiles but worse
              outcomes?
            </p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <p className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wide">
              Data Quality
            </p>
            <p className="text-slate-600 leading-relaxed">
              Should enrollment verification systems be strengthened before
              expanding enrollment-based funding formulas?
            </p>
          </div>
        </div>
      </div>

      {/* Closing reflection */}
      <div className="mb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          Closing Reflection
        </h3>
        <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl">
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            Data illuminates patterns but does not dictate solutions. This
            analysis reveals a Pakistan education system with deep structural
            inequities, measurable barriers, and—crucially—proven exceptions
            that suggest change is possible.
          </p>
          <p className="text-xl text-slate-700 leading-relaxed">
            The question is not whether improvement is possible, but whether the
            political and institutional will exists to learn from the positive
            deviants among us.
          </p>
        </div>
      </div>

      {/* Methodology note */}
      <div className="pt-8 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Methodology Note
        </h4>
        <p className="text-slate-500 leading-relaxed">
          This analysis uses the 2013-2016 Pakistan Education Performance
          Dataset. Custom metrics (GPI, ICC, SFS, LER, RDI) were engineered from
          raw variables. GPI values were capped at 2.0 to remove statistical
          outliers. Correlations reported are Pearson coefficients. All
          visualizations use pre-aggregated provincial means with standard
          deviations shown where applicable.
        </p>
      </div>
    </Section>
  );
}

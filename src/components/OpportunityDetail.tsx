"use client";

import { OpportunityDetail as OpportunityDetailType } from "@/modules/types";

interface OpportunityDetailProps {
  opportunity: OpportunityDetailType;
  onBack?: () => void;
}

export default function OpportunityDetail({
  opportunity,
  onBack,
}: OpportunityDetailProps) {
  const decisionColor = {
    ACT: "text-brand",
    WATCH: "text-muted",
    IGNORE: "text-muted opacity-50",
  }[opportunity.decision.decision];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-brand hover:text-brand-dark text-sm font-medium mb-6 transition-colors"
          >
            ← Back to results
          </button>
        )}
        <h1 className="font-display text-5xl leading-tight text-navy mb-4">
          {opportunity.cluster.name}
        </h1>
        <p className={`font-display text-2xl font-600 ${decisionColor}`}>
          {opportunity.decision.decision}
        </p>
      </div>

      {/* Cluster Overview */}
      <section className="border-b border-gray-100 pb-12">
        <h2 className="font-display text-3xl font-600 text-navy mb-8">
          Cluster Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-muted-label mb-3">Businesses</h5>
            <p className="font-display text-4xl font-600 text-navy">
              {opportunity.cluster.businessCount}
            </p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Probability</h5>
            <p className="font-display text-4xl font-600 text-navy">
              {Math.round(opportunity.cluster.buyingProbability * 100)}%
            </p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Confidence</h5>
            <p className="font-display text-4xl font-600 text-navy">
              {Math.round(opportunity.cluster.confidence * 100)}%
            </p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Risk</h5>
            <p className="font-display text-3xl font-600 text-navy capitalize">
              {opportunity.stressTest.riskLevel}
            </p>
          </div>
        </div>
      </section>

      {/* Probability Factors */}
      <section className="border-b border-gray-100 pb-12">
        <h2 className="font-display text-3xl font-600 text-navy mb-8">
          Probability Factors
        </h2>
        <div className="space-y-6">
          {[
            {
              label: "Pressure Intensity",
              value: opportunity.buyingProbability.pressureIntensity,
            },
            {
              label: "Urgency",
              value: opportunity.buyingProbability.urgency,
            },
            {
              label: "Logistics Fit",
              value: opportunity.buyingProbability.logisticsFit,
            },
            {
              label: "Market Similarity",
              value: opportunity.buyingProbability.marketSimilarity,
            },
          ].map((factor, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-navy">{factor.label}</span>
                <span className="font-display font-600 text-navy">
                  {Math.round(factor.value * 100)}%
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className="bg-brand h-2 rounded-full transition-all"
                  style={{ width: `${factor.value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h5 className="text-muted-label mb-3">Key Factors</h5>
          <p className="text-navy leading-relaxed">
            {opportunity.buyingProbability.explanationFactors.join(" • ")}
          </p>
        </div>
      </section>

      {/* Recognition Simulation */}
      <section className="border-b border-gray-100 pb-12">
        <h2 className="font-display text-3xl font-600 text-navy mb-8">
          Simulated Outreach
        </h2>
        <div className="bg-surface rounded-lg p-8 mb-8 border border-gray-200">
          <p className="text-navy leading-relaxed whitespace-pre-wrap">
            {opportunity.recognitionSimulation.message}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h5 className="text-muted-label mb-3">Psychological Fit</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.recognitionSimulation.psychologicalFit * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Commercial Fit</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.recognitionSimulation.commercialFit * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Logistics Fit</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.recognitionSimulation.logisticsFit * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
        </div>
      </section>

      {/* Stress Test Results */}
      <section className="border-b border-gray-100 pb-12">
        <h2 className="font-display text-3xl font-600 text-navy mb-8">
          Stress Test
        </h2>

        <div className="mb-10">
          <h5 className="text-muted-label mb-4">Safe to Surface</h5>
          <p
            className={`font-display text-2xl font-600 ${
              opportunity.stressTest.safeToSurface
                ? "text-brand"
                : "text-muted"
            }`}
          >
            {opportunity.stressTest.safeToSurface ? "Yes" : "No"}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-10 pb-10 border-b border-gray-100">
          <div>
            <h5 className="text-muted-label mb-3">Helpful vs Creepy</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.stressTest.psychological.helpfulVsCreepy * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Clarity</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.stressTest.psychological.clarity * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
          <div>
            <h5 className="text-muted-label mb-3">Trust</h5>
            <p className="font-display text-3xl font-600 text-navy">
              {Math.round(opportunity.stressTest.psychological.trust * 10) / 10}
            </p>
            <p className="text-xs text-muted mt-1">/10</p>
          </div>
        </div>

        <div>
          <h5 className="text-muted-label mb-4">Observations</h5>
          <ul className="space-y-3">
            {opportunity.stressTest.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 text-navy">
                <span className="text-brand font-600 flex-shrink-0 mt-0.5">→</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why This Was Surfaced */}
      <section>
        <h2 className="font-display text-3xl font-600 text-navy mb-8">
          Why This Was Surfaced
        </h2>
        <ul className="space-y-3">
          {opportunity.whyThisSurfaced.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3 text-navy">
              <span className="text-brand font-600 flex-shrink-0 mt-0.5">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

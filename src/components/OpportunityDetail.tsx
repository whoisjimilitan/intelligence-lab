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
    ACT: "text-green-700",
    WATCH: "text-yellow-700",
    IGNORE: "text-gray-700",
  }[opportunity.decision.decision];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back to Results
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900">
          {opportunity.cluster.name}
        </h1>
        <p className={`text-lg font-semibold mt-2 ${decisionColor}`}>
          Decision: {opportunity.decision.decision}
        </p>
      </div>

      {/* Pressure Cluster Info */}
      <section className="bg-blue-50 border border-blue-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pressure Cluster Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold">
              Businesses Affected
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {opportunity.cluster.businessCount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold">
              Buying Probability
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {Math.round(opportunity.cluster.buyingProbability * 100)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold">
              Confidence Level
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {Math.round(opportunity.cluster.confidence * 100)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold">
              Risk Level
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {opportunity.stressTest.riskLevel.toUpperCase()}
            </p>
          </div>
        </div>
      </section>

      {/* Buying Probability Breakdown */}
      <section className="bg-purple-50 border border-purple-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Buying Probability Factors
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Pressure Intensity</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${opportunity.buyingProbability.pressureIntensity * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-900 font-semibold ml-4">
              {Math.round(
                opportunity.buyingProbability.pressureIntensity * 100
              )}
              %
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Urgency</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${opportunity.buyingProbability.urgency * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-900 font-semibold ml-4">
              {Math.round(opportunity.buyingProbability.urgency * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Logistics Fit</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${opportunity.buyingProbability.logisticsFit * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-900 font-semibold ml-4">
              {Math.round(opportunity.buyingProbability.logisticsFit * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Market Similarity</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{
                  width: `${opportunity.buyingProbability.marketSimilarity * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-900 font-semibold ml-4">
              {Math.round(
                opportunity.buyingProbability.marketSimilarity * 100
              )}
              %
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-300">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Key Factors:</span>{" "}
            {opportunity.buyingProbability.explanationFactors.join(" • ")}
          </p>
        </div>
      </section>

      {/* Recognition Simulation */}
      <section className="bg-green-50 border border-green-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Simulated Recognition Message
        </h2>
        <div className="bg-white rounded p-4 mb-4 border border-green-200">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {opportunity.recognitionSimulation.message}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase font-semibold">
              Psychological Fit
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {Math.round(opportunity.recognitionSimulation.psychologicalFit * 10) /
                10}
              /10
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase font-semibold">
              Commercial Fit
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {Math.round(opportunity.recognitionSimulation.commercialFit * 10) /
                10}
              /10
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase font-semibold">
              Logistics Fit
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {Math.round(opportunity.recognitionSimulation.logisticsFit * 10) /
                10}
              /10
            </p>
          </div>
        </div>
      </section>

      {/* Stress Test Results */}
      <section className="bg-red-50 border border-red-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Stress Test Results
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold mb-2">
              Safe to Surface
            </p>
            <p
              className={`text-lg font-bold ${
                opportunity.stressTest.safeToSurface
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {opportunity.stressTest.safeToSurface ? "YES" : "NO"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 my-4">
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Helpful vs Creepy
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {Math.round(
                  opportunity.stressTest.psychological.helpfulVsCreepy * 10
                ) / 10}
                /10
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Clarity
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {Math.round(opportunity.stressTest.psychological.clarity * 10) /
                  10}
                /10
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase font-semibold">
                Trust
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {Math.round(opportunity.stressTest.psychological.trust * 10) /
                  10}
                /10
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold mb-2">
              Risk Notes
            </p>
            <ul className="space-y-2">
              {opportunity.stressTest.notes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why This Was Surfaced - Panel */}
      <section className="bg-orange-50 border border-orange-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Why This Was Surfaced
        </h2>
        <ul className="space-y-2">
          {opportunity.whyThisSurfaced.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-orange-600 font-bold mt-1">✓</span>
              <span className="text-gray-800">{reason}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

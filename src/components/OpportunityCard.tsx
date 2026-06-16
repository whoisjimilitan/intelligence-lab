"use client";

import { OpportunityDetail } from "@/modules/types";

interface OpportunityCardProps {
  opportunity: OpportunityDetail;
  onClick?: () => void;
}

const DECISION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ACT: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300" },
  WATCH: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-300" },
  IGNORE: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-300" },
};

export default function OpportunityCard({
  opportunity,
  onClick,
}: OpportunityCardProps) {
  const colors = DECISION_COLORS[opportunity.decision.decision];

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${colors.bg} ${colors.border}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {opportunity.cluster.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {opportunity.cluster.businessCount} businesses affected
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full font-semibold text-sm ${colors.text}`}
        >
          {opportunity.decision.decision}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">
            Buying Probability
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {Math.round(opportunity.cluster.buyingProbability * 100)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">
            Confidence
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {Math.round(opportunity.cluster.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="bg-white bg-opacity-50 rounded p-3 mb-4">
        <p className="text-xs text-gray-600 uppercase font-semibold mb-2">
          Expected Outcomes
        </p>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-600">Engagement:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {Math.round(
                opportunity.decision.expectedOutcome.engagementRate * 100
              )}
              %
            </span>
          </div>
          <div>
            <span className="text-gray-600">Conversion:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {Math.round(
                opportunity.decision.expectedOutcome.conversionRate * 100
              )}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Why This Was Surfaced */}
      <div className="bg-white bg-opacity-50 rounded p-3">
        <p className="text-xs text-gray-600 uppercase font-semibold mb-2">
          Why This Was Surfaced
        </p>
        <ul className="text-sm text-gray-700 space-y-1">
          {opportunity.whyThisSurfaced.slice(0, 3).map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

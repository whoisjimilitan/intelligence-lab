"use client";

import { OpportunityDetail } from "@/modules/types";

interface OpportunityCardProps {
  opportunity: OpportunityDetail;
  onClick?: () => void;
}

const DECISION_CONFIG: Record<string, { label: string; color: string }> = {
  ACT: { label: "ACT", color: "text-brand" },
  WATCH: { label: "WATCH", color: "text-muted" },
  IGNORE: { label: "IGNORE", color: "text-muted opacity-50" },
};

export default function OpportunityCard({
  opportunity,
  onClick,
}: OpportunityCardProps) {
  const config = DECISION_CONFIG[opportunity.decision.decision];

  return (
    <button
      onClick={onClick}
      className="card-premium w-full text-left hover:shadow-md transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
        <div className="flex-1">
          <h3 className="font-display text-2xl font-600 text-navy mb-2">
            {opportunity.cluster.name}
          </h3>
          <p className="text-muted text-sm">
            {opportunity.cluster.businessCount}{" "}
            {opportunity.cluster.businessCount === 1 ? "business" : "businesses"} affected
          </p>
        </div>
        <span className={`font-display text-xl font-600 ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h5 className="text-muted-label mb-2">Probability</h5>
          <p className="font-display text-3xl font-600 text-navy">
            {Math.round(opportunity.cluster.buyingProbability * 100)}%
          </p>
        </div>
        <div>
          <h5 className="text-muted-label mb-2">Confidence</h5>
          <p className="font-display text-3xl font-600 text-navy">
            {Math.round(opportunity.cluster.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h5 className="text-muted-label mb-3">Expected Outcomes</h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Engagement</span>
            <span className="font-600 text-navy">
              {Math.round(opportunity.decision.expectedOutcome.engagementRate * 100)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Conversion</span>
            <span className="font-600 text-navy">
              {Math.round(opportunity.decision.expectedOutcome.conversionRate * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Why This Was Surfaced */}
      <div>
        <h5 className="text-muted-label mb-3">Why Surfaced</h5>
        <ul className="text-sm text-navy space-y-2">
          {opportunity.whyThisSurfaced.slice(0, 2).map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-brand font-600 flex-shrink-0">→</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

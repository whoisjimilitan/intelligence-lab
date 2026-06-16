"use client";

import { OpportunityDetail } from "@/modules/types";

interface OpportunityCardProps {
  opportunity: OpportunityDetail;
  onClick?: () => void;
}

export default function OpportunityCard({
  opportunity,
  onClick,
}: OpportunityCardProps) {
  const isAct = opportunity.decision.decision === "ACT";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-6 rounded-lg border transition-all ${
        isAct
          ? "border-gray-200 bg-white hover:border-brand"
          : "border-gray-100 bg-surface hover:border-gray-200"
      }`}
    >
      {/* Pressure Name (Identity) */}
      <h3 className="font-display text-2xl text-navy mb-1">
        {opportunity.cluster.name}
      </h3>

      {/* Context: Market Size */}
      <p className="text-sm text-muted mb-4">
        {opportunity.cluster.businessCount} businesses
      </p>

      {/* Why It Matters: Probability & Confidence */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted uppercase font-semibold mb-1">Buying Probability</p>
            <p className="font-display text-2xl text-navy">
              {Math.round(opportunity.cluster.buyingProbability * 100)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-semibold mb-1">Expected Engagement</p>
            <p className="font-display text-2xl text-navy">
              {Math.round(opportunity.decision.expectedOutcome.engagementRate * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* What to Do: Decision */}
      <p className="text-xs text-muted uppercase font-semibold mb-3">Decision</p>
      <p className={`font-display text-lg font-semibold ${
        isAct ? "text-brand" : "text-muted"
      }`}>
        {opportunity.decision.decision}
      </p>
    </button>
  );
}

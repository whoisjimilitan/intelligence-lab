"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostcodeSearch from "@/components/PostcodeSearch";
import OpportunityCard from "@/components/OpportunityCard";
import { OpportunityDetail as OpportunityDetailType } from "@/modules/types";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<OpportunityDetailType[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastPostcode, setLastPostcode] = useState("");

  const handleSearch = async (postcode: string, radius: number) => {
    setIsLoading(true);
    setLastPostcode(postcode);
    try {
      const results = await orchestrateMarketAnalysis({
        postcode,
        radius,
      });
      setOpportunities(results);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error scanning market:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Top Navigation */}
        <div className="flex justify-end items-center gap-8 mb-20">
          <a
            href="/upload"
            className="text-brand hover:text-brand-dark text-sm font-medium transition-colors"
          >
            CSV Upload
          </a>
          <a
            href="/validate"
            className="text-brand hover:text-brand-dark text-sm font-medium transition-colors"
          >
            Validation
          </a>
        </div>

        {!searchPerformed ? (
          <>
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto mb-20">
              <h1 className="font-display text-6xl leading-tight text-navy mb-6">
                Discover market intelligence.
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Scan your local market for operational friction opportunities.
                Understand pressure clusters, buying probability, and strategic viability.
              </p>
              <p className="text-sm text-muted">
                Intelligence Lab is an educational decision intelligence simulator.
                All analysis is simulated. No production integrations.
              </p>
            </div>

            {/* Search */}
            <div className="flex justify-center mb-32">
              <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-20">
              <div>
                <h4 className="font-display text-xl font-semibold text-navy mb-3">
                  Market Scanning
                </h4>
                <p className="text-muted leading-relaxed text-sm">
                  Postcode-based industry clustering. Identifies operational pressures
                  across business types. Mock data, real patterns.
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-navy mb-3">
                  Buying Intelligence
                </h4>
                <p className="text-muted leading-relaxed text-sm">
                  Multi-factor probability calculation. Accounts for pressure intensity,
                  urgency, logistics fit, and market similarity.
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-navy mb-3">
                  Safety Evaluation
                </h4>
                <p className="text-muted leading-relaxed text-sm">
                  Psychological, commercial, and behavioral stress testing.
                  Ensures every surfaced opportunity meets safety thresholds.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-12">
              <button
                onClick={() => setSearchPerformed(false)}
                className="text-brand hover:text-brand-dark text-sm font-medium mb-6 transition-colors"
              >
                ← New search
              </button>
              <h2 className="font-display text-4xl text-navy mb-2">
                Market scan: {lastPostcode}
              </h2>
              <p className="text-muted">
                {opportunities.length}{" "}
                {opportunities.length === 1 ? "opportunity" : "opportunities"} identified
              </p>
            </div>

            {/* Results Grid */}
            {opportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {opportunities.map((opp, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      router.push(
                        `/opportunity?id=${idx}&cluster=${encodeURIComponent(opp.cluster.name)}`
                      );
                    }}
                  >
                    <OpportunityCard opportunity={opp} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-premium text-center py-16">
                <h3 className="font-display text-2xl text-navy mb-2">No opportunities</h3>
                <p className="text-muted">
                  No pressure clusters identified for this postcode.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

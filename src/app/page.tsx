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

  // Bucket opportunities by decision
  const actNow = opportunities.filter((o) => o.decision.decision === "ACT");
  const watch = opportunities.filter((o) => o.decision.decision === "WATCH");
  const ignore = opportunities.filter((o) => o.decision.decision === "IGNORE");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Decision Intelligence
          </div>
          <div className="flex gap-8">
            <a
              href="/admin"
              className="text-brand hover:text-brand-dark text-sm font-medium transition-colors"
            >
              Admin Dashboard
            </a>
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
        </div>

        {!searchPerformed ? (
          <>
            {/* Hero Section */}
            <div className="max-w-3xl mb-20">
              <h1 className="font-display text-6xl leading-tight text-navy mb-6">
                Decision Screen.
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Enter a postcode. The engine identifies which businesses to reach out to,
                ranked by likelihood to convert to a customer.
              </p>
              <p className="text-sm text-muted">
                Intelligence Lab is a decision intelligence system, not a CRM.
                The engine does the heavy lifting. You decide.
              </p>
            </div>

            {/* Search */}
            <div className="flex justify-center mb-20">
              <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* How It Works */}
            <div className="border-t border-gray-100 pt-20">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-8">
                The Process
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-navy mb-3">1</div>
                  <h4 className="font-display text-lg text-navy mb-2">Detect Pressure</h4>
                  <p className="text-sm text-muted">
                    Identify operational pressures in your market.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-navy mb-3">2</div>
                  <h4 className="font-display text-lg text-navy mb-2">Test Fit</h4>
                  <p className="text-sm text-muted">
                    Psychological, commercial, logistics fit checks.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-navy mb-3">3</div>
                  <h4 className="font-display text-lg text-navy mb-2">Stress Test</h4>
                  <p className="text-sm text-muted">
                    Verify before surfacing to operators.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-navy mb-3">4</div>
                  <h4 className="font-display text-lg text-navy mb-2">Decide</h4>
                  <p className="text-sm text-muted">
                    ACT, WATCH, or IGNORE each opportunity.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Decision Header */}
            <div className="mb-12">
              <button
                onClick={() => setSearchPerformed(false)}
                className="text-brand hover:text-brand-dark text-sm font-medium mb-4 transition-colors"
              >
                ← New market
              </button>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-display text-5xl text-navy mb-2">
                    {lastPostcode}
                  </h2>
                  <p className="text-muted">
                    {opportunities.length} pressure clusters identified
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Buckets */}
            {opportunities.length > 0 ? (
              <div className="space-y-16">
                {/* ACT NOW */}
                {actNow.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-6">
                      ACT NOW — {actNow.length} cluster{actNow.length !== 1 ? "s" : ""}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {actNow.map((opp, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            router.push(
                              `/opportunity?id=${opportunities.indexOf(opp)}`
                            );
                          }}
                        >
                          <OpportunityCard opportunity={opp} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WATCH */}
                {watch.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-yellow-600 mb-6">
                      WATCH — {watch.length} cluster{watch.length !== 1 ? "s" : ""}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {watch.map((opp, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            router.push(
                              `/opportunity?id=${opportunities.indexOf(opp)}`
                            );
                          }}
                        >
                          <OpportunityCard opportunity={opp} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IGNORE */}
                {ignore.length > 0 && (
                  <div className="opacity-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-6">
                      IGNORE — {ignore.length} cluster{ignore.length !== 1 ? "s" : ""} (low probability)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {ignore.map((opp, idx) => (
                        <div key={idx}>
                          <OpportunityCard opportunity={opp} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

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
  const [opportunities, setOpportunities] = useState<OpportunityDetailType[]>(
    []
  );
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

  const actNow = opportunities.filter((o) => o.decision.decision === "ACT");
  const watch = opportunities.filter((o) => o.decision.decision === "WATCH");

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* OPERATOR'S PRIMARY QUESTION */}
        {!searchPerformed ? (
          <>
            {/* Scan Market Interface */}
            <div className="mb-24">
              <h5 className="mb-6">Market Intelligence</h5>
              <h1 className="mb-4">Find opportunities by location.</h1>
              <p className="text-base text-muted mb-16 max-w-3xl leading-relaxed">
                Intelligence Lab detects businesses experiencing operational
                pressures. Search by postcode. System analyzes pressure type,
                fit, and readiness to engage.
              </p>

              {/* Search Component */}
              <div className="mb-24">
                <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
              </div>

              {/* Value Prop: What This System Does */}
              <div className="border-t border-subtle pt-16">
                <h5 className="mb-8">System Capabilities</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div>
                    <h4 className="text-brand mb-3">Detection</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Identifies 46 operational pressure types across 100+
                      industries. No guesswork.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-brand mb-3">Qualification</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Tests psychological, commercial, logistics fit. Only
                      surfaces qualified opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-brand mb-3">Reasoning</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Shows WHY each opportunity matters. Build trust in every
                      recommendation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* SCAN COMPLETE: Show Results */}

            {/* State: What was found? */}
            <div className="mb-20 pb-16 border-b border-subtle">
              <h5 className="mb-6">Results for {lastPostcode}</h5>
              <p className="text-base text-muted mb-12">
                Found {opportunities.length}{" "}
                {opportunities.length === 1 ? "opportunity" : "opportunities"}.{" "}
                {actNow.length} ready to contact now.
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div>
                  <p className="text-metric">{opportunities.length}</p>
                  <p className="text-label mt-4">Total</p>
                </div>
                <div>
                  <p
                    className="text-metric"
                    style={{ color: "var(--color-brand)" }}
                  >
                    {actNow.length}
                  </p>
                  <p className="text-label mt-4">Ready Now</p>
                </div>
                <div>
                  <p className="text-metric text-muted">{watch.length}</p>
                  <p className="text-label mt-4">Monitor</p>
                </div>
                <div>
                  <p className="text-metric">
                    {opportunities.length > 0
                      ? Math.round(
                          (actNow.length / opportunities.length) * 100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-label mt-4">Qualified</p>
                </div>
              </div>
            </div>

            {/* NEXT STEP: Contact These Now */}
            {actNow.length > 0 && (
              <div className="mb-24">
                <div className="mb-12">
                  <h3>Contact These Now</h3>
                  <p className="text-base text-muted mt-2">
                    Highest probability of engagement. Risk-tested and verified.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {actNow.map((opp, idx) => (
                    <OpportunityCard
                      key={idx}
                      opportunity={opp}
                      onClick={() =>
                        router.push(
                          `/company?name=${encodeURIComponent(opp.cluster.name)}`
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SECONDARY: Monitor These */}
            {watch.length > 0 && (
              <div className="mb-24 opacity-75">
                <div className="mb-12">
                  <h3>Monitor These</h3>
                  <p className="text-base text-muted mt-2">
                    Lower confidence. Develop before scaling outreach.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {watch.map((opp, idx) => (
                    <OpportunityCard
                      key={idx}
                      opportunity={opp}
                      onClick={() =>
                        router.push(
                          `/company?name=${encodeURIComponent(opp.cluster.name)}`
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Return to Search */}
            <div className="border-t border-subtle pt-16">
              <button
                onClick={() => {
                  setSearchPerformed(false);
                  setOpportunities([]);
                  setLastPostcode("");
                }}
                className="btn-ghost"
              >
                ← Search Another Market
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

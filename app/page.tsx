"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostcodeSearch from "@/components/PostcodeSearch";
import OpportunityCard from "@/components/OpportunityCard";
import { OpportunityDetail as OpportunityDetailType } from "@/modules/types";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";

export default function DecisionScreen() {
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Header */}
        <div className="mb-24 flex justify-between items-start">
          <div>
            <h5 className="mb-4">Operations</h5>
            <h1>Decision Screen.</h1>
          </div>
          {searchPerformed && (
            <a href="/reporting" className="text-brand font-semibold hover:underline">
              Reporting →
            </a>
          )}
        </div>

        {/* SEARCH PHASE */}
        {!searchPerformed ? (
          <div>
            {/* Input Section */}
            <div className="mb-24">
              <h5 className="mb-8">Postcode</h5>
              <div style={{ maxWidth: "500px" }}>
                <PostcodeSearch
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Process Guide */}
            <div className="border-t border-subtle pt-16">
              <h5 className="mb-12">Process</h5>
              <div className="grid grid-cols-4 gap-12">
                <div>
                  <h4 className="text-brand mb-2">Detect</h4>
                  <p className="text-sm text-muted">Identify pressures</p>
                </div>
                <div>
                  <h4 className="text-brand mb-2">Test</h4>
                  <p className="text-sm text-muted">Fit checks</p>
                </div>
                <div>
                  <h4 className="text-brand mb-2">Verify</h4>
                  <p className="text-sm text-muted">Stress test</p>
                </div>
                <div>
                  <h4 className="text-brand mb-2">Act</h4>
                  <p className="text-sm text-muted">Make decision</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* DECISION PHASE - Show opportunities that need action */}
            {actNow.length > 0 ? (
              <>
                <div className="mb-8">
                  <h5 className="mb-4">Ready to Contact</h5>
                  <p className="text-base text-muted mb-12">
                    {actNow.length} {actNow.length === 1 ? "opportunity" : "opportunities"} qualified and ready. Click to decide whether to send email.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
            ) : (
              <div className="text-center py-16">
                <p className="text-base text-muted mb-8">
                  No qualified opportunities found for {lastPostcode}.
                </p>
                <button
                  onClick={() => {
                    setSearchPerformed(false);
                    setOpportunities([]);
                    setLastPostcode("");
                  }}
                  className="btn-secondary py-3 px-6"
                >
                  ← Try Another Postcode
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

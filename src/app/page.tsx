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

  const actNow = opportunities.filter((o) => o.decision.decision === "ACT");
  const watch = opportunities.filter((o) => o.decision.decision === "WATCH");

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Operator Task: ONE QUESTION */}
        {!searchPerformed ? (
          <>
            {/* QUESTION: What market should I scan? */}
            <div className="mb-20">
              <h5 className="mb-4">Market Scanner</h5>
              <h1 className="mb-8">Find opportunities by location.</h1>
              <p className="text-base text-muted mb-12 max-w-2xl leading-relaxed">
                Search by postcode. Intelligence Lab detects businesses experiencing operational pressures. Results ranked by likelihood of engagement.
              </p>
              <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* Value Proposition - Why use this? */}
            <div className="border-t border-subtle pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-brand mb-2">Detection</h4>
                  <p className="text-sm text-muted">Identifies pressure types across industries. No guesswork.</p>
                </div>
                <div>
                  <h4 className="text-brand mb-2">Qualification</h4>
                  <p className="text-sm text-muted">Tests psychological, commercial, logistics fit. Safe to surface.</p>
                </div>
                <div>
                  <h4 className="text-brand mb-2">Reasoning</h4>
                  <p className="text-sm text-muted">Shows WHY each opportunity matters. Build trust in recommendations.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* OPERATOR'S TASK: Which businesses should I contact? */}

            {/* The Answer (Quick Stats) */}
            <div className="mb-16 pb-12 border-b border-subtle">
              <h5 className="mb-4">Results for {lastPostcode}</h5>
              <p className="text-base text-muted mb-8">
                Found {opportunities.length} opportunities. {actNow.length} ready to contact now.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <p className="text-metric">{opportunities.length}</p>
                  <p className="text-label mt-2">Total</p>
                </div>
                <div>
                  <p className="text-metric" style={{ color: 'var(--color-brand)' }}>{actNow.length}</p>
                  <p className="text-label mt-2">Ready Now</p>
                </div>
                <div>
                  <p className="text-metric text-muted">{watch.length}</p>
                  <p className="text-label mt-2">Watch</p>
                </div>
                <div>
                  <p className="text-metric">{opportunities.length > 0 ? Math.round((actNow.length / opportunities.length) * 100) : 0}%</p>
                  <p className="text-label mt-2">Qualified</p>
                </div>
              </div>
            </div>

            {/* ACT NOW - Primary Focus */}
            {actNow.length > 0 && (
              <div className="mb-24">
                <div className="mb-8">
                  <h3>Contact These Now</h3>
                  <p className="text-base text-muted mt-2">Highest probability of engagement. Risk-tested and verified.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {actNow.map((opp, idx) => (
                    <OpportunityCard
                      key={idx}
                      opportunity={opp}
                      onClick={() =>
                        router.push(`/pressure?name=${encodeURIComponent(opp.cluster.name)}`)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* WATCH - Secondary (Lower Confidence) */}
            {watch.length > 0 && (
              <div className="opacity-60">
                <div className="mb-8">
                  <h3>Monitor These</h3>
                  <p className="text-base text-muted mt-2">Potential but lower confidence. Test before scaling.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {watch.map((opp, idx) => (
                    <OpportunityCard
                      key={idx}
                      opportunity={opp}
                      onClick={() =>
                        router.push(`/pressure?name=${encodeURIComponent(opp.cluster.name)}`)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Back to Search */}
            <div className="mt-20 pt-16 border-t border-subtle text-center">
              <button
                onClick={() => {
                  setSearchPerformed(false);
                  setOpportunities([]);
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

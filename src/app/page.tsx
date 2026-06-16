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
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Operations
            </div>
            <h1 className="font-display text-4xl text-navy">
              {searchPerformed ? `Market: ${lastPostcode}` : "Decision Screen."}
            </h1>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/admin" className="text-brand hover:text-brand-dark font-medium">
              Pipeline
            </a>
            <a href="/upload" className="text-brand hover:text-brand-dark font-medium">
              Upload
            </a>
          </div>
        </div>

        {!searchPerformed ? (
          <>
            {/* Search Card */}
            <div className="mb-20">
              <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* How It Works — Minimal */}
            <div className="border-t border-gray-100 pt-16">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-8">
                Process
              </p>
              <div className="grid grid-cols-4 gap-8">
                {[
                  { step: "Detect", desc: "Identify pressures" },
                  { step: "Test", desc: "Fit checks" },
                  { step: "Verify", desc: "Stress test" },
                  { step: "Act", desc: "Make decision" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="text-navy font-semibold mb-1">{item.step}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-100">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Total
                </p>
                <p className="font-display text-3xl text-navy font-semibold">
                  {opportunities.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Act Now
                </p>
                <p className="font-display text-3xl text-navy font-semibold">
                  {actNow.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Watch
                </p>
                <p className="font-display text-3xl text-navy font-semibold">
                  {watch.length}
                </p>
              </div>
            </div>

            {/* ACT NOW */}
            {actNow.length > 0 && (
              <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-6">
                  ACT NOW
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* WATCH */}
            {watch.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-6 opacity-50">
                  WATCH
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
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
          </>
        )}
      </div>
    </div>
  );
}

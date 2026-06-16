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
        {/* Header */}
        <div className="mb-20 flex justify-between items-start">
          <div className="flex-1">
            <h5 className="mb-6">Decision System</h5>
            {searchPerformed ? (
              <div>
                <h2>Market: {lastPostcode}</h2>
                <p className="mt-4 text-base text-muted max-w-2xl">
                  Opportunities ranked by probability. ACT NOW requires immediate engagement. WATCH has potential but lower confidence.
                </p>
              </div>
            ) : (
              <div>
                <h1>Discover Operational Friction.</h1>
                <p className="mt-6 text-lg text-muted max-w-3xl leading-relaxed">
                  Intelligence Lab identifies businesses in your market experiencing pressures Saint & Story solves. Qualification happens before outreach.
                </p>
              </div>
            )}
          </div>
          {!searchPerformed && (
            <div className="text-right">
              <a href="/admin" className="text-sm font-semibold text-brand hover:text-blue-700">
                Pipeline →
              </a>
            </div>
          )}
        </div>

        {!searchPerformed ? (
          <>
            {/* Search */}
            <div className="mb-24">
              <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* Process */}
            <div className="border-t border-subtle pt-20">
              <h5 className="mb-12">How It Works</h5>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                {[
                  { step: "Detect", desc: "Scan by postcode. Identify pressures by industry." },
                  { step: "Qualify", desc: "Test psychological, commercial, logistics fit." },
                  { step: "Verify", desc: "Stress test messages. Validate safety. Rank by probability." },
                  { step: "Act", desc: "Send recognition outreach. Track engagement. Learn." },
                ].map((item, idx) => (
                  <div key={idx}>
                    <h4 className="text-brand mb-3">{item.step}</h4>
                    <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-16 pb-16 border-b border-subtle">
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <h5 className="mb-3">Total Opportunities</h5>
                  <p className="text-metric">{opportunities.length}</p>
                </div>
                <div>
                  <h5 className="mb-3">Act Now</h5>
                  <p className="text-metric" style={{ color: 'var(--color-brand)' }}>{actNow.length}</p>
                </div>
                <div>
                  <h5 className="mb-3">Watch</h5>
                  <p className="text-metric text-muted">{watch.length}</p>
                </div>
              </div>
            </div>

            {/* ACT NOW */}
            {actNow.length > 0 && (
              <div className="mb-20">
                <h5 className="mb-8">Highest Priority</h5>
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

            {/* WATCH */}
            {watch.length > 0 && (
              <div className="opacity-60">
                <h5 className="mb-8">Watch (Lower Confidence)</h5>
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
          </>
        )}
      </div>
    </div>
  );
}

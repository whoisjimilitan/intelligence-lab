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

  const handleSearch = async (postcode: string, radius: number) => {
    setIsLoading(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Intelligence Lab
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover operational friction opportunities in your market
          </p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Enter a postcode to scan for pressure clusters, buying probability,
            and strategic opportunities. All analysis is simulated and
            educational.
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <PostcodeSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {searchPerformed && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Market Scan Results
              </h2>
              <p className="text-gray-700">
                Found {opportunities.length} opportunity clusters
              </p>
            </div>

            {opportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-center py-12 bg-white rounded-lg border border-gray-300">
                <p className="text-gray-600 text-lg">
                  No opportunities found for this postcode.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📊 Market Scanner
            </h3>
            <p className="text-gray-700 text-sm">
              Scans your postcode for industry clusters and operational
              pressures.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Decision Engine
            </h3>
            <p className="text-gray-700 text-sm">
              Generates ACT/WATCH/IGNORE recommendations based on probability
              and risk.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🧠 Stress Testing
            </h3>
            <p className="text-gray-700 text-sm">
              Evaluates psychological, commercial, and behavioral fit for each
              opportunity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

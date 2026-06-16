"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import OpportunityDetailComponent from "@/components/OpportunityDetail";
import { OpportunityDetail } from "@/modules/types";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";

export default function OpportunityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const clusterName = searchParams.get("cluster");

  const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
        // Generate sample opportunities for demo
        // In a real app, this would fetch from state or a server
        const demoResults = await orchestrateMarketAnalysis({
          postcode: "M1",
          radius: 5,
        });

        if (id !== null && parseInt(id) < demoResults.length) {
          setOpportunity(demoResults[parseInt(id)]);
        }
      } catch (error) {
        console.error("Error loading opportunity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOpportunity();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 text-lg">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back
          </button>
          <div className="text-center py-12 bg-white rounded-lg border border-gray-300">
            <p className="text-gray-600 text-lg">Opportunity not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <OpportunityDetailComponent
          opportunity={opportunity}
          onBack={() => router.back()}
        />
      </div>
    </div>
  );
}

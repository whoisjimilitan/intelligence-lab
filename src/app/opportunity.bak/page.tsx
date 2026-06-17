"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import OpportunityDetailComponent from "@/components/OpportunityDetail";
import { OpportunityDetail } from "@/modules/types";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";

function OpportunityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <button
            onClick={() => router.back()}
            className="text-brand hover:text-brand-dark text-sm font-medium mb-6 transition-colors"
          >
            ← Back
          </button>
          <div className="text-center py-12 card-premium">
            <p className="text-muted text-lg">Opportunity not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <OpportunityDetailComponent
          opportunity={opportunity}
          onBack={() => router.back()}
        />
      </div>
    </div>
  );
}

export default function OpportunityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted">Loading opportunity details...</p>
          </div>
        </div>
      }
    >
      <OpportunityContent />
    </Suspense>
  );
}

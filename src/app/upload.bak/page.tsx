"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseCSV } from "@/engines/marketScanner";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";
import OpportunityCard from "@/components/OpportunityCard";
import { OpportunityDetail as OpportunityDetailType } from "@/modules/types";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [postcode, setPostcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<OpportunityDetailType[]>([]);
  const [uploadPerformed, setUploadPerformed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !postcode.trim()) {
      alert("Please select a CSV file and enter a postcode");
      return;
    }

    setIsLoading(true);
    try {
      const fileContent = await file.text();
      const csvData = parseCSV(fileContent);

      const results = await orchestrateMarketAnalysis({
        postcode: postcode.trim(),
        radius: 5,
        csvData,
      });

      setOpportunities(results);
      setUploadPerformed(true);
    } catch (error) {
      console.error("Error processing CSV:", error);
      alert("Error processing CSV file. Please check the format.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.push("/")}
            className="text-brand hover:text-brand-dark text-sm font-medium mb-6 transition-colors"
          >
            ← Back to search
          </button>
          <h1 className="font-display text-5xl leading-tight text-navy mb-4">
            Upload & Analyze
          </h1>
          <p className="text-muted text-lg">
            Provide your own business data. We'll identify market opportunities
            within your dataset.
          </p>
        </div>

        {/* Upload Form */}
        {!uploadPerformed && (
          <div className="card-premium max-w-2xl mb-12">
            <form onSubmit={handleUpload} className="space-y-8">
              <div>
                <label htmlFor="csv-file" className="text-muted-label mb-3 block">
                  CSV File
                </label>
                <input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="input-field"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted mt-3">
                  Expected columns: business name, industry, postcode
                </p>
              </div>

              <div>
                <label htmlFor="postcode" className="text-muted-label mb-3 block">
                  Postcode
                </label>
                <input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="M1 1AA"
                  className="input-field"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !file || !postcode.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Analyzing..." : "Analyze"}
              </button>
            </form>
          </div>
        )}

        {/* Results */}
        {uploadPerformed && (
          <div>
            <div className="mb-12 flex justify-between items-start">
              <div>
                <h2 className="font-display text-4xl text-navy mb-2">
                  Analysis Results
                </h2>
                <p className="text-muted">
                  {opportunities.length}{" "}
                  {opportunities.length === 1 ? "opportunity" : "opportunities"} identified from your data
                </p>
              </div>
              <button
                onClick={() => {
                  setUploadPerformed(false);
                  setFile(null);
                  setPostcode("");
                  setOpportunities([]);
                }}
                className="btn-primary text-sm"
              >
                Upload Another
              </button>
            </div>

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
                  No pressure clusters identified in your data.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

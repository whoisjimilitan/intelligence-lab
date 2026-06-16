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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to Search
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CSV Upload Analysis
          </h1>
          <p className="text-lg text-gray-700">
            Upload a CSV file with business data to analyze market opportunities
          </p>
        </div>

        {/* Upload Form */}
        {!uploadPerformed && (
          <div className="bg-white rounded-lg border border-gray-300 p-8 mb-12 max-w-2xl">
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label htmlFor="csv-file" className="block text-sm font-medium mb-2">
                  CSV File
                </label>
                <input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-600 mt-2">
                  Expected columns: business name, industry, postcode
                </p>
              </div>

              <div>
                <label htmlFor="postcode" className="block text-sm font-medium mb-2">
                  Postcode
                </label>
                <input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter postcode (e.g., M1 1AA)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !file || !postcode.trim()}
                className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Analyzing..." : "Analyze CSV"}
              </button>
            </form>
          </div>
        )}

        {/* Results */}
        {uploadPerformed && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Analysis Results
                </h2>
                <p className="text-gray-700">
                  Found {opportunities.length} opportunity clusters from your CSV
                </p>
              </div>
              <button
                onClick={() => {
                  setUploadPerformed(false);
                  setFile(null);
                  setPostcode("");
                  setOpportunities([]);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Upload Another
              </button>
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
                  No opportunities found in your CSV data.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

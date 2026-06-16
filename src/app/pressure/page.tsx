"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRESSURE_TAXONOMY } from "@/engines/pressureTaxonomy";

interface Company {
  id: string;
  name: string;
  industry: string;
  postcode: string;
  email: string;
  phone: string;
  decision: "ACT" | "WATCH" | "IGNORE";
  buyingProbability: number;
  engagementStatus: "not_sent" | "sent" | "opened" | "clicked" | "replied";
  lastInteraction?: string;
}

// Mock company data
const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-001",
    name: "Morrison's Pharmacy (M1)",
    industry: "Pharmacy",
    postcode: "M1 1AA",
    email: "manager@morrisons-pharm.co.uk",
    phone: "0161 234 5678",
    decision: "ACT",
    buyingProbability: 0.78,
    engagementStatus: "not_sent",
  },
  {
    id: "comp-002",
    name: "Boots Pharmacy Manchester",
    industry: "Pharmacy",
    postcode: "M1 2BB",
    email: "operations@boots-manchester.co.uk",
    phone: "0161 345 6789",
    decision: "ACT",
    buyingProbability: 0.71,
    engagementStatus: "not_sent",
  },
  {
    id: "comp-003",
    name: "Local Health Clinic M1",
    industry: "Healthcare",
    postcode: "M1 3CC",
    email: "manager@mhc-m1.co.uk",
    phone: "0161 456 7890",
    decision: "WATCH",
    buyingProbability: 0.55,
    engagementStatus: "not_sent",
  },
  {
    id: "comp-004",
    name: "Quick Meds Pharmacy",
    industry: "Pharmacy",
    postcode: "M1 4DD",
    email: "contact@quickmeds.co.uk",
    phone: "0161 567 8901",
    decision: "ACT",
    buyingProbability: 0.68,
    engagementStatus: "sent",
    lastInteraction: "2 days ago",
  },
  {
    id: "comp-005",
    name: "City Pharmacy Network",
    industry: "Pharmacy",
    postcode: "M1 5EE",
    email: "admin@citypharmacy.co.uk",
    phone: "0161 678 9012",
    decision: "WATCH",
    buyingProbability: 0.49,
    engagementStatus: "opened",
    lastInteraction: "6 hours ago",
  },
];

export default function PressurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pressureName = searchParams.get("name") || "Prescription Fulfilment";

  const [filterDecision, setFilterDecision] = useState<"ALL" | "ACT" | "WATCH" | "IGNORE">("ALL");

  const pressure = PRESSURE_TAXONOMY.find((p) => p.name === pressureName);
  const filteredCompanies = filterDecision === "ALL"
    ? MOCK_COMPANIES
    : MOCK_COMPANIES.filter((c) => c.decision === filterDecision);

  const actCount = MOCK_COMPANIES.filter((c) => c.decision === "ACT").length;
  const watchCount = MOCK_COMPANIES.filter((c) => c.decision === "WATCH").length;
  const engagementRate = MOCK_COMPANIES.filter((c) => c.engagementStatus !== "not_sent").length;

  const getStatusColor = (status: string) => {
    if (status === "ACT") return "text-red-600 bg-red-50";
    if (status === "WATCH") return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const getEngagementIcon = (status: string) => {
    if (status === "not_sent") return "○";
    if (status === "sent") return "→";
    if (status === "opened") return "✓";
    if (status === "clicked") return "↗";
    if (status === "replied") return "✓✓";
    return "?";
  };

  const getEngagementColor = (status: string) => {
    if (status === "not_sent") return "text-gray-400";
    if (status === "sent") return "text-blue-500";
    if (status === "opened") return "text-blue-600";
    if (status === "clicked") return "text-green-600";
    if (status === "replied") return "text-green-700";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className="text-brand hover:text-brand-dark text-sm font-medium mb-4 transition-colors"
          >
            ← Back
          </button>
          <h1 className="font-display text-5xl leading-tight text-navy mb-2">
            {pressureName}
          </h1>
          <p className="text-muted">{pressure?.definition}</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6 mb-12 pb-12 border-b border-gray-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Total Companies
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              {companies.length}
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Act Now
            </div>
            <p className="font-display text-3xl font-semibold text-red-600">
              {actCount}
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Watch
            </div>
            <p className="font-display text-3xl font-semibold text-yellow-600">
              {watchCount}
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Engagement
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              {engagementRate}/{companies.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {["ALL", "ACT", "WATCH", "IGNORE"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterDecision(filter as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterDecision === filter
                  ? "bg-brand text-white"
                  : "bg-surface text-navy hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Companies Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Company
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Contact
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Decision
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Probability
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="border-b border-gray-100 hover:bg-surface transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-navy font-semibold">{company.name}</div>
                    <div className="text-xs text-muted mt-1">{company.industry}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-navy">{company.email}</div>
                    <div className="text-xs text-muted">{company.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(company.decision)}`}>
                      {company.decision}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-navy">
                      {Math.round(company.buyingProbability * 100)}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`text-2xl ${getEngagementColor(company.engagementStatus)}`}>
                      {getEngagementIcon(company.engagementStatus)}
                    </div>
                    {company.lastInteraction && (
                      <div className="text-xs text-muted mt-1">{company.lastInteraction}</div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => router.push(`/company/${company.id}`)}
                      className="text-brand hover:text-brand-dark text-sm font-medium transition-colors"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

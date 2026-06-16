"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PipelineData {
  pressureType: string;
  discovered: number;
  qualified: number;
  sent: number;
  opened: number;
  replied: number;
  converted: number;
  totalValue: number;
  avgDealSize: number;
}

const MOCK_PIPELINE: PipelineData[] = [
  {
    pressureType: "Prescription Fulfilment",
    discovered: 99,
    qualified: 78,
    sent: 21,
    opened: 14,
    replied: 8,
    converted: 3,
    totalValue: 4200,
    avgDealSize: 1400,
  },
  {
    pressureType: "Delivery Reliability Pressure",
    discovered: 45,
    qualified: 38,
    sent: 12,
    opened: 9,
    replied: 4,
    converted: 2,
    totalValue: 3000,
    avgDealSize: 1500,
  },
  {
    pressureType: "Inventory Friction",
    discovered: 67,
    qualified: 42,
    sent: 8,
    opened: 5,
    replied: 2,
    converted: 1,
    totalValue: 1100,
    avgDealSize: 1100,
  },
  {
    pressureType: "Appointment Backlog",
    discovered: 34,
    qualified: 22,
    sent: 6,
    opened: 4,
    replied: 2,
    converted: 1,
    totalValue: 1200,
    avgDealSize: 1200,
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [selectedPressure, setSelectedPressure] = useState<string | null>(null);

  const totalDiscovered = MOCK_PIPELINE.reduce((sum, p) => sum + p.discovered, 0);
  const totalQualified = MOCK_PIPELINE.reduce((sum, p) => sum + p.qualified, 0);
  const totalSent = MOCK_PIPELINE.reduce((sum, p) => sum + p.sent, 0);
  const totalOpened = MOCK_PIPELINE.reduce((sum, p) => sum + p.opened, 0);
  const totalReplied = MOCK_PIPELINE.reduce((sum, p) => sum + p.replied, 0);
  const totalConverted = MOCK_PIPELINE.reduce((sum, p) => sum + p.converted, 0);
  const totalRevenue = MOCK_PIPELINE.reduce((sum, p) => sum + p.totalValue, 0);

  const conversionRate = totalSent > 0 ? ((totalConverted / totalSent) * 100).toFixed(1) : "0";
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";
  const replyRate = totalSent > 0 ? ((totalReplied / totalSent) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
            Admin
          </div>
          <h1 className="font-display text-5xl leading-tight text-navy mb-6">
            Pipeline Dashboard.
          </h1>
          <p className="text-muted max-w-2xl">
            Complete view of all discovered opportunities, outreach activity, and revenue pipeline.
            Track conversion funnel by pressure type.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-gray-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Total Revenue
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              £{(totalRevenue / 1000).toFixed(1)}k
            </p>
            <p className="text-xs text-muted mt-1">Monthly recurring</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Conversion Rate
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              {conversionRate}%
            </p>
            <p className="text-xs text-muted mt-1">{totalConverted}/{totalSent} deals</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Open Rate
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              {openRate}%
            </p>
            <p className="text-xs text-muted mt-1">{totalOpened}/{totalSent} opens</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
              Reply Rate
            </div>
            <p className="font-display text-3xl font-semibold text-navy">
              {replyRate}%
            </p>
            <p className="text-xs text-muted mt-1">{totalReplied}/{totalSent} replies</p>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="mb-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-8">
            Conversion Funnel
          </div>
          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {[
              { label: "Discovered", value: totalDiscovered, color: "bg-blue-200" },
              { label: "Qualified", value: totalQualified, color: "bg-blue-300" },
              { label: "Sent", value: totalSent, color: "bg-blue-400" },
              { label: "Opened", value: totalOpened, color: "bg-blue-500" },
              { label: "Replied", value: totalReplied, color: "bg-blue-600" },
              { label: "Converted", value: totalConverted, color: "bg-blue-700" },
            ].map((stage, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full ${stage.color} rounded-t-lg transition-all`}
                  style={{
                    height: `${(stage.value / totalDiscovered) * 100}%`,
                  }}
                />
                <div className="text-xs font-semibold text-navy mt-2 text-center">
                  {stage.label}
                </div>
                <div className="text-sm font-bold text-navy">{stage.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* By Pressure Type */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-6">
            Pipeline by Pressure Type
          </div>

          <div className="space-y-4">
            {MOCK_PIPELINE.map((pressure) => (
              <button
                key={pressure.pressureType}
                onClick={() =>
                  router.push(`/pressure?name=${encodeURIComponent(pressure.pressureType)}`)
                }
                className="w-full border border-gray-200 rounded-lg p-6 hover:bg-surface transition-colors text-left"
              >
                <div className="grid grid-cols-8 gap-4 items-center">
                  {/* Pressure Name */}
                  <div className="col-span-2">
                    <p className="font-semibold text-navy">{pressure.pressureType}</p>
                  </div>

                  {/* Funnel */}
                  <div>
                    <div className="text-xs text-muted">Discovered</div>
                    <p className="font-bold text-navy">{pressure.discovered}</p>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Sent</div>
                    <p className="font-bold text-navy">{pressure.sent}</p>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Opened</div>
                    <p className="font-bold text-navy">{pressure.opened}</p>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Replied</div>
                    <p className="font-bold text-navy">{pressure.replied}</p>
                  </div>

                  {/* Conversion */}
                  <div>
                    <div className="text-xs text-muted">Converted</div>
                    <p className="font-bold text-green-600">{pressure.converted}</p>
                  </div>

                  {/* Revenue */}
                  <div className="text-right">
                    <div className="text-xs text-muted">Monthly Value</div>
                    <p className="font-bold text-navy">£{pressure.totalValue}</p>
                    <p className="text-xs text-muted">({pressure.avgDealSize}/deal)</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="bg-surface rounded-lg p-8">
            <h3 className="font-display text-lg font-semibold text-navy mb-4">
              Pipeline Summary
            </h3>
            <ul className="space-y-3 text-sm text-navy">
              <li>→ {totalDiscovered} total opportunities discovered</li>
              <li>→ {totalQualified} qualified for outreach ({((totalQualified / totalDiscovered) * 100).toFixed(0)}%)</li>
              <li>→ {totalSent} outreach emails sent ({((totalSent / totalQualified) * 100).toFixed(0)}% of qualified)</li>
              <li>→ {totalOpened} emails opened ({openRate}% open rate)</li>
              <li>→ {totalReplied} positive replies ({replyRate}% reply rate)</li>
              <li>→ {totalConverted} customers converted ({conversionRate}% conversion rate)</li>
              <li>→ £{totalRevenue}/month total recurring revenue</li>
              <li>→ Average deal size: £{(totalRevenue / (totalConverted || 1)).toFixed(0)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

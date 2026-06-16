"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmailEngagementStats } from "@/lib/emailTracking";

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
  const [emailStats, setEmailStats] = useState<any>(null);

  useEffect(() => {
    const stats = getEmailEngagementStats();
    setEmailStats(stats);
  }, []);

  const totalSent = emailStats?.totalSent || 0;
  const totalOpened = emailStats?.opened || 0;
  const totalReplied = emailStats?.replied || 0;
  const totalRevenue = totalReplied * 1400;

  const openRate = emailStats?.openRate || "0";
  const replyRate = emailStats?.replyRate || "0";

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* OPERATOR QUESTION: Is the system working? */}
        <div className="mb-16 flex justify-between items-start">
          <div>
            <h5 className="mb-4">System Performance</h5>
            <h1>Pipeline Overview.</h1>
          </div>
          <a href="/" className="text-base font-semibold text-brand hover:text-blue-700">
            ← Back to Scanner
          </a>
        </div>

        {/* KEY METRICS - What Matters */}
        <div className="mb-20 pb-20 border-b border-subtle">
          <h3 className="mb-12">Outcomes</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <p className="text-label mb-3">Total Emails Sent</p>
              <p className="text-metric">{totalSent}</p>
              <p className="text-sm text-muted mt-2">Qualified outreach</p>
            </div>
            <div>
              <p className="text-label mb-3">Opened</p>
              <p className="text-metric">{openRate}%</p>
              <p className="text-sm text-muted mt-2">({totalOpened} of {totalSent})</p>
            </div>
            <div>
              <p className="text-label mb-3">Replied</p>
              <p className="text-metric" style={{ color: 'var(--color-brand)' }}>{replyRate}%</p>
              <p className="text-sm text-muted mt-2">({totalReplied} conversations)</p>
            </div>
            <div>
              <p className="text-label mb-3">Revenue Impact</p>
              <p className="text-metric">£{(totalRevenue / 1000).toFixed(1)}k</p>
              <p className="text-sm text-muted mt-2">Monthly recurring</p>
            </div>
          </div>
        </div>

        {/* PERFORMANCE BY PRESSURE TYPE */}
        <div>
          <h3 className="mb-8">Performance by Pressure Type</h3>
          <p className="text-base text-muted mb-12">Which pressures drive engagement and revenue?</p>

          <div className="space-y-4">
            {MOCK_PIPELINE.map((pressure) => {
              const openRate = pressure.sent > 0 ? ((pressure.opened / pressure.sent) * 100).toFixed(0) : 0;
              const replyRate = pressure.sent > 0 ? ((pressure.replied / pressure.sent) * 100).toFixed(0) : 0;

              return (
                <div
                  key={pressure.pressureType}
                  className="border border-subtle rounded-lg p-8 hover:bg-surface transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/pressure?name=${encodeURIComponent(pressure.pressureType)}`)
                  }
                >
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-start">
                    {/* Pressure Name */}
                    <div className="md:col-span-2">
                      <p className="text-label mb-2">Pressure Type</p>
                      <h4 className="text-navy">{pressure.pressureType}</h4>
                    </div>

                    {/* Funnel */}
                    <div>
                      <p className="text-label mb-2">Sent</p>
                      <p className="text-2xl font-semibold">{pressure.sent}</p>
                    </div>

                    <div>
                      <p className="text-label mb-2">Opened</p>
                      <p className="text-2xl font-semibold">{openRate}%</p>
                      <p className="text-xs text-muted mt-1">{pressure.opened} opens</p>
                    </div>

                    <div>
                      <p className="text-label mb-2">Replied</p>
                      <p className="text-2xl font-semibold" style={{ color: 'var(--color-brand)' }}>
                        {replyRate}%
                      </p>
                      <p className="text-xs text-muted mt-1">{pressure.replied} replies</p>
                    </div>

                    {/* Revenue */}
                    <div>
                      <p className="text-label mb-2">Revenue</p>
                      <p className="text-2xl font-semibold">£{pressure.totalValue}</p>
                      <p className="text-xs text-muted mt-1">avg £{pressure.avgDealSize}/deal</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmailEngagementStats } from "@/lib/email-tracking";

export default function ReportingPage() {
  const router = useRouter();
  const [emailStats, setEmailStats] = useState<any>(null);

  useEffect(() => {
    const stats = getEmailEngagementStats();
    setEmailStats(stats);
  }, []);

  const totalSent = emailStats?.totalSent || 0;
  const totalReplied = emailStats?.replied || 0;
  const yesResponses = emailStats?.yesResponses || 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Header */}
        <div className="mb-24 flex justify-between items-start">
          <div>
            <h5 className="mb-4">Operations</h5>
            <h1>Reporting.</h1>
          </div>
          <a
            href="/"
            className="text-brand font-semibold hover:underline"
          >
            ← Back to Decision Screen
          </a>
        </div>

        {/* OUTCOMES SECTION */}
        <div className="mb-24 pb-16 border-b border-subtle">
          <h5 className="mb-12">Outcomes</h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <p className="text-label mb-4">Emails Sent</p>
              <p className="text-4xl font-bold">{totalSent}</p>
              <p className="text-sm text-muted mt-2">Qualified outreach</p>
            </div>
            <div>
              <p className="text-label mb-4">Conversations Started</p>
              <p
                className="text-4xl font-bold"
                style={{ color: "var(--color-brand)" }}
              >
                {totalReplied}
              </p>
              <p className="text-sm text-muted mt-2">Engaged prospects</p>
            </div>
            <div>
              <p className="text-label mb-4">Positive Responses</p>
              <p
                className="text-4xl font-bold"
                style={{ color: "var(--color-success)" }}
              >
                {yesResponses}
              </p>
              <p className="text-sm text-muted mt-2">Ready to schedule</p>
            </div>
          </div>
        </div>

        {/* WHAT'S NEXT SECTION */}
        <div>
          <h5 className="mb-8">Next Steps</h5>
          <p className="text-base text-muted mb-12">
            {totalReplied > 0
              ? `You have ${totalReplied} conversation${totalReplied !== 1 ? "s" : ""} waiting for follow-up.`
              : "Send more emails to start conversations."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => router.push("/")}
              className="border border-brand text-brand font-semibold py-4 px-6 rounded-lg hover:bg-blue-50 transition-colors text-left"
            >
              <p className="mb-2">→ Scan Another Market</p>
              <p className="text-sm text-muted font-normal">Find new opportunities</p>
            </button>

            {totalReplied > 0 && (
              <button
                className="border border-subtle text-navy font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <p className="mb-2">→ Follow Up on Replies</p>
                <p className="text-sm text-muted font-normal">Contact engaged prospects</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PipelineMetric {
  pressureType: string;
  sent: number;
  opened: number;
  replied: number;
  conversionRate: number;
}

const MOCK_PIPELINE: PipelineMetric[] = [
  {
    pressureType: "Time-Critical Movement",
    sent: 21,
    opened: 14,
    replied: 8,
    conversionRate: 38,
  },
  {
    pressureType: "Capacity Overflow",
    sent: 18,
    opened: 12,
    replied: 7,
    conversionRate: 39,
  },
  {
    pressureType: "Inventory Friction",
    sent: 12,
    opened: 7,
    replied: 3,
    conversionRate: 25,
  },
  {
    pressureType: "Customer Churn",
    sent: 9,
    opened: 5,
    replied: 2,
    conversionRate: 22,
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
  const openRate = emailStats?.openRate || "0";
  const replyRate = emailStats?.replyRate || "0";
  const yesRate = emailStats?.yesRate || "0";

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Header: Is the system working? */}
        <div className="mb-20 flex justify-between items-start">
          <div>
            <h5 className="mb-4">System Performance</h5>
            <h1>Pipeline Overview</h1>
          </div>
          <a
            href="/"
            className="btn-ghost"
          >
            ← Back to Scanner
          </a>
        </div>

        {/* STATE: What's the current performance? */}
        <div className="mb-24 pb-16 border-b border-subtle">
          <h5 className="mb-8">Key Metrics</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <p className="text-label mb-4">Total Sent</p>
              <p className="text-metric">{totalSent}</p>
              <p className="text-sm text-muted mt-2">Qualified outreach</p>
            </div>
            <div>
              <p className="text-label mb-4">Open Rate</p>
              <p className="text-metric">{openRate}%</p>
              <p className="text-sm text-muted mt-2">Recognition</p>
            </div>
            <div>
              <p className="text-label mb-4">Reply Rate</p>
              <p
                className="text-metric"
                style={{ color: "var(--color-brand)" }}
              >
                {replyRate}%
              </p>
              <p className="text-sm text-muted mt-2">Engaged prospects</p>
            </div>
            <div>
              <p className="text-label mb-4">YES Rate</p>
              <p
                className="text-metric"
                style={{ color: "var(--color-success)" }}
              >
                {yesRate}%
              </p>
              <p className="text-sm text-muted mt-2">Of responses</p>
            </div>
          </div>
        </div>

        {/* HISTORY: How are different pressures performing? */}
        <div>
          <h5 className="mb-8">Performance by Pressure Type</h5>
          <p className="text-base text-muted mb-12">
            Which pressures drive engagement and conversion?
          </p>

          <div className="space-y-4">
            {MOCK_PIPELINE.map((pressure) => {
              const openRate =
                pressure.sent > 0
                  ? ((pressure.opened / pressure.sent) * 100).toFixed(0)
                  : 0;
              const replyRate =
                pressure.sent > 0
                  ? ((pressure.replied / pressure.sent) * 100).toFixed(0)
                  : 0;

              return (
                <div
                  key={pressure.pressureType}
                  className="border border-subtle rounded-lg p-8 hover:bg-white hover:border-muted transition-all cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/pressure?name=${encodeURIComponent(pressure.pressureType)}`
                    )
                  }
                >
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-start">
                    {/* Pressure Name */}
                    <div className="md:col-span-2">
                      <p className="text-label mb-2">Pressure Type</p>
                      <h4 className="text-navy">{pressure.pressureType}</h4>
                    </div>

                    {/* Metrics */}
                    <div>
                      <p className="text-label mb-2">Sent</p>
                      <p className="text-2xl font-semibold">
                        {pressure.sent}
                      </p>
                    </div>

                    <div>
                      <p className="text-label mb-2">Opened</p>
                      <p className="text-2xl font-semibold">{openRate}%</p>
                      <p className="text-xs text-muted mt-1">
                        {pressure.opened} opens
                      </p>
                    </div>

                    <div>
                      <p className="text-label mb-2">Replied</p>
                      <p
                        className="text-2xl font-semibold"
                        style={{ color: "var(--color-brand)" }}
                      >
                        {replyRate}%
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {pressure.replied} replies
                      </p>
                    </div>

                    <div>
                      <p className="text-label mb-2">Conversion</p>
                      <p className="text-2xl font-semibold">
                        {pressure.conversionRate}%
                      </p>
                      <p className="text-xs text-muted mt-1">YES rate</p>
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

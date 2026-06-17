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

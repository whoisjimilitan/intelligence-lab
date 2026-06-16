"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CompanyData {
  id: string;
  name: string;
  industry: string;
  postcode: string;
  email: string;
  phone: string;
  website?: string;
  pressure: string;
  buyingProbability: number;
  urgencySignal: number;
  outreachStatus: "not_sent" | "sent" | "opened" | "clicked" | "replied" | "converted";
  emailSentAt?: string;
  opens: number;
  clicks: number;
}

// Mock company data
const MOCK_COMPANY: CompanyData = {
  id: "comp-001",
  name: "Morrison's Pharmacy (M1)",
  industry: "Pharmacy",
  postcode: "M1 1AA",
  email: "manager@morrisons-pharm.co.uk",
  phone: "0161 234 5678",
  website: "www.morrisons-pharmacy.co.uk",
  pressure: "Prescription Fulfilment",
  buyingProbability: 0.78,
  urgencySignal: 0.72,
  outreachStatus: "not_sent",
  opens: 0,
  clicks: 0,
};

const RECOGNITION_EMAIL = `Subject: We noticed your prescription fulfillment delays

Hi there,

We noticed pharmacies in your area experiencing delays in prescription fulfillment.

This often leads to slower patient service and operational strain.

We help stabilise same-day delivery flow through optimized logistics and fulfillment workflows. For pharmacies like yours, this typically means:
- 40% faster turnaround times
- 95%+ on-time delivery rates
- Reduced staff overtime costs

Most pharmacies in your area are seeing this impact. Would you be open to a 15-minute call to explore how this could work for Morrison's?

Best regards,
Saint & Story Operations Team

P.S. We help 30+ pharmacies across the UK with this exact challenge.`;

export default function CompanyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("id");

  const [company, setCompany] = useState<CompanyData>(MOCK_COMPANY);
  const [outreachSent, setOutreachSent] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleSendOutreach = () => {
    setCompany({
      ...company,
      outreachStatus: "sent",
      emailSentAt: new Date().toLocaleString(),
    });
    setOutreachSent(true);
    // In a real system, this would send the email
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      not_sent: "Not Sent",
      sent: "Sent",
      opened: "Opened",
      clicked: "Clicked",
      replied: "Replied",
      converted: "Converted",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    if (status === "not_sent") return "text-gray-600";
    if (status === "sent") return "text-blue-600";
    if (status === "opened") return "text-blue-700";
    if (status === "clicked") return "text-green-600";
    if (status === "replied") return "text-green-700";
    if (status === "converted") return "text-green-800";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className="text-brand hover:text-brand-dark text-sm font-medium mb-4 transition-colors"
          >
            ← Back
          </button>
          <h1 className="font-display text-5xl leading-tight text-navy mb-4">
            {company.name}
          </h1>
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Industry
              </div>
              <p className="text-navy font-semibold">{company.industry}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Pressure
              </div>
              <p className="text-navy font-semibold">{company.pressure}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Buying Probability
              </div>
              <p className="font-display text-2xl font-semibold text-navy">
                {Math.round(company.buyingProbability * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Outreach */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-navy mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                    Email
                  </div>
                  <p className="text-navy break-all">{company.email}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                    Phone
                  </div>
                  <p className="text-navy">{company.phone}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                    Postcode
                  </div>
                  <p className="text-navy">{company.postcode}</p>
                </div>
                {company.website && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                      Website
                    </div>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:text-brand-dark"
                    >
                      {company.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Outreach Status */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-navy mb-4">
                Outreach Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                    Current Status
                  </div>
                  <p className={`font-display text-2xl font-semibold ${getStatusColor(company.outreachStatus)}`}>
                    {getStatusLabel(company.outreachStatus)}
                  </p>
                </div>

                {company.emailSentAt && (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                      Email Sent
                    </div>
                    <p className="text-navy">{company.emailSentAt}</p>
                  </div>
                )}

                {company.outreachStatus === "not_sent" && (
                  <button
                    onClick={handleSendOutreach}
                    className="w-full btn-primary mt-4"
                  >
                    Send Outreach Email
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Email & Engagement */}
          <div className="lg:col-span-2 space-y-8">
            {/* Email Template */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-lg font-semibold text-navy">
                  Recognition Email
                </h3>
                <button
                  onClick={() => setShowEmail(!showEmail)}
                  className="text-brand hover:text-brand-dark text-sm font-medium"
                >
                  {showEmail ? "Hide" : "Show"}
                </button>
              </div>

              {showEmail && (
                <div className="bg-surface rounded-lg p-6 text-sm text-navy leading-relaxed whitespace-pre-wrap">
                  {RECOGNITION_EMAIL}
                </div>
              )}
            </div>

            {/* Engagement Monitor */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold text-navy mb-6">
                Engagement Monitor
              </h3>

              {company.outreachStatus !== "not_sent" ? (
                <div className="space-y-6">
                  {/* Engagement Timeline */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">
                      Activity
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-navy font-semibold">Email Sent</p>
                          <p className="text-xs text-muted">{company.emailSentAt}</p>
                        </div>
                      </div>

                      {company.opens > 0 && (
                        <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-navy font-semibold">Email Opened</p>
                            <p className="text-xs text-muted">{company.opens} time{company.opens !== 1 ? "s" : ""}</p>
                          </div>
                        </div>
                      )}

                      {company.clicks > 0 && (
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-navy font-semibold">Link Clicked</p>
                            <p className="text-xs text-muted">{company.clicks} click{company.clicks !== 1 ? "s" : ""}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                          Opens
                        </div>
                        <p className="font-display text-2xl font-semibold text-navy">
                          {company.opens}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                          Clicks
                        </div>
                        <p className="font-display text-2xl font-semibold text-navy">
                          {company.clicks}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                          CTR
                        </div>
                        <p className="font-display text-2xl font-semibold text-navy">
                          {company.opens > 0
                            ? Math.round((company.clicks / company.opens) * 100)
                            : 0}
                          %
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="border-t border-gray-100 pt-6 bg-surface rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                      Suggested Next Steps
                    </div>
                    <ul className="text-sm text-navy space-y-2">
                      {company.opens === 0 && <li>→ Follow up in 48 hours if not opened</li>}
                      {company.opens > 0 && company.clicks === 0 && <li>→ Call to discuss if no click within 72 hours</li>}
                      {company.clicks > 0 && company.outreachStatus !== "replied" && <li>→ Schedule call to discuss solution</li>}
                      {company.outreachStatus === "replied" && <li>→ Move to proposal stage</li>}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted">Send outreach email to begin tracking engagement</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

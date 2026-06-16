"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmailRecord, sendEmail, recordEmailOpen, recordEmailClick, recordEmailReply } from "@/lib/emailTracking";

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

  const [company, setCompany] = useState<CompanyData>(MOCK_COMPANY);
  const [showEmail, setShowEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailRecord = getEmailRecord(MOCK_COMPANY.id);
    if (emailRecord) {
      setCompany((prev) => ({
        ...prev,
        outreachStatus: emailRecord.status as any,
        emailSentAt: emailRecord.sentAt,
        opens: emailRecord.openCount,
        clicks: emailRecord.clickCount,
      }));
    }
  }, []);

  const handleSendOutreach = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      sendEmail(
        MOCK_COMPANY.id,
        MOCK_COMPANY.name,
        MOCK_COMPANY.email,
        MOCK_COMPANY.pressure
      );

      setCompany((prev) => ({
        ...prev,
        outreachStatus: "sent",
        emailSentAt: new Date().toLocaleString(),
        opens: 0,
        clicks: 0,
      }));

      setTimeout(() => {
        recordEmailOpen(MOCK_COMPANY.id);
        setCompany((prev) => ({
          ...prev,
          outreachStatus: "opened",
          opens: 1,
        }));
      }, 2000);

      setTimeout(() => {
        recordEmailClick(MOCK_COMPANY.id);
        setCompany((prev) => ({
          ...prev,
          outreachStatus: "clicked",
          clicks: 1,
        }));
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordReply = () => {
    const emailRecord = recordEmailReply(MOCK_COMPANY.id);
    if (emailRecord) {
      setCompany((prev) => ({
        ...prev,
        outreachStatus: "replied",
      }));
    }
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="btn-ghost mb-12"
        >
          ← Back
        </button>

        {/* OPERATOR QUESTION: Should I contact this business? */}
        <div className="mb-16 pb-16 border-b border-subtle">
          <h1 className="mb-4">{company.name}</h1>
          <p className="text-base text-muted mb-8">{company.industry} • {company.postcode}</p>

          {/* WHY (The Reasoning) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="mb-2">Operational Pressure</h5>
              <p className="text-base font-semibold">{company.pressure}</p>
            </div>
            <div>
              <h5 className="mb-2">Engagement Probability</h5>
              <p className="text-3xl font-semibold" style={{ color: 'var(--color-brand)' }}>
                {Math.round(company.buyingProbability * 100)}%
              </p>
              <p className="text-sm text-muted mt-2">Based on pressure signals</p>
            </div>
            <div>
              <h5 className="mb-2">Contact Status</h5>
              <p className="text-base font-semibold capitalize">{getStatusLabel(company.outreachStatus)}</p>
              {company.emailSentAt && (
                <p className="text-sm text-muted mt-2">{company.emailSentAt}</p>
              )}
            </div>
          </div>
        </div>

        {/* THE MESSAGE (What will they see?) */}
        <div className="mb-16 pb-16 border-b border-subtle">
          <h3 className="mb-6">Message</h3>
          <div className="bg-surface rounded-lg p-8">
            <div className="bg-white rounded-lg p-6 border border-subtle">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-navy">
                {RECOGNITION_EMAIL.split('\n\n')[0]}
              </p>
              <p className="text-sm leading-relaxed mt-6 whitespace-pre-wrap text-navy">
                {RECOGNITION_EMAIL.split('\n\n').slice(1, -1).join('\n\n')}
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT DETAILS (Secondary Info) */}
        <div className="mb-16 pb-16 border-b border-subtle">
          <h5 className="mb-4">Contact Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-label mb-2">Email</p>
              <p className="text-base text-navy">{company.email}</p>
            </div>
            <div>
              <p className="text-label mb-2">Phone</p>
              <p className="text-base text-navy">{company.phone}</p>
            </div>
            {company.website && (
              <div>
                <p className="text-label mb-2">Website</p>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-blue-700 text-base"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ENGAGEMENT (If sent) */}
        {company.outreachStatus !== "not_sent" && (
          <div className="mb-16 pb-16 border-b border-subtle">
            <h3 className="mb-6">Engagement</h3>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-label mb-2">Opens</p>
                <p className="text-3xl font-semibold">{company.opens}</p>
              </div>
              <div>
                <p className="text-label mb-2">Clicks</p>
                <p className="text-3xl font-semibold">{company.clicks}</p>
              </div>
              <div>
                <p className="text-label mb-2">Click Rate</p>
                <p className="text-3xl font-semibold">
                  {company.opens > 0
                    ? Math.round((company.clicks / company.opens) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ACTION (Single Clear Decision) */}
        <div>
          {company.outreachStatus === "not_sent" && (
            <button
              onClick={handleSendOutreach}
              disabled={isLoading}
              className="btn-primary py-4 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Email to " + company.name.split(' ')[0]}
            </button>
          )}

          {company.outreachStatus !== "not_sent" && company.outreachStatus !== "replied" && (
            <button
              onClick={handleRecordReply}
              className="btn-secondary py-4 px-8 text-lg font-semibold"
            >
              Mark as Replied
            </button>
          )}

          {company.outreachStatus === "replied" && (
            <div className="text-center py-8 bg-surface rounded-lg">
              <p className="text-base font-semibold text-navy">Prospect replied. Next: Schedule call.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

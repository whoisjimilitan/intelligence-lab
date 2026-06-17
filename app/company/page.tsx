"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  sendEmail,
  recordEmailOpen,
  recordEmailClick,
  recordEmailReply,
} from "@/lib/email-tracking";
import { orchestrateMarketAnalysis } from "@/lib/opportunityOrchestrator";

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
  outreachStatus:
    | "not_sent"
    | "sent"
    | "opened"
    | "clicked"
    | "replied"
    | "converted";
  emailSentAt?: string;
  opens: number;
  clicks: number;
}

const RECOGNITION_EMAIL = `I need you to answer this honestly:

Some pharmacies in Manchester say prescription orders arrive during 10am rush with tight delivery windows, and courier gaps create customer panic.

You're probably calling asking 'can you get this there by noon?' and scrambling to find coverage.

Some days you solve it. Some days they go to competitors.

Sound like your morning?

[YES] [NO]`;

export default function CompanyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyName = searchParams.get("name") || "Unknown Business";

  const [company, setCompany] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Initialize with sample company data based on name
    const sampleCompany: CompanyData = {
      id: `comp-${Date.now()}`,
      name: companyName,
      industry: "Pharmacy",
      postcode: "M1 1AA",
      email: `manager@${companyName.toLowerCase().replace(/\s/g, "")}.co.uk`,
      phone: "0161 234 5678",
      website: `www.${companyName.toLowerCase().replace(/\s/g, "")}.co.uk`,
      pressure: "Time-Critical Movement",
      buyingProbability: 0.78,
      urgencySignal: 0.72,
      outreachStatus: "not_sent",
      opens: 0,
      clicks: 0,
    };
    setCompany(sampleCompany);
  }, [companyName]);

  const handleSendOutreach = async () => {
    if (!company) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      sendEmail(company.id, company.name, company.email, company.pressure);

      setCompany((prev) =>
        prev
          ? {
              ...prev,
              outreachStatus: "sent",
              emailSentAt: new Date().toLocaleString(),
            }
          : null
      );

      setEmailSent(true);

      // Simulate engagement
      setTimeout(() => {
        recordEmailOpen(company.id);
        setCompany((prev) =>
          prev
            ? {
                ...prev,
                outreachStatus: "opened",
                opens: 1,
              }
            : null
        );
      }, 2000);

      setTimeout(() => {
        recordEmailClick(company.id);
        setCompany((prev) =>
          prev
            ? {
                ...prev,
                outreachStatus: "clicked",
                clicks: 1,
              }
            : null
        );
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordReply = () => {
    if (!company) return;
    recordEmailReply(company.id);
    setCompany((prev) =>
      prev
        ? {
            ...prev,
            outreachStatus: "replied",
          }
        : null
    );
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-spacing">
        {/* Back Button */}
        <button onClick={() => router.back()} className="btn-ghost mb-16">
          ← Back
        </button>

        {/* Company Header */}
        <div className="mb-20 pb-16 border-b border-subtle">
          <h1>{company.name}</h1>
          <p className="text-base text-muted mt-4">
            {company.industry} • {company.postcode}
          </p>

          {/* Decision Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
            <div>
              <h5 className="mb-4">Detected Pressure</h5>
              <p className="text-lg font-semibold">{company.pressure}</p>
            </div>
            <div>
              <h5 className="mb-4">Fit Score</h5>
              <p
                className="text-4xl font-bold"
                style={{ color: "var(--color-brand)" }}
              >
                {Math.round(company.buyingProbability * 100)}%
              </p>
            </div>
            <div>
              <h5 className="mb-4">Status</h5>
              <p className="text-lg font-semibold capitalize">
                {company.outreachStatus === "not_sent" ? "Ready" : company.outreachStatus}
              </p>
              {company.emailSentAt && (
                <p className="text-sm text-muted mt-2">{company.emailSentAt}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="mb-20 pb-16 border-b border-subtle">
          <h5 className="mb-8">Email to Send</h5>
          <div className="bg-white border border-subtle rounded-lg p-12">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-navy font-medium">
              {RECOGNITION_EMAIL}
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-20 pb-16 border-b border-subtle">
          <h5 className="mb-8">Contact</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <p className="text-label mb-2">Email</p>
              <p className="text-base">{company.email}</p>
            </div>
            <div>
              <p className="text-label mb-2">Phone</p>
              <p className="text-base">{company.phone}</p>
            </div>
            {company.website && (
              <div>
                <p className="text-label mb-2">Website</p>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-brand hover:text-blue-700"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Engagement (if sent) */}
        {company.outreachStatus !== "not_sent" && (
          <div className="mb-20 pb-16 border-b border-subtle">
            <h5 className="mb-8">Engagement</h5>
            <div className="grid grid-cols-3 gap-12">
              <div>
                <p className="text-label mb-2">Opens</p>
                <p className="text-3xl font-bold">{company.opens}</p>
              </div>
              <div>
                <p className="text-label mb-2">Clicks</p>
                <p className="text-3xl font-bold">{company.clicks}</p>
              </div>
              <div>
                <p className="text-label mb-2">Click Rate</p>
                <p className="text-3xl font-bold">
                  {company.opens > 0
                    ? Math.round((company.clicks / company.opens) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action */}
        <div>
          {company.outreachStatus === "not_sent" && (
            <button
              onClick={handleSendOutreach}
              disabled={isLoading}
              className="btn-primary py-4 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : `Send Email to ${company.name.split(" ")[0]}`}
            </button>
          )}

          {company.outreachStatus !== "not_sent" &&
            company.outreachStatus !== "replied" && (
              <button
                onClick={handleRecordReply}
                className="btn-secondary py-4 px-8 text-lg font-semibold"
              >
                Mark as Replied
              </button>
            )}

          {company.outreachStatus === "replied" && (
            <div className="text-center py-8 bg-white border border-subtle rounded-lg">
              <p className="text-base font-semibold">
                Prospect replied. Next: Schedule call.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

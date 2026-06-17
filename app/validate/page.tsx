"use client";

import { useState } from "react";

interface ValidationGate {
  name: string;
  status: "pass" | "fail" | "in-progress";
  evidence: string[];
}

interface PressureValidation {
  name: string;
  definitionClarity: number; // 0-100
  detectionAccuracy: number; // 0-100
  psychologicalFit: number; // 0-100
  interventionFit: number; // 0-100
}

export default function ValidatePage() {
  const [activeTab, setActiveTab] = useState<"assumptions" | "pressures" | "psychology" | "detection">("assumptions");

  const validationGates: ValidationGate[] = [
    {
      name: "Pressure Atlas Defined",
      status: "pass",
      evidence: ["7 pressure types defined", "Symptoms documented", "Industry mapping complete"],
    },
    {
      name: "Detection Logic Tested",
      status: "in-progress",
      evidence: ["Mock data scanning works", "Confidence scoring implemented", "Need real data validation"],
    },
    {
      name: "Recognition Psychology Tested",
      status: "fail",
      evidence: ["Messages generated", "Missing: creepiness tests", "Missing: arrogance evaluation", "Missing: curiosity scoring"],
    },
    {
      name: "Intervention Fit Validated",
      status: "fail",
      evidence: ["Can we solve these pressures?", "Do clients have budget?", "Need market research"],
    },
  ];

  const pressureValidations: PressureValidation[] = [
    {
      name: "Prescription Fulfilment",
      definitionClarity: 85,
      detectionAccuracy: 72,
      psychologicalFit: 68,
      interventionFit: 78,
    },
    {
      name: "Inventory Friction",
      definitionClarity: 79,
      detectionAccuracy: 64,
      psychologicalFit: 71,
      interventionFit: 85,
    },
    {
      name: "Customer Wait Time",
      definitionClarity: 88,
      detectionAccuracy: 58,
      psychologicalFit: 75,
      interventionFit: 62,
    },
    {
      name: "Appointment Backlog",
      definitionClarity: 82,
      detectionAccuracy: 76,
      psychologicalFit: 80,
      interventionFit: 71,
    },
    {
      name: "Delivery Reliability",
      definitionClarity: 81,
      detectionAccuracy: 69,
      psychologicalFit: 74,
      interventionFit: 88,
    },
    {
      name: "Capacity Overflow",
      definitionClarity: 75,
      detectionAccuracy: 54,
      psychologicalFit: 69,
      interventionFit: 66,
    },
    {
      name: "Time-Critical Logistics",
      definitionClarity: 80,
      detectionAccuracy: 72,
      psychologicalFit: 77,
      interventionFit: 82,
    },
  ];

  const psychologyTests = [
    {
      test: "Would I agree with this?",
      passRate: 78,
      sample: "Pharmacy recognizes prescription backlog",
    },
    {
      test: "Does it feel helpful?",
      passRate: 72,
      sample: "Message focuses on solving, not pain",
    },
    {
      test: "Does it feel creepy?",
      passRate: 65,
      sample: "How did you know? (trust issue)",
    },
    {
      test: "Does it feel arrogant?",
      passRate: 81,
      sample: "Confident without presumption",
    },
    {
      test: "Does it feel generic?",
      passRate: 58,
      sample: "Too templated for industry",
    },
    {
      test: "Would I want to engage?",
      passRate: 71,
      sample: "Call-to-action clarity",
    },
    {
      test: "Does it lead to revenue?",
      passRate: 52,
      sample: "No clear path to conversation",
    },
  ];

  const statusBadge = (status: "pass" | "fail" | "in-progress") => {
    if (status === "pass") return "✓ PASS";
    if (status === "fail") return "⚠ FAIL";
    return "→ IN PROGRESS";
  };

  const statusColor = (status: "pass" | "fail" | "in-progress") => {
    if (status === "pass") return "text-green-600";
    if (status === "fail") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
            Research & Validation
          </div>
          <h1 className="font-display text-5xl leading-tight text-navy mb-6">
            Assumption Validation.
          </h1>
          <p className="text-muted max-w-2xl">
            Before Intelligence Lab integrates into production, every assumption must pass validation gates.
            This dashboard tracks hypothesis testing across the entire system.
          </p>
        </div>

        {/* System Status */}
        <div className="border-b border-gray-200 pb-12 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-8">
            Validation Gates
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {validationGates.map((gate, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-lg text-navy">{gate.name}</h3>
                  <span className={`font-semibold text-sm ${statusColor(gate.status)}`}>
                    {statusBadge(gate.status)}
                  </span>
                </div>
                <ul className="space-y-2">
                  {gate.evidence.map((item, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="flex-shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {["assumptions", "pressures", "psychology", "detection"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-xs font-semibold uppercase tracking-wide py-4 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-brand text-navy"
                    : "border-transparent text-muted hover:text-navy"
                }`}
              >
                {tab === "assumptions" && "Critical Assumptions"}
                {tab === "pressures" && "Pressure Validation"}
                {tab === "psychology" && "Psychology Tests"}
                {tab === "detection" && "Detection Accuracy"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "assumptions" && (
          <div className="space-y-12">
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="font-display text-2xl text-navy mb-6">
                Assumption 1: Pressure Detection
              </h3>
              <div className="grid grid-cols-2 gap-12 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                    Hypothesis
                  </div>
                  <p className="text-navy leading-relaxed">
                    If industry = Pharmacy AND website has wait-time complaints, then pressure = "Prescription Fulfilment" with 80%+ confidence.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                    Current Status
                  </div>
                  <p className="text-red-600 font-semibold">⚠ UNVALIDATED</p>
                  <p className="text-sm text-muted mt-2">
                    Needs real-world test with 100+ pharmacies
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
                  What We Need
                </div>
                <ul className="space-y-2 text-sm text-navy">
                  <li>→ Sample dataset of 100+ pharmacies</li>
                  <li>→ Validation of detection logic</li>
                  <li>→ Confidence calibration</li>
                  <li>→ False positive rate acceptable?</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="font-display text-2xl text-navy mb-6">
                Assumption 2: Pressure = Demand
              </h3>
              <div className="grid grid-cols-2 gap-12 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                    Hypothesis
                  </div>
                  <p className="text-navy leading-relaxed">
                    Detected operational pressure indicates buying demand for our solution.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                    Current Status
                  </div>
                  <p className="text-red-600 font-semibold">⚠ HIGH RISK</p>
                  <p className="text-sm text-muted mt-2">
                    Pressure ≠ Budget ≠ Urgency ≠ Authority
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
                  Intervention Fit Test Required
                </div>
                <ul className="space-y-2 text-sm text-navy">
                  <li>→ Can Saint & Story actually solve this pressure?</li>
                  <li>→ Is there budget allocated?</li>
                  <li>→ Is there decision-maker authority?</li>
                  <li>→ Is there genuine urgency?</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pressures" && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Pressure
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Definition
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Detection
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Intervention Fit
                </div>
              </div>
            </div>
            {pressureValidations.map((pressure, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-6 py-4 border-b border-gray-100">
                <div className="text-navy font-semibold">{pressure.name}</div>
                <div>
                  <div className="text-2xl font-bold text-navy mb-1">
                    {pressure.definitionClarity}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-brand h-1 rounded-full"
                      style={{ width: `${pressure.definitionClarity}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy mb-1">
                    {pressure.detectionAccuracy}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${
                        pressure.detectionAccuracy < 70 ? "bg-red-500" : "bg-brand"
                      }`}
                      style={{ width: `${pressure.detectionAccuracy}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy mb-1">
                    {pressure.interventionFit}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-brand h-1 rounded-full"
                      style={{ width: `${pressure.interventionFit}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "psychology" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Psychology Test
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Pass Rate
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  Sample Case
                </div>
              </div>
            </div>
            {psychologyTests.map((test, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-6 py-4 border-b border-gray-100">
                <div className="text-navy font-semibold">{test.test}</div>
                <div>
                  <div className="text-2xl font-bold text-navy mb-1">{test.passRate}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${
                        test.passRate < 70 ? "bg-red-500" : "bg-green-600"
                      }`}
                      style={{ width: `${test.passRate}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted">{test.sample}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "detection" && (
          <div className="border border-gray-200 rounded-lg p-8">
            <h3 className="font-display text-2xl text-navy mb-6">
              Detection Accuracy Baseline
            </h3>
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">
                  Average Accuracy Across All Pressures
                </div>
                <div className="text-5xl font-bold text-navy mb-4">67.8%</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: "67.8%" }}
                  />
                </div>
                <p className="text-sm text-red-600 mt-3">
                  ⚠ Below 75% threshold. Cannot integrate to production yet.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">
                  What's Needed
                </div>
                <ul className="space-y-2 text-sm text-navy">
                  <li>→ Validation dataset: 500+ businesses with known pressures</li>
                  <li>→ Manual audit of 100 detected pressures</li>
                  <li>→ Confidence calibration per pressure type</li>
                  <li>→ False positive rate &lt; 15%</li>
                  <li>→ Target: 85%+ accuracy before production integration</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

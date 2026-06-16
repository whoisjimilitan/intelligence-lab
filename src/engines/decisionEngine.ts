import { DecisionEngineOutput } from "@/modules/types";

interface DecisionEngineInput {
  pressureName: string;
  buyingProbability: number;
  businessCount: number;
  marketSimilarity: number;
  urgency: number;
}

const KNOWN_CONVERSION_CLUSTERS = [
  "Prescription Fulfilment",
  "Delivery Reliability Pressure",
  "Appointment Backlog",
];

const ENGAGEMENT_RATE_BY_PRESSURE: Record<string, number> = {
  "Prescription Fulfilment": 0.52,
  "Inventory Friction": 0.38,
  "Customer Wait Time": 0.41,
  "Appointment Backlog": 0.49,
  "Delivery Reliability Pressure": 0.48,
  "Capacity Overflow": 0.35,
  "Time-Critical Logistics Pressure": 0.44,
};

const CONVERSION_RATE_BY_PRESSURE: Record<string, number> = {
  "Prescription Fulfilment": 0.22,
  "Inventory Friction": 0.12,
  "Customer Wait Time": 0.14,
  "Appointment Backlog": 0.18,
  "Delivery Reliability Pressure": 0.20,
  "Capacity Overflow": 0.10,
  "Time-Critical Logistics Pressure": 0.24,
};

export function makeDecision(
  input: DecisionEngineInput
): DecisionEngineOutput {
  const reasoning: string[] = [];
  let decisionScore = 0;

  // Check if this is a known conversion cluster
  const isKnownConversion = KNOWN_CONVERSION_CLUSTERS.includes(
    input.pressureName
  );
  if (isKnownConversion) {
    reasoning.push("Matches known conversion cluster");
    decisionScore += 0.4;
  }

  // Check buying probability
  if (input.buyingProbability > 0.65) {
    reasoning.push("High buying probability detected");
    decisionScore += 0.3;
  } else if (input.buyingProbability > 0.45) {
    reasoning.push("Moderate buying probability");
    decisionScore += 0.15;
  }

  // Check market size
  if (input.businessCount > 20) {
    reasoning.push("Sufficient market size for opportunity");
    decisionScore += 0.15;
  }

  // Check market similarity
  if (input.marketSimilarity > 0.6) {
    reasoning.push("Strong market similarity to existing data");
    decisionScore += 0.1;
  }

  // Check urgency
  if (input.urgency > 0.7) {
    reasoning.push("High urgency signal detected");
    decisionScore += 0.05;
  }

  // Determine decision based on score
  let decision: "ACT" | "WATCH" | "IGNORE";

  if (decisionScore >= 0.7) {
    decision = "ACT";
  } else if (decisionScore >= 0.4) {
    decision = "WATCH";
  } else {
    decision = "IGNORE";
  }

  const engagementRate =
    ENGAGEMENT_RATE_BY_PRESSURE[input.pressureName] || 0.4;
  const conversionRate =
    CONVERSION_RATE_BY_PRESSURE[input.pressureName] || 0.15;

  return {
    decision,
    reasoning,
    expectedOutcome: {
      engagementRate: Math.round(engagementRate * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
    },
  };
}

import { StressTestResult } from "@/modules/types";

interface StressTestInput {
  pressureName: string;
  buyingProbability: number;
  recognitionFit: number; // 0-10 psychological fit from recognition simulator
  commercialFit: number; // 0-10 commercial fit
  logisticsFit: number; // 0-10 logistics fit
}

const PRESSURE_RISK_BASELINE: Record<string, "low" | "medium" | "high"> = {
  "Prescription Fulfilment": "low",
  "Inventory Friction": "low",
  "Customer Wait Time": "low",
  "Appointment Backlog": "low",
  "Delivery Reliability Pressure": "low",
  "Capacity Overflow": "medium",
  "Time-Critical Logistics Pressure": "medium",
};

export function runStressTest(input: StressTestInput): StressTestResult {
  const notes: string[] = [];
  let riskScore = 0;

  // Psychological assessment
  const psychologicalScore = assessPsychological(input.recognitionFit);
  const psychological = {
    helpfulVsCreepy: psychologicalScore.helpfulVsCreepy,
    clarity: psychologicalScore.clarity,
    trust: psychologicalScore.trust,
  };

  // Commercial assessment
  const commercialScore = assessCommercial(
    input.buyingProbability,
    input.commercialFit
  );
  const commercial = {
    urgency: commercialScore.urgency,
    budgetLikelihood: commercialScore.budgetLikelihood,
    decisionAccessibility: commercialScore.decisionAccessibility,
  };

  // Behavioral assessment
  const behavioralScore = assessBehavioral(
    input.buyingProbability,
    input.logisticsFit
  );
  const behavioural = {
    likelihoodOfActionIn7Days: behavioralScore.likelihoodOfActionIn7Days,
  };

  // Calculate overall risk
  const baselineRisk = PRESSURE_RISK_BASELINE[input.pressureName] || "medium";
  riskScore = baselineRisk === "low" ? 0.3 : baselineRisk === "medium" ? 0.6 : 0.9;

  // Adjust based on fit scores
  const avgFit = (input.recognitionFit + input.commercialFit + input.logisticsFit) / 3;
  if (avgFit > 8) {
    riskScore -= 0.2;
    notes.push("High fit across all dimensions — low risk");
  } else if (avgFit < 6) {
    riskScore += 0.2;
    notes.push("Lower fit scores — moderate risk");
  }

  // Check for creepiness
  if (psychological.helpfulVsCreepy > 7) {
    notes.push("Clearly helpful positioning — builds trust");
  } else if (psychological.helpfulVsCreepy < 4) {
    riskScore += 0.25;
    notes.push("Risk of perceived intrusion — requires careful messaging");
  }

  // Check commercial viability
  if (commercial.budgetLikelihood > 0.7) {
    notes.push("High budget likelihood");
  }

  // Check decision accessibility
  if (commercial.decisionAccessibility > 0.7) {
    notes.push("Decision can be made quickly");
  } else {
    notes.push("Long sales cycle expected");
  }

  // Determine final risk level
  let finalRiskLevel: "low" | "medium" | "high";
  if (riskScore < 0.4) {
    finalRiskLevel = "low";
  } else if (riskScore < 0.7) {
    finalRiskLevel = "medium";
  } else {
    finalRiskLevel = "high";
  }

  const safeToSurface = finalRiskLevel !== "high" && input.buyingProbability > 0.4;

  return {
    safeToSurface,
    riskLevel: finalRiskLevel,
    notes,
    psychological,
    commercial,
    behavioural,
  };
}

function assessPsychological(recognitionFit: number): {
  helpfulVsCreepy: number;
  clarity: number;
  trust: number;
} {
  // Higher recognition fit = more helpful, less creepy
  const helpfulVsCreepy = Math.min(9, Math.max(2, recognitionFit + 1));

  // Clarity improves with recognition fit
  const clarity = Math.min(9, recognitionFit * 0.9 + 1);

  // Trust improves with clarity and helpful positioning
  const trust = Math.min(9, (helpfulVsCreepy + clarity) / 2.5);

  return { helpfulVsCreepy, clarity, trust };
}

function assessCommercial(
  buyingProbability: number,
  commercialFit: number
): {
  urgency: number;
  budgetLikelihood: number;
  decisionAccessibility: number;
} {
  // Urgency is tied to buying probability and commercial fit
  const urgency = buyingProbability * 0.8 + commercialFit / 10 * 0.2;

  // Budget likelihood based on buying probability
  const budgetLikelihood = Math.min(
    1,
    buyingProbability * 1.2
  );

  // Decision accessibility (can they decide quickly?)
  const decisionAccessibility = Math.min(
    1,
    commercialFit / 10 * 0.8 + 0.2
  );

  return { urgency, budgetLikelihood, decisionAccessibility };
}

function assessBehavioral(
  buyingProbability: number,
  logisticsFit: number
): {
  likelihoodOfActionIn7Days: number;
} {
  // Likelihood of action increases with buying probability and logistics fit
  const likelihoodOfActionIn7Days =
    buyingProbability * 0.6 + logisticsFit / 10 * 0.4;

  return { likelihoodOfActionIn7Days };
}

import { BuyingProbability } from "@/modules/types";

interface BuyingProbabilityInput {
  pressureIntensity: number; // 0-1
  urgency: number; // 0-1
  logisticsFit: number; // 0-1
  marketSimilarity: number; // 0-1
}

export function computeBuyingProbability(
  input: BuyingProbabilityInput
): BuyingProbability {
  const probability =
    input.pressureIntensity *
    input.urgency *
    input.logisticsFit *
    input.marketSimilarity;

  const clampedProbability = Math.min(1, Math.max(0, probability));

  const explanationFactors: string[] = [];

  if (input.pressureIntensity > 0.7) {
    explanationFactors.push("High pressure intensity detected");
  } else if (input.pressureIntensity > 0.4) {
    explanationFactors.push("Moderate pressure intensity");
  }

  if (input.urgency > 0.7) {
    explanationFactors.push("High urgency signal");
  } else if (input.urgency > 0.4) {
    explanationFactors.push("Moderate urgency");
  }

  if (input.logisticsFit > 0.7) {
    explanationFactors.push("Strong logistics fit");
  } else if (input.logisticsFit > 0.4) {
    explanationFactors.push("Reasonable logistics alignment");
  }

  if (input.marketSimilarity > 0.7) {
    explanationFactors.push("Similar to converted clusters");
  } else if (input.marketSimilarity > 0.4) {
    explanationFactors.push("Moderate market similarity");
  }

  return {
    probability: clampedProbability,
    pressureIntensity: input.pressureIntensity,
    urgency: input.urgency,
    logisticsFit: input.logisticsFit,
    marketSimilarity: input.marketSimilarity,
    explanationFactors,
  };
}

export function estimateProbabilityForCluster(
  businessCount: number,
  pressureType: string
): number {
  // Heuristic: larger clusters have lower individual probability but higher total opportunity
  const sizeAdjustment = Math.max(
    0.3,
    1 - Math.log(businessCount + 1) / 10
  );

  // Base probability by pressure type
  const pressureBaseProbability: Record<string, number> = {
    "Prescription Fulfilment": 0.72,
    "Inventory Friction": 0.65,
    "Customer Wait Time": 0.58,
    "Appointment Backlog": 0.68,
    "Delivery Reliability Pressure": 0.71,
    "Capacity Overflow": 0.64,
    "Time-Critical Logistics Pressure": 0.76,
  };

  const baseProbability = pressureBaseProbability[pressureType] || 0.6;
  return Math.min(1, baseProbability * sizeAdjustment);
}

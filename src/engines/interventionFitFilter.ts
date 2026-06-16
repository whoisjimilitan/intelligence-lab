// INTERVENTION FIT FILTER
// Determines if Saint & Story can actually solve this pressure
// This is the safeguard against false positives

interface InterventionFitInput {
  pressureName: string;
  buyingProbability: number; // 0-1
  urgencySignal: number; // 0-1
}

interface InterventionFitResult {
  canLogisticsSolve: boolean; // Core question: can we fix it?
  hasUrgency: boolean; // Is there urgency?
  repeatablePattern: boolean; // Is there a service pattern we can repeat?
  recurringRevenuePotential: boolean; // Can this become recurring?
  shouldSurface: boolean; // All tests pass?
  suppresionReason?: string; // Why suppressed if false
}

// Map of pressures to intervention fitness
const INTERVENTION_FIT: Record<
  string,
  {
    canSolve: boolean;
    servicePattern: string;
    recurringRevenue: boolean;
    minUrgency: number;
  }
> = {
  "Prescription Fulfilment": {
    canSolve: true,
    servicePattern: "Same-day delivery optimization, fulfillment logistics",
    recurringRevenue: true,
    minUrgency: 0.5,
  },
  "Inventory Friction": {
    canSolve: true,
    servicePattern: "Inventory optimization, distribution logistics",
    recurringRevenue: true,
    minUrgency: 0.4,
  },
  "Customer Wait Time": {
    canSolve: false, // This is operational, not logistics
    servicePattern: "Not applicable",
    recurringRevenue: false,
    minUrgency: 0.6,
  },
  "Appointment Backlog": {
    canSolve: false, // This is scheduling, not logistics
    servicePattern: "Not applicable",
    recurringRevenue: false,
    minUrgency: 0.6,
  },
  "Delivery Reliability Pressure": {
    canSolve: true,
    servicePattern: "Delivery optimization, route planning",
    recurringRevenue: true,
    minUrgency: 0.5,
  },
  "Capacity Overflow": {
    canSolve: true,
    servicePattern: "Capacity planning, logistics scaling",
    recurringRevenue: true,
    minUrgency: 0.6,
  },
  "Time-Critical Logistics Pressure": {
    canSolve: true,
    servicePattern: "Cold chain logistics, time-critical delivery",
    recurringRevenue: true,
    minUrgency: 0.7,
  },
};

export function evaluateInterventionFit(
  input: InterventionFitInput
): InterventionFitResult {
  const fitData = INTERVENTION_FIT[input.pressureName];

  if (!fitData) {
    return {
      canLogisticsSolve: false,
      hasUrgency: false,
      repeatablePattern: false,
      recurringRevenuePotential: false,
      shouldSurface: false,
      suppresionReason: "Unknown pressure type",
    };
  }

  const canSolve = fitData.canSolve;
  const hasUrgency = input.urgencySignal >= fitData.minUrgency;
  const hasPattern = fitData.servicePattern !== "Not applicable";
  const hasRecurring = fitData.recurringRevenue;

  // ALL must pass
  const shouldSurface = canSolve && hasUrgency && hasPattern && hasRecurring;

  let suppresionReason: string | undefined;
  if (!canSolve) {
    suppresionReason = "Logistics cannot meaningfully solve this pressure";
  } else if (!hasUrgency) {
    suppresionReason = "Insufficient urgency signal";
  } else if (!hasPattern) {
    suppresionReason = "No repeatable service pattern";
  } else if (!hasRecurring) {
    suppresionReason = "No recurring revenue potential";
  }

  return {
    canLogisticsSolve: canSolve,
    hasUrgency,
    repeatablePattern: hasPattern,
    recurringRevenuePotential: hasRecurring,
    shouldSurface,
    suppresionReason: shouldSurface ? undefined : suppresionReason,
  };
}

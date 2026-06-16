// OUTCOME MEMORY
// Tracks: Pressure Type → Engagement → Conversion
// This is your learning moat — what actually works

export interface OutcomeMetrics {
  pressureType: string;
  engagementRate: number; // % who opened/engaged with recognition
  conversationRate: number; // % who responded positively
  conversionRate: number; // % who became customers
  avgMonthlyRevenue: number; // £
  sampleSize: number; // How many data points
  lastUpdated: string; // ISO timestamp
}

// Mock outcome data based on simulated results
export const OUTCOME_MEMORY: Record<string, OutcomeMetrics> = {
  "Prescription Fulfilment": {
    pressureType: "Prescription Fulfilment",
    engagementRate: 0.42,
    conversationRate: 0.28,
    conversionRate: 0.17,
    avgMonthlyRevenue: 1400,
    sampleSize: 9,
    lastUpdated: "2026-06-16",
  },
  "Inventory Friction": {
    pressureType: "Inventory Friction",
    engagementRate: 0.38,
    conversationRate: 0.22,
    conversionRate: 0.12,
    avgMonthlyRevenue: 1100,
    sampleSize: 6,
    lastUpdated: "2026-06-16",
  },
  "Customer Wait Time": {
    pressureType: "Customer Wait Time",
    engagementRate: 0.35,
    conversationRate: 0.18,
    conversionRate: 0.08,
    avgMonthlyRevenue: 800,
    sampleSize: 3,
    lastUpdated: "2026-06-16",
  },
  "Appointment Backlog": {
    pressureType: "Appointment Backlog",
    engagementRate: 0.41,
    conversationRate: 0.26,
    conversionRate: 0.15,
    avgMonthlyRevenue: 1200,
    sampleSize: 5,
    lastUpdated: "2026-06-16",
  },
  "Delivery Reliability Pressure": {
    pressureType: "Delivery Reliability Pressure",
    engagementRate: 0.44,
    conversationRate: 0.30,
    conversionRate: 0.18,
    avgMonthlyRevenue: 1500,
    sampleSize: 8,
    lastUpdated: "2026-06-16",
  },
  "Capacity Overflow": {
    pressureType: "Capacity Overflow",
    engagementRate: 0.33,
    conversationRate: 0.19,
    conversionRate: 0.10,
    avgMonthlyRevenue: 950,
    sampleSize: 4,
    lastUpdated: "2026-06-16",
  },
  "Time-Critical Logistics Pressure": {
    pressureType: "Time-Critical Logistics Pressure",
    engagementRate: 0.46,
    conversationRate: 0.32,
    conversionRate: 0.20,
    avgMonthlyRevenue: 1600,
    sampleSize: 7,
    lastUpdated: "2026-06-16",
  },
};

export function getOutcomeMetrics(pressureType: string): OutcomeMetrics | null {
  return OUTCOME_MEMORY[pressureType] || null;
}

export function predictedMonthlyValue(
  pressureType: string,
  businessCount: number,
  conversionLikelihood: number
): number {
  const metrics = getOutcomeMetrics(pressureType);
  if (!metrics) return 0;

  // Expected conversions × average revenue per conversion
  const expectedConversions = businessCount * conversionLikelihood * metrics.conversionRate;
  return expectedConversions * metrics.avgMonthlyRevenue;
}

export function getWhyThisMatters(pressureType: string): string[] {
  const metrics = getOutcomeMetrics(pressureType);
  if (!metrics) return [];

  const reasons: string[] = [];

  // Pattern matching insight
  if (metrics.sampleSize >= 5) {
    reasons.push(
      `Matches known pattern from ${metrics.sampleSize} converted businesses`
    );
  } else if (metrics.sampleSize > 0) {
    reasons.push(`Early pattern: seen in ${metrics.sampleSize} businesses`);
  }

  // Conversion signal
  if (metrics.conversionRate > 0.15) {
    reasons.push("Strong conversion track record (>15%)");
  } else if (metrics.conversionRate > 0.1) {
    reasons.push("Moderate conversion track record (>10%)");
  }

  // Revenue signal
  if (metrics.avgMonthlyRevenue > 1400) {
    reasons.push("High average revenue per customer (>£1,400/month)");
  } else if (metrics.avgMonthlyRevenue > 1000) {
    reasons.push("Strong revenue per customer (>£1,000/month)");
  }

  return reasons;
}

import { OpportunityDetail, PressureCluster } from "@/modules/types";
import { scanMarket } from "@/engines/marketScanner";
import { computeBuyingProbability } from "@/engines/buyingProbability";
import { makeDecision } from "@/engines/decisionEngine";
import { simulateRecognition } from "@/engines/recognitionSimulator";
import { runStressTest } from "@/engines/stressTest";
import { evaluateInterventionFit } from "@/engines/interventionFitFilter";
import { getWhyThisMatters } from "@/engines/outcomeMemory";

interface OrchestratorInput {
  postcode: string;
  radius: number;
  csvData?: Array<{ [key: string]: string }>;
}

export async function analyzeOpportunity(
  cluster: PressureCluster
): Promise<OpportunityDetail> {
  // Estimate buying probability for this cluster
  const buyingProbability = computeBuyingProbability({
    pressureIntensity: 0.7,
    urgency: 0.65,
    logisticsFit: 0.72,
    marketSimilarity: 0.68,
  });

  // Check intervention fit (critical safeguard)
  const interventionFit = evaluateInterventionFit({
    pressureName: cluster.name,
    buyingProbability: cluster.buyingProbability,
    urgencySignal: buyingProbability.urgency,
  });

  // Make decision
  const decision = makeDecision({
    pressureName: cluster.name,
    buyingProbability: cluster.buyingProbability,
    businessCount: cluster.businessCount,
    marketSimilarity: buyingProbability.marketSimilarity,
    urgency: buyingProbability.urgency,
  });

  // Simulate recognition message (with 3 fit tests)
  const recognitionSimulation = simulateRecognition({
    pressureName: cluster.name,
    businessCount: cluster.businessCount,
    severity: buyingProbability.pressureIntensity,
  });

  // Run stress test
  const stressTest = runStressTest({
    pressureName: cluster.name,
    buyingProbability: cluster.buyingProbability,
    recognitionFit: recognitionSimulation.psychologicalFit,
    commercialFit: recognitionSimulation.commercialFit,
    logisticsFit: recognitionSimulation.logisticsFit,
  });

  // Build "why this was surfaced" narrative using outcome memory
  const outcomeInsights = getWhyThisMatters(cluster.name);
  const whyThisSurfaced = [
    ...outcomeInsights, // Pattern matching + conversion signals
    ...decision.reasoning,
    ...stressTest.notes,
  ];

  // Add safeguard notes
  if (!interventionFit.shouldSurface) {
    whyThisSurfaced.unshift(
      `⚠ Intervention fit issue: ${interventionFit.suppresionReason}`
    );
  }

  if (cluster.businessCount > 20) {
    whyThisSurfaced.push(`Large market cluster (${cluster.businessCount} businesses)`);
  }

  return {
    cluster,
    buyingProbability,
    decision,
    recognitionSimulation,
    stressTest,
    whyThisSurfaced,
  };
}

export async function orchestrateMarketAnalysis(
  input: OrchestratorInput
): Promise<OpportunityDetail[]> {
  const scanResults = scanMarket({
    postcode: input.postcode,
    radius: input.radius,
    csvData: input.csvData,
  });

  const opportunities = await Promise.all(
    scanResults.opportunityClusters.map((cluster) =>
      analyzeOpportunity(cluster)
    )
  );

  // Sort by decision priority (ACT first, then WATCH, then IGNORE)
  const decisionPriority: Record<string, number> = {
    ACT: 0,
    WATCH: 1,
    IGNORE: 2,
  };

  return opportunities.sort(
    (a, b) =>
      decisionPriority[a.decision.decision] -
      decisionPriority[b.decision.decision]
  );
}

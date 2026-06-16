import { OpportunityDetail, PressureCluster } from "@/modules/types";
import { scanMarket } from "@/engines/marketScanner";
import { computeBuyingProbability, estimateProbabilityForCluster } from "@/engines/buyingProbability";
import { makeDecision } from "@/engines/decisionEngine";
import { simulateRecognition } from "@/engines/recognitionSimulator";
import { runStressTest } from "@/engines/stressTest";

interface OrchestratorInput {
  postcode: string;
  radius: number;
  csvData?: Array<{ [key: string]: string }>;
}

export async function analyzeOpportunity(
  cluster: PressureCluster,
  postcode: string
): Promise<OpportunityDetail> {
  // Estimate buying probability for this cluster
  const buyingProbability = computeBuyingProbability({
    pressureIntensity: 0.7,
    urgency: 0.65,
    logisticsFit: 0.72,
    marketSimilarity: 0.68,
  });

  // Make decision
  const decision = makeDecision({
    pressureName: cluster.name,
    buyingProbability: cluster.buyingProbability,
    businessCount: cluster.businessCount,
    marketSimilarity: buyingProbability.marketSimilarity,
    urgency: buyingProbability.urgency,
  });

  // Simulate recognition message
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

  // Build "why this was surfaced" narrative
  const whyThisSurfaced = [
    ...decision.reasoning,
    ...stressTest.notes,
  ];

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
      analyzeOpportunity(cluster, input.postcode)
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

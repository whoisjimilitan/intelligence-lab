export interface PressureType {
  id: string;
  name: string;
  definition: string;
  symptoms: string[];
  affectedIndustries: string[];
}

export interface Business {
  id: string;
  name: string;
  postcode: string;
  industry: string;
  latitude?: number;
  longitude?: number;
}

export interface PressureCluster {
  name: string;
  businessCount: number;
  buyingProbability: number;
  confidence: number;
  affectedBusinesses?: Business[];
}

export interface Opportunity {
  id: string;
  cluster: PressureCluster;
  business: Business;
  buyingProbability: number;
  decision: "ACT" | "WATCH" | "IGNORE";
  reasoning: string[];
  expectedOutcome: {
    engagementRate: number;
    conversionRate: number;
  };
}

export interface BuyingProbability {
  probability: number;
  pressureIntensity: number;
  urgency: number;
  logisticsFit: number;
  marketSimilarity: number;
  explanationFactors: string[];
}

export interface RecognitionSimulation {
  message: string;
  psychologicalFit: number;
  commercialFit: number;
  logisticsFit: number;
}

export interface StressTestResult {
  safeToSurface: boolean;
  riskLevel: "low" | "medium" | "high";
  notes: string[];
  psychological: {
    helpfulVsCreepy: number;
    clarity: number;
    trust: number;
  };
  commercial: {
    urgency: number;
    budgetLikelihood: number;
    decisionAccessibility: number;
  };
  behavioural: {
    likelihoodOfActionIn7Days: number;
  };
}

export interface DecisionEngineOutput {
  decision: "ACT" | "WATCH" | "IGNORE";
  reasoning: string[];
  expectedOutcome: {
    engagementRate: number;
    conversionRate: number;
  };
}

export interface OpportunityDetail {
  cluster: PressureCluster;
  buyingProbability: BuyingProbability;
  decision: DecisionEngineOutput;
  recognitionSimulation: RecognitionSimulation;
  stressTest: StressTestResult;
  whyThisSurfaced: string[];
}

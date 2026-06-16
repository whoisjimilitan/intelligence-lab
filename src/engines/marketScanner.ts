import { PressureCluster } from "@/modules/types";
import { PRESSURE_TAXONOMY } from "./pressureTaxonomy";

interface MarketScannerInput {
  postcode: string;
  radius: number;
  csvData?: Array<{ [key: string]: string }>;
}

interface MarketScannerOutput {
  postcode: string;
  radius: number;
  opportunityClusters: PressureCluster[];
  totalBusinessesScanned: number;
  generatedAt: string;
}

const MOCK_BUSINESS_DATABASE = [
  {
    postcode: "M1",
    industry: "Retail",
    businesses: 45,
  },
  {
    postcode: "M1",
    industry: "Pharmacy",
    businesses: 12,
  },
  {
    postcode: "M1",
    industry: "Healthcare",
    businesses: 8,
  },
  {
    postcode: "M1",
    industry: "Logistics",
    businesses: 23,
  },
  {
    postcode: "M2",
    industry: "Manufacturing",
    businesses: 34,
  },
  {
    postcode: "M2",
    industry: "Logistics",
    businesses: 19,
  },
  {
    postcode: "M3",
    industry: "Food & Beverage",
    businesses: 67,
  },
  {
    postcode: "M3",
    industry: "Retail",
    businesses: 52,
  },
];

const INDUSTRY_TO_PRESSURES: Record<string, string[]> = {
  Retail: [
    "Customer Wait Time",
    "Inventory Friction",
    "Capacity Overflow",
  ],
  Pharmacy: [
    "Prescription Fulfilment",
    "Inventory Friction",
    "Customer Wait Time",
  ],
  Healthcare: [
    "Appointment Backlog",
    "Prescription Fulfilment",
    "Customer Wait Time",
  ],
  Logistics: [
    "Delivery Reliability Pressure",
    "Time-Critical Logistics Pressure",
    "Capacity Overflow",
  ],
  Manufacturing: [
    "Capacity Overflow",
    "Inventory Friction",
    "Time-Critical Logistics Pressure",
  ],
  "Food & Beverage": [
    "Time-Critical Logistics Pressure",
    "Inventory Friction",
    "Delivery Reliability Pressure",
  ],
  "Salons & Spas": ["Appointment Backlog", "Customer Wait Time"],
  "Legal Services": ["Appointment Backlog", "Customer Wait Time"],
  "Automotive Service": ["Appointment Backlog", "Customer Wait Time"],
};

function getPostcodePrefix(postcode: string): string {
  return postcode.substring(0, 2).toUpperCase();
}

function generateBuyingProbability(): number {
  return Math.random() * 0.3 + 0.5; // 0.5 - 0.8
}

function generateConfidence(): number {
  return Math.random() * 0.2 + 0.7; // 0.7 - 0.9
}

export function scanMarket(input: MarketScannerInput): MarketScannerOutput {
  const postcodePrefix = getPostcodePrefix(input.postcode);

  // Use CSV data if provided, otherwise use mock data
  let scanResults: Array<{ industry: string; businessCount: number }> = [];

  if (input.csvData && input.csvData.length > 0) {
    const industryMap = new Map<string, number>();
    input.csvData.forEach((row) => {
      const industry = row.industry || row.Industry || "Other";
      industryMap.set(
        industry,
        (industryMap.get(industry) || 0) + 1
      );
    });
    scanResults = Array.from(industryMap).map(([industry, count]) => ({
      industry,
      businessCount: count,
    }));
  } else {
    // Use mock data filtered by postcode prefix
    const filtered = MOCK_BUSINESS_DATABASE.filter(
      (d) => d.postcode === postcodePrefix
    );

    if (filtered.length === 0) {
      // Default mock data if postcode not found
      scanResults = [
        { industry: "Retail", businessCount: 28 },
        { industry: "Pharmacy", businessCount: 9 },
        { industry: "Healthcare", businessCount: 7 },
        { industry: "Logistics", businessCount: 15 },
      ];
    } else {
      scanResults = filtered.map((d) => ({
        industry: d.industry,
        businessCount: d.businesses,
      }));
    }
  }

  // Generate pressure clusters based on industries found
  const clusters: PressureCluster[] = [];
  const seenPressures = new Set<string>();

  scanResults.forEach((result) => {
    const pressures = INDUSTRY_TO_PRESSURES[result.industry] || [];
    pressures.forEach((pressureName) => {
      if (!seenPressures.has(pressureName)) {
        const pressure = PRESSURE_TAXONOMY.find((p) => p.name === pressureName);
        if (pressure) {
          clusters.push({
            name: pressureName,
            businessCount: Math.floor(
              result.businessCount * (0.4 + Math.random() * 0.4)
            ),
            buyingProbability: generateBuyingProbability(),
            confidence: generateConfidence(),
          });
          seenPressures.add(pressureName);
        }
      }
    });
  });

  // Sort by buying probability
  clusters.sort((a, b) => b.buyingProbability - a.buyingProbability);

  const totalBusinesses = scanResults.reduce(
    (sum, r) => sum + r.businessCount,
    0
  );

  return {
    postcode: input.postcode,
    radius: input.radius,
    opportunityClusters: clusters,
    totalBusinessesScanned: totalBusinesses,
    generatedAt: new Date().toISOString(),
  };
}

export function parseCSV(csvText: string): Array<{ [key: string]: string }> {
  const lines = csvText.trim().split("\n");
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const data: Array<{ [key: string]: string }> = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    data.push(row);
  }

  return data;
}

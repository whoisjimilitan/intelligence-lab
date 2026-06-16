/**
 * Intelligence Lab Agent
 * Core Claude agent that detects operational pressures, qualifies prospects, and generates recognition emails.
 * This IS Intelligence Lab - not an orchestrator, but the decision-making system itself.
 */

import Anthropic from "@anthropic-ai/sdk";
import { generateRecognitionEmail, validateEmail, type RecognitionEmail } from "./recognition-email-generator";
import { getSituation, getAllPressureTypes, getIndustriesForPressure } from "./pressure-situations";

export interface BusinessData {
  name: string;
  industry: string;
  location: string;
  postcode: string;
  website?: string;
  reviews?: string;
  googlePlacesData?: Record<string, any>;
}

export interface PressureDetection {
  pressureType: string;
  confidence: number;
  signals: string[];
  reasoning: string;
}

export interface FitQualification {
  psychological: number;
  commercial: number;
  logistics: number;
  overall: number;
  reasoning: string;
  shouldContact: boolean;
}

export interface AgentDecision {
  shouldSend: boolean;
  reason: string;
  email?: RecognitionEmail;
  pressureType?: string;
  fitScore?: number;
}

class IntelligenceLab {
  private client: Anthropic;
  private pressureTypes: string[];

  constructor() {
    this.client = new Anthropic();
    this.pressureTypes = getAllPressureTypes();
  }

  /**
   * Main entry point: Detect pressures and decide whether to send email
   */
  async analyzeAndDecide(business: BusinessData): Promise<AgentDecision> {
    // Step 1: Detect operational pressures
    const detections = await this.detectPressures(business);

    if (!detections || detections.length === 0) {
      return {
        shouldSend: false,
        reason: "No operational pressures detected",
      };
    }

    // Step 2: Qualify psychological, commercial, and logistics fit
    const topDetection = detections[0]; // Most confident pressure
    const qualification = await this.qualifyFit(business, topDetection);

    // Step 3: Decide whether to send
    if (!qualification.shouldContact) {
      return {
        shouldSend: false,
        reason: qualification.reasoning,
        pressureType: topDetection.pressureType,
        fitScore: qualification.overall,
      };
    }

    // Step 4: Generate recognition email
    try {
      const email = generateRecognitionEmail({
        pressureType: topDetection.pressureType,
        industry: business.industry,
        location: this.extractCity(business.location),
        businessName: business.name,
      });

      const validation = validateEmail(email);
      if (!validation.valid) {
        return {
          shouldSend: false,
          reason: `Email validation failed: ${validation.errors.join(", ")}`,
          pressureType: topDetection.pressureType,
        };
      }

      return {
        shouldSend: true,
        reason: `Detected ${topDetection.pressureType} with high fit (${Math.round(qualification.overall * 100)}%)`,
        email,
        pressureType: topDetection.pressureType,
        fitScore: qualification.overall,
      };
    } catch (error) {
      return {
        shouldSend: false,
        reason: `Error generating email: ${error instanceof Error ? error.message : "Unknown error"}`,
        pressureType: topDetection.pressureType,
      };
    }
  }

  /**
   * Detect operational pressures using Claude
   * Analyzes business data to identify which pressure types they're experiencing
   */
  private async detectPressures(business: BusinessData): Promise<PressureDetection[]> {
    const pressureContext = this.pressureTypes
      .map((pt) => {
        const industries = getIndustriesForPressure(pt);
        return `- ${pt}: Common in ${industries.join(", ")}`;
      })
      .join("\n");

    const prompt = `You are an operational intelligence analyst. Analyze this business and detect which operational pressures they're likely experiencing.

Business Information:
- Name: ${business.name}
- Industry: ${business.industry}
- Location: ${business.location}
- Website: ${business.website || "Not provided"}
- Reviews/Description: ${business.reviews || "Not provided"}
${business.googlePlacesData ? `- Google Data: ${JSON.stringify(business.googlePlacesData)}` : ""}

Known Pressure Types:
${pressureContext}

Task: Identify the top 3 operational pressures this business is likely experiencing. For each, provide:
1. Pressure Type (from the list above, or similar)
2. Confidence (0-1)
3. Specific signals you observed
4. Brief reasoning

Respond in JSON format:
{
  "detections": [
    {
      "pressureType": "...",
      "confidence": 0.85,
      "signals": ["signal1", "signal2"],
      "reasoning": "..."
    }
  ]
}`;

    try {
      const response = await this.client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== "text") {
        throw new Error("Unexpected response type");
      }

      // Extract JSON from response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn("Could not parse detection response");
        return [];
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.detections
        .filter((d: PressureDetection) => d.confidence > 0.5) // Only moderate+ confidence
        .sort((a: PressureDetection, b: PressureDetection) => b.confidence - a.confidence);
    } catch (error) {
      console.error("Error detecting pressures:", error);
      return [];
    }
  }

  /**
   * Qualify psychological, commercial, and logistics fit
   * Tests whether this business is psychologically ready to engage and logistically viable for us
   */
  private async qualifyFit(
    business: BusinessData,
    detection: PressureDetection
  ): Promise<FitQualification> {
    const situation = getSituation(detection.pressureType, business.industry);
    if (!situation) {
      return {
        psychological: 0,
        commercial: 0,
        logistics: 0,
        overall: 0,
        reasoning: "No matching situation data for this pressure/industry combination",
        shouldContact: false,
      };
    }

    const prompt = `You are evaluating whether to contact a business about a specific operational pressure they're experiencing.

Business: ${business.name} (${business.industry})
Location: ${business.location}
Detected Pressure: ${detection.pressureType}
Signals: ${detection.signals.join(", ")}

Example Situation in This Industry:
"${situation.situation}"
Specific Detail: "${situation.specificDetail}"
Variability: "${situation.variabilityStatement}"

Rate this business on three dimensions (0-1):

1. PSYCHOLOGICAL FIT: Is this business psychologically ready to engage? Would they recognize themselves in the pressure description? Consider: industry maturity, likely sophistication, previous digitization efforts.

2. COMMERCIAL FIT: Is our offer commercially viable for them? Will they have budget? Consider: business size signals, industry margins, likely annual spend.

3. LOGISTICS FIT: Can we actually service them? Do we have infrastructure in their location? Consider: our coverage in ${business.location}, their scale, special requirements.

Respond in JSON:
{
  "psychological": 0.8,
  "commercial": 0.75,
  "logistics": 0.9,
  "reasoning": "...",
  "shouldContact": true
}`;

    try {
      const response = await this.client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 512,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type !== "text") {
        throw new Error("Unexpected response type");
      }

      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return {
          psychological: 0,
          commercial: 0,
          logistics: 0,
          overall: 0,
          reasoning: "Could not parse qualification response",
          shouldContact: false,
        };
      }

      const qual = JSON.parse(jsonMatch[0]);
      const overall = (qual.psychological + qual.commercial + qual.logistics) / 3;

      return {
        psychological: qual.psychological,
        commercial: qual.commercial,
        logistics: qual.logistics,
        overall,
        reasoning: qual.reasoning,
        shouldContact: overall > 0.65, // Threshold for contact
      };
    } catch (error) {
      console.error("Error qualifying fit:", error);
      return {
        psychological: 0,
        commercial: 0,
        logistics: 0,
        overall: 0,
        reasoning: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        shouldContact: false,
      };
    }
  }

  /**
   * Learn from response: Track YES/NO opt-ins and update strategy
   */
  async learnFromResponse(
    emailId: string,
    response: "YES" | "NO",
    businessData: BusinessData,
    pressureType: string
  ): Promise<void> {
    // This is where we'd update learning systems
    // For now, log the response
    console.log(
      `[LEARNING] ${businessData.name} responded "${response}" to ${pressureType} email (${emailId})`
    );

    // Future: Store in database, update pressure type conversion rates, etc.
  }

  /**
   * Helper: Extract city from location string
   */
  private extractCity(location: string): string {
    // "London, UK" => "London"
    return location.split(",")[0].trim();
  }
}

// Export singleton
export const intelligenceLab = new IntelligenceLab();

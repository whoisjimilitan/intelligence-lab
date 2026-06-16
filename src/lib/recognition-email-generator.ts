/**
 * Recognition Email Generator
 * Creates psychologically resonant recognition emails using the locked structure
 *
 * Structure (locked):
 * 1. Personal request ("I need you to answer this honestly")
 * 2. Peer observation ("Some [peer] in [location] say")
 * 3. Specific situation (their exact world)
 * 4. Variability statement (validation of reality)
 * 5. Question with timeframe ("Sound like your [timeframe]?")
 * 6. YES/NO buttons (opt-in)
 */

import { getSituation, type PressureSituation } from "./pressure-situations";

export interface RecognitionEmail {
  emailId: string;
  subject: string;
  body: string;
  htmlBody: string;
  pressureType: string;
  industry: string;
  location: string;
  businessName: string;
  createdAt: string;
}

export interface EmailOptions {
  pressureType: string;
  industry: string;
  location: string;
  businessName: string;
}

/**
 * Generate a recognition email using the locked psychological structure
 */
export function generateRecognitionEmail(options: EmailOptions): RecognitionEmail {
  const { pressureType, industry, location, businessName } = options;

  const situation = getSituation(pressureType, industry);
  if (!situation) {
    throw new Error(
      `No situation found for pressure "${pressureType}" in industry "${industry}"`
    );
  }

  const peerGroup = getPeerGroup(industry);
  const emailId = `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const body = buildEmailBody(
    peerGroup,
    location,
    situation,
    emailId
  );

  const htmlBody = convertToHtml(body);
  const subject = `${pressureType} for ${businessName}`;

  return {
    emailId,
    subject,
    body,
    htmlBody,
    pressureType,
    industry,
    location,
    businessName,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Build the email body using the locked structure
 */
function buildEmailBody(
  peerGroup: string,
  location: string,
  situation: PressureSituation,
  emailId: string
): string {
  return `I need you to answer this honestly:

Some ${peerGroup} in ${location} say ${situation.situation.toLowerCase()}

${situation.specificDetail}

${situation.variabilityStatement}

Sound like your ${situation.timeframe}?

[YES] [NO]

---
Email ID: ${emailId}`;
}

/**
 * Convert plain text body to HTML
 */
function convertToHtml(body: string): string {
  const lines = body.split("\n");
  let html = "";

  for (const line of lines) {
    if (line.includes("[YES]") && line.includes("[NO]")) {
      html += `<div style="margin: 20px 0; text-align: center;">
        <a href="/api/respond?type=yes" style="display: inline-block; margin-right: 15px; padding: 10px 20px; background-color: #0A66C2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">YES</a>
        <a href="/api/respond?type=no" style="display: inline-block; padding: 10px 20px; background-color: #f3f6f9; color: #222222; text-decoration: none; border-radius: 6px; font-weight: bold;">NO</a>
      </div>`;
    } else if (line.startsWith("---")) {
      html += `<hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">`;
    } else if (line.trim() === "") {
      html += `<br>`;
    } else {
      html += `<p style="margin: 12px 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #222222;">${line}</p>`;
    }
  }

  return html;
}

/**
 * Get the peer group label for an industry
 */
function getPeerGroup(industry: string): string {
  const peerGroupMap: Record<string, string> = {
    Lawyer: "lawyers",
    Pharmacy: "pharmacies",
    Laboratory: "labs",
    Veterinary: "vet clinics",
    Retail: "retail stores",
    Restaurant: "restaurants",
    Dentist: "dentists",
    Clinic: "clinics",
    Optician: "opticians",
    "Home Services": "home service businesses",
    Manufacturing: "manufacturers",
  };

  return peerGroupMap[industry] || `${industry.toLowerCase()}s`;
}

/**
 * Validate email before sending
 */
export function validateEmail(email: RecognitionEmail): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!email.emailId) errors.push("Missing email ID");
  if (!email.subject) errors.push("Missing subject");
  if (!email.body) errors.push("Missing body");
  if (!email.pressureType) errors.push("Missing pressure type");
  if (!email.industry) errors.push("Missing industry");
  if (!email.location) errors.push("Missing location");
  if (!email.businessName) errors.push("Missing business name");

  // Validate locked structure
  if (!email.body.includes("I need you to answer this honestly")) {
    errors.push("Missing personal request opening");
  }
  if (!email.body.includes("Sound like your")) {
    errors.push("Missing recognition question");
  }
  if (!email.body.includes("[YES]") || !email.body.includes("[NO]")) {
    errors.push("Missing YES/NO buttons");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

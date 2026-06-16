/**
 * POST /api/analyze
 * Manual mode: Operator submits business data, agent detects pressures and decides to send
 */

import { NextRequest, NextResponse } from "next/server";
import { intelligenceLab, type BusinessData } from "@/lib/intelligence-lab-agent";
import { emailTracker } from "@/lib/email-tracking";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const business: BusinessData = {
      name: body.name,
      industry: body.industry,
      location: body.location,
      postcode: body.postcode,
      website: body.website,
      reviews: body.reviews,
      googlePlacesData: body.googlePlacesData,
    };

    // Check if already contacted recently
    if (emailTracker.hasRecentContact(business.postcode, 90)) {
      return NextResponse.json(
        {
          success: false,
          reason: "Already contacted this business in the last 90 days",
        },
        { status: 400 }
      );
    }

    // Check if unsubscribed
    if (emailTracker.isUnsubscribed(business.postcode)) {
      return NextResponse.json(
        {
          success: false,
          reason: "Business has unsubscribed from outreach",
        },
        { status: 400 }
      );
    }

    // Run analysis
    const decision = await intelligenceLab.analyzeAndDecide(business);

    if (!decision.shouldSend) {
      return NextResponse.json(
        {
          success: false,
          reason: decision.reason,
          pressureType: decision.pressureType,
          fitScore: decision.fitScore,
        },
        { status: 400 }
      );
    }

    // Send email (in real system, this would call email service)
    if (decision.email) {
      emailTracker.sendEmail(
        decision.email.emailId,
        business.postcode,
        business.name,
        business.website || "unknown@business.com",
        decision.email.pressureType
      );
    }

    return NextResponse.json({
      success: true,
      email: decision.email,
      pressureType: decision.pressureType,
      fitScore: decision.fitScore,
      reason: decision.reason,
    });
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

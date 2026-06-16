/**
 * GET /api/emails
 * Get sent emails, optionally filtered by pressure type
 */

import { NextRequest, NextResponse } from "next/server";
import { emailTracker } from "@/lib/email-tracking";

export async function GET(request: NextRequest) {
  try {
    const pressureType = request.nextUrl.searchParams.get("pressure");

    let emails;
    if (pressureType) {
      emails = emailTracker.getPressureEmails(pressureType);
    } else {
      // Return all emails (limited for performance)
      const allEmails = Array.from((emailTracker as any).emailRecords?.values?.() || []);
      emails = allEmails.slice(-100); // Last 100
    }

    return NextResponse.json({
      success: true,
      count: emails.length,
      emails,
    });
  } catch (error) {
    console.error("Error in /api/emails:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

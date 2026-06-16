/**
 * POST /api/respond
 * Capture YES/NO responses from recognition emails
 */

import { NextRequest, NextResponse } from "next/server";
import { emailTracker } from "@/lib/email-tracking";

interface RespondRequest {
  emailId: string;
  response: "YES" | "NO";
}

export async function POST(request: NextRequest) {
  try {
    const body: RespondRequest = await request.json();

    const { emailId, response } = body;

    if (!emailId || !response || !["YES", "NO"].includes(response)) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid emailId or response",
        },
        { status: 400 }
      );
    }

    // Record response
    const record = emailTracker.recordResponse(emailId, response);

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          error: "Email not found",
        },
        { status: 404 }
      );
    }

    // In a real system, this is where we'd trigger next actions:
    // - YES: Create qualified lead, schedule follow-up email
    // - NO: Add to suppression list, log as learning signal

    return NextResponse.json({
      success: true,
      message:
        response === "YES"
          ? "Thank you! We'll be in touch soon."
          : "We understand. We won't reach out again.",
      record,
    });
  } catch (error) {
    console.error("Error in /api/respond:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

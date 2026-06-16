/**
 * GET /api/metrics
 * Get system performance metrics and learning data
 */

import { NextRequest, NextResponse } from "next/server";
import { emailTracker } from "@/lib/email-tracking";

export async function GET(request: NextRequest) {
  try {
    const stats = emailTracker.getEmailEngagementStats();
    const ranking = emailTracker.getPerformanceRanking();
    const learning = emailTracker.getLearningMetrics();

    return NextResponse.json({
      success: true,
      stats,
      performanceRanking: ranking,
      learningMetrics: learning,
    });
  } catch (error) {
    console.error("Error in /api/metrics:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

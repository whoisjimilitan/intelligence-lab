/**
 * Email Tracking System
 * Tracks YES/NO opt-ins, engagement, and learning loop data
 */

export interface EmailRecord {
  emailId: string;
  businessId: string;
  businessName: string;
  businessEmail: string;
  pressureType: string;
  sentAt: string;
  status: "sent" | "opened" | "clicked" | "replied" | "yes" | "no";
  openCount: number;
  clickCount: number;
  response?: "YES" | "NO";
  responseAt?: string;
}

export interface LearningMetric {
  pressureType: string;
  industry?: string;
  sent: number;
  yesResponses: number;
  noResponses: number;
  yesRate: number;
  conversionRate: number;
}

class EmailTrackingSystem {
  private emailRecords: Map<string, EmailRecord> = new Map();
  private learningMetrics: Map<string, LearningMetric> = new Map();

  /**
   * Record an email being sent
   */
  sendEmail(
    emailId: string,
    businessId: string,
    businessName: string,
    businessEmail: string,
    pressureType: string
  ): EmailRecord {
    const record: EmailRecord = {
      emailId,
      businessId,
      businessName,
      businessEmail,
      pressureType,
      sentAt: new Date().toISOString(),
      status: "sent",
      openCount: 0,
      clickCount: 0,
    };

    this.emailRecords.set(emailId, record);
    this.updateLearningMetrics(pressureType, "sent");

    return record;
  }

  /**
   * Record email being opened
   */
  recordEmailOpen(emailId: string): EmailRecord | undefined {
    const record = this.emailRecords.get(emailId);
    if (!record) return undefined;

    record.openCount += 1;
    if (record.status === "sent") {
      record.status = "opened";
    }

    return record;
  }

  /**
   * Record email link click
   */
  recordEmailClick(emailId: string): EmailRecord | undefined {
    const record = this.emailRecords.get(emailId);
    if (!record) return undefined;

    record.clickCount += 1;
    if (record.status === "opened") {
      record.status = "clicked";
    }

    return record;
  }

  /**
   * Record YES/NO response (the critical moment!)
   */
  recordResponse(
    emailId: string,
    response: "YES" | "NO"
  ): EmailRecord | undefined {
    const record = this.emailRecords.get(emailId);
    if (!record) return undefined;

    record.response = response;
    record.responseAt = new Date().toISOString();
    record.status = response === "YES" ? "yes" : "no";

    // Update learning metrics
    if (response === "YES") {
      this.updateLearningMetrics(record.pressureType, "yes");
    } else {
      this.updateLearningMetrics(record.pressureType, "no");
    }

    return record;
  }

  /**
   * Get email record
   */
  getEmailRecord(emailId: string): EmailRecord | undefined {
    return this.emailRecords.get(emailId);
  }

  /**
   * Get all emails for a business
   */
  getBusinessEmails(businessId: string): EmailRecord[] {
    return Array.from(this.emailRecords.values()).filter(
      (r) => r.businessId === businessId
    );
  }

  /**
   * Get all emails for a pressure type
   */
  getPressureEmails(pressureType: string): EmailRecord[] {
    return Array.from(this.emailRecords.values()).filter(
      (r) => r.pressureType === pressureType
    );
  }

  /**
   * Get engagement stats (for dashboard)
   */
  getEmailEngagementStats(): {
    totalSent: number;
    opened: number;
    clicked: number;
    replied: number;
    yesResponses: number;
    noResponses: number;
    openRate: string;
    clickRate: string;
    replyRate: string;
    yesRate: string;
  } {
    const records = Array.from(this.emailRecords.values());
    const sent = records.filter((r) => r.status !== "sent").length;
    const opened = records.filter((r) => r.openCount > 0).length;
    const clicked = records.filter((r) => r.clickCount > 0).length;
    const yesResponses = records.filter((r) => r.response === "YES").length;
    const noResponses = records.filter((r) => r.response === "NO").length;

    return {
      totalSent: records.length,
      opened,
      clicked,
      replied: yesResponses + noResponses,
      yesResponses,
      noResponses,
      openRate: sent > 0 ? ((opened / sent) * 100).toFixed(0) : "0",
      clickRate: opened > 0 ? ((clicked / opened) * 100).toFixed(0) : "0",
      replyRate:
        sent > 0 ? (((yesResponses + noResponses) / sent) * 100).toFixed(0) : "0",
      yesRate:
        yesResponses + noResponses > 0
          ? ((yesResponses / (yesResponses + noResponses)) * 100).toFixed(0)
          : "0",
    };
  }

  /**
   * Get learning metrics by pressure type
   */
  getLearningMetrics(pressureType?: string): LearningMetric[] {
    if (pressureType) {
      const metric = this.learningMetrics.get(pressureType);
      return metric ? [metric] : [];
    }

    return Array.from(this.learningMetrics.values())
      .sort((a, b) => b.yesRate - a.yesRate) // Best performers first
      .slice(0, 20); // Top 20
  }

  /**
   * Internal: Update learning metrics
   */
  private updateLearningMetrics(
    pressureType: string,
    event: "sent" | "yes" | "no"
  ): void {
    let metric = this.learningMetrics.get(pressureType) || {
      pressureType,
      sent: 0,
      yesResponses: 0,
      noResponses: 0,
      yesRate: 0,
      conversionRate: 0,
    };

    if (event === "sent") {
      metric.sent += 1;
    } else if (event === "yes") {
      metric.yesResponses += 1;
    } else if (event === "no") {
      metric.noResponses += 1;
    }

    // Recalculate rates
    const totalResponses = metric.yesResponses + metric.noResponses;
    metric.yesRate =
      totalResponses > 0
        ? (metric.yesResponses / totalResponses) * 100
        : 0;
    metric.conversionRate =
      metric.sent > 0
        ? (metric.yesResponses / metric.sent) * 100
        : 0;

    this.learningMetrics.set(pressureType, metric);
  }

  /**
   * Get performance ranking (which pressures convert best?)
   */
  getPerformanceRanking(): Array<{
    rank: number;
    pressureType: string;
    yesRate: number;
    conversionRate: number;
    sent: number;
    yesResponses: number;
  }> {
    const metrics = Array.from(this.learningMetrics.values())
      .filter((m) => m.sent >= 5) // Only pressures with 5+ emails sent
      .sort((a, b) => b.yesRate - a.yesRate);

    return metrics.map((m, idx) => ({
      rank: idx + 1,
      pressureType: m.pressureType,
      yesRate: Math.round(m.yesRate),
      conversionRate: Math.round(m.conversionRate),
      sent: m.sent,
      yesResponses: m.yesResponses,
    }));
  }

  /**
   * Check if we've already contacted this business recently (deduplication)
   */
  hasRecentContact(businessId: string, days: number = 90): boolean {
    const emails = this.getBusinessEmails(businessId);
    if (emails.length === 0) return false;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return emails.some(
      (e) => new Date(e.sentAt) > cutoff && e.status !== "no"
    );
  }

  /**
   * Check if business has unsubscribed
   */
  isUnsubscribed(businessId: string): boolean {
    const emails = this.getBusinessEmails(businessId);
    // If they've said NO multiple times, mark as unsubscribed
    const noResponses = emails.filter((e) => e.response === "NO").length;
    return noResponses >= 2;
  }
}

// Export singleton
export const emailTracker = new EmailTrackingSystem();

// Convenience exports for existing code
export function sendEmail(
  businessId: string,
  businessName: string,
  businessEmail: string,
  pressureType: string
) {
  const emailId = `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return emailTracker.sendEmail(
    emailId,
    businessId,
    businessName,
    businessEmail,
    pressureType
  );
}

export function recordEmailOpen(emailId: string) {
  return emailTracker.recordEmailOpen(emailId);
}

export function recordEmailClick(emailId: string) {
  return emailTracker.recordEmailClick(emailId);
}

export function recordEmailReply(emailId: string) {
  const record = emailTracker.getEmailRecord(emailId);
  if (!record) return undefined;

  record.status = "replied";
  return record;
}

export function getEmailRecord(emailId: string) {
  return emailTracker.getEmailRecord(emailId);
}

export function getEmailEngagementStats() {
  return emailTracker.getEmailEngagementStats();
}

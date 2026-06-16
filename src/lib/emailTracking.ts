// In-memory email tracking system (Phase 1)
// In production, this would use a real database

interface EmailRecord {
  id: string;
  companyId: string;
  companyName: string;
  emailAddress: string;
  pressureType: string;
  status: "sent" | "opened" | "clicked" | "replied" | "unsubscribed";
  sentAt: string;
  openedAt?: string;
  openCount: number;
  clickedAt?: string;
  clickCount: number;
  repliedAt?: string;
  followUpSentAt?: string;
  unsubscribedAt?: string;
  unsubscribeReason?: string;
}

// Mock database
const emailDatabase: Map<string, EmailRecord> = new Map();

export function sendEmail(
  companyId: string,
  companyName: string,
  emailAddress: string,
  pressureType: string
): EmailRecord {
  const id = `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const record: EmailRecord = {
    id,
    companyId,
    companyName,
    emailAddress,
    pressureType,
    status: "sent",
    sentAt: new Date().toISOString(),
    openCount: 0,
    clickCount: 0,
  };

  emailDatabase.set(id, record);
  return record;
}

export function getEmailRecord(companyId: string): EmailRecord | undefined {
  // Find the most recent email for this company
  let latestEmail: EmailRecord | undefined;
  let latestTime = 0;

  emailDatabase.forEach((record) => {
    if (record.companyId === companyId) {
      const time = new Date(record.sentAt).getTime();
      if (time > latestTime) {
        latestTime = time;
        latestEmail = record;
      }
    }
  });

  return latestEmail;
}

export function recordEmailOpen(companyId: string): EmailRecord | undefined {
  const record = getEmailRecord(companyId);
  if (record) {
    record.openCount++;
    record.status = "opened";
    record.openedAt = new Date().toISOString();
    emailDatabase.set(record.id, record);
  }
  return record;
}

export function recordEmailClick(companyId: string): EmailRecord | undefined {
  const record = getEmailRecord(companyId);
  if (record) {
    record.clickCount++;
    record.status = "clicked";
    record.clickedAt = new Date().toISOString();
    emailDatabase.set(record.id, record);
  }
  return record;
}

export function recordEmailReply(companyId: string): EmailRecord | undefined {
  const record = getEmailRecord(companyId);
  if (record) {
    record.status = "replied";
    record.repliedAt = new Date().toISOString();
    emailDatabase.set(record.id, record);
  }
  return record;
}

export function sendFollowUpEmail(companyId: string): EmailRecord | undefined {
  const record = getEmailRecord(companyId);
  if (record) {
    record.followUpSentAt = new Date().toISOString();
    emailDatabase.set(record.id, record);
  }
  return record;
}

export function handleUnsubscribe(
  companyId: string,
  reason?: string
): EmailRecord | undefined {
  const record = getEmailRecord(companyId);
  if (record) {
    record.status = "unsubscribed";
    record.unsubscribedAt = new Date().toISOString();
    record.unsubscribeReason = reason;
    emailDatabase.set(record.id, record);
  }
  return record;
}

export function getAllEmails(): EmailRecord[] {
  return Array.from(emailDatabase.values());
}

export function getEmailsByStatus(
  status: EmailRecord["status"]
): EmailRecord[] {
  return Array.from(emailDatabase.values()).filter(
    (record) => record.status === status
  );
}

export function getEmailEngagementStats() {
  const all = Array.from(emailDatabase.values());
  const sent = all.length;
  const opened = all.filter((e) => e.openCount > 0).length;
  const clicked = all.filter((e) => e.clickCount > 0).length;
  const replied = all.filter((e) => e.status === "replied").length;
  const unsubscribed = all.filter((e) => e.status === "unsubscribed").length;

  return {
    totalSent: sent,
    opened,
    openRate: sent > 0 ? ((opened / sent) * 100).toFixed(1) : "0",
    clicked,
    clickRate: sent > 0 ? ((clicked / sent) * 100).toFixed(1) : "0",
    replied,
    replyRate: sent > 0 ? ((replied / sent) * 100).toFixed(1) : "0",
    unsubscribed,
    unsubscribeRate: sent > 0 ? ((unsubscribed / sent) * 100).toFixed(1) : "0",
  };
}

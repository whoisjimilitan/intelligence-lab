export interface RecognitionSimulation {
  message: string;
  psychologicalFit: number; // 0-10: helpful, credible, not invasive
  commercialFit: number; // 0-10: budget, urgency, decision-maker
  logisticsFit: number; // 0-10: can we solve this?
  overallViability: number; // 0-10: weighted average
}

interface RecognitionSimulatorInput {
  pressureName: string;
  businessCount: number;
  severity?: number; // 0-1
}

const PRESSURE_TO_MESSAGING: Record<string, {
  recognition: string;
  implication: string;
  solution: string;
  psychFit: number;
  commFit: number;
  logFit: number;
}> = {
  "Prescription Fulfilment": {
    recognition:
      "We noticed pharmacies in your area experiencing delays in prescription fulfillment.",
    implication:
      "This often leads to slower patient service, compliance risks, and operational strain.",
    solution: "We help stabilise same-day delivery flow and automate fulfillment workflows.",
    psychFit: 8.5,
    commFit: 8.2,
    logFit: 8.8,
  },
  "Inventory Friction": {
    recognition:
      "We noticed businesses in your area struggling with inventory management.",
    implication:
      "This often leads to stockouts, overstocking, and wasted capital tied up in dead stock.",
    solution:
      "We help optimize inventory levels and provide real-time visibility across locations.",
    psychFit: 7.8,
    commFit: 8.0,
    logFit: 8.1,
  },
  "Customer Wait Time": {
    recognition:
      "We noticed retail businesses in your area experiencing customer wait time bottlenecks.",
    implication:
      "This often leads to abandoned transactions, lower satisfaction scores, and lost revenue.",
    solution:
      "We help streamline checkout and service processes to reduce wait times.",
    psychFit: 7.5,
    commFit: 7.8,
    logFit: 7.2,
  },
  "Appointment Backlog": {
    recognition:
      "We noticed service businesses in your area with appointment scheduling bottlenecks.",
    implication:
      "This often leads to lost appointments, customer frustration, and untapped revenue potential.",
    solution:
      "We help automate scheduling and optimize appointment utilization rates.",
    psychFit: 8.2,
    commFit: 8.4,
    logFit: 7.6,
  },
  "Delivery Reliability Pressure": {
    recognition:
      "We noticed logistics businesses in your area dealing with delivery reliability challenges.",
    implication:
      "This often leads to missed commitments, customer complaints, and revenue loss.",
    solution:
      "We help optimize route planning and provide real-time delivery tracking.",
    psychFit: 7.9,
    commFit: 8.3,
    logFit: 8.7,
  },
  "Capacity Overflow": {
    recognition:
      "We noticed businesses in your area operating near maximum capacity.",
    implication:
      "This often leads to quality degradation, staff burnout, and inability to capture new business.",
    solution:
      "We help expand operational capacity and improve process efficiency.",
    psychFit: 8.0,
    commFit: 8.5,
    logFit: 7.8,
  },
  "Time-Critical Logistics Pressure": {
    recognition:
      "We noticed time-sensitive businesses in your area facing logistics pressure.",
    implication:
      "This often leads to spoilage, compliance violations, and customer refunds.",
    solution:
      "We help establish reliable time-critical logistics networks.",
    psychFit: 8.3,
    commFit: 8.6,
    logFit: 8.9,
  },
};

function generateFit(
  baseValue: number,
  businessCount: number,
  severity?: number
): number {
  // Adjust fit based on market size and severity
  const sizeAdjust = Math.min(0.5, businessCount / 100);
  const severityAdjust = severity ? severity * 0.3 : 0;
  return Math.min(10, baseValue + sizeAdjust + severityAdjust);
}

export function simulateRecognition(
  input: RecognitionSimulatorInput
): RecognitionSimulation {
  const messaging = PRESSURE_TO_MESSAGING[input.pressureName];

  if (!messaging) {
    // Fallback for unknown pressure types
    const psych = 6.5;
    const comm = 6.5;
    const log = 6.5;
    return {
      message: `We noticed operational pressures affecting businesses in your area.`,
      psychologicalFit: psych,
      commercialFit: comm,
      logisticsFit: log,
      overallViability: (psych + comm + log) / 3,
    };
  }

  const message = [messaging.recognition, messaging.implication, messaging.solution].join("\n\n");

  const psych = generateFit(
    messaging.psychFit,
    input.businessCount,
    input.severity
  );
  const comm = generateFit(
    messaging.commFit,
    input.businessCount,
    input.severity
  );
  const log = generateFit(
    messaging.logFit,
    input.businessCount,
    input.severity
  );

  return {
    message,
    psychologicalFit: psych,
    commercialFit: comm,
    logisticsFit: log,
    overallViability: (psych + comm + log) / 3,
  };
}

export function getRecognitionMessage(pressureName: string): string {
  const messaging = PRESSURE_TO_MESSAGING[pressureName];
  return messaging?.recognition || "We noticed operational pressures in your area.";
}

/**
 * Pressure Situations Library
 *
 * Systematically maps operational stuckness across eight dimensions:
 * 1. MONEY: Payment, cash flow, financing, revenue recognition
 * 2. SERVICE: Capacity, quality, availability, SLAs
 * 3. GROWTH: Customer acquisition, retention, expansion
 * 4. MOVEMENT: Physical logistics, distribution, routes (Saint & Story core)
 * 5. PRESCRIPTIONS: Orders, medical orders, compliance, validation
 * 6. DELIVERIES: Timing, reliability, fragile handling, proof-of-delivery
 * 7. APPOINTMENTS: Scheduling, no-shows, confirmation
 * 8. EXPERIENCE: Visibility, communication, tracking, issue resolution
 *
 * Each pressure type is populated across 3-6 industries that commonly experience it.
 * Email generator uses this to create recognition emails that make prospects feel understood.
 */

export interface PressureSituation {
  pressureType: string;
  industry: string;
  location?: string;
  situation: string;
  specificDetail: string;
  variabilityStatement: string;
  timeframe: string;
}

export const PRESSURE_SITUATIONS: Record<string, PressureSituation[]> = {
  // MONEY STUCKNESS
  "Payment Collection Delays": [
    {
      pressureType: "Payment Collection Delays",
      industry: "B2B Services",
      situation:
        "Invoices sit unpaid for 60+ days. Cash flow dries up waiting on client payments.",
      specificDetail:
        "You're chasing invoices manually and deferring vendor payments because cash hasn't arrived.",
      variabilityStatement: "Some clients pay on time. Some take 90+ days or partially default.",
      timeframe: "quarter",
    },
    {
      pressureType: "Payment Collection Delays",
      industry: "Construction",
      situation:
        "Subcontractor payments depend on customer payments. Delays cascade through supply chain.",
      specificDetail:
        "You're managing payment schedules and float costs that impact your ability to pay subs on time.",
      variabilityStatement: "Some projects have strong payment flow. Some dry up for months.",
      timeframe: "month",
    },
    {
      pressureType: "Payment Collection Delays",
      industry: "Staffing Agency",
      situation:
        "Temp worker payroll comes before client invoicing. Funding gaps squeeze margins.",
      specificDetail:
        "You're advancing payroll on Friday while waiting for client invoices to arrive mid-month.",
      variabilityStatement: "Some clients pay quickly. Some delay payment for 45 days.",
      timeframe: "month",
    },
  ],

  "Financial Visibility": [
    {
      pressureType: "Financial Visibility",
      industry: "Multi-Location Retail",
      situation:
        "Revenue data comes in late from each location. P&L reporting is always behind.",
      specificDetail:
        "You're manually consolidating reports from 20+ stores and can't make real-time decisions.",
      variabilityStatement:
        "Some locations report accurately by day 5. Some take 3 weeks.",
      timeframe: "week",
    },
    {
      pressureType: "Financial Visibility",
      industry: "E-Commerce",
      situation:
        "Profit visibility across channels is impossible. You don't know which channels actually make money.",
      specificDetail:
        "You're managing refunds, chargebacks, and returns in spreadsheets without consolidated profit view.",
      variabilityStatement:
        "Some months you think you're profitable. Some months you realize you lost money.",
      timeframe: "month",
    },
  ],

  "Working Capital Constraints": [
    {
      pressureType: "Working Capital Constraints",
      industry: "Wholesale Distribution",
      situation:
        "Inventory takes capital. You're financing customer float while managing your own payables.",
      specificDetail:
        "You need cash to stock shelves but don't get paid until items sell.",
      variabilityStatement:
        "Some quarters you have breathing room. Some quarters you're one payment away from trouble.",
      timeframe: "quarter",
    },
    {
      pressureType: "Working Capital Constraints",
      industry: "Manufacturing",
      situation:
        "Raw materials require upfront payment. Production sits idle waiting for capital.",
      specificDetail:
        "You need £100k to start production but don't get paid until delivery.",
      variabilityStatement: "Some orders fund themselves. Some require external financing.",
      timeframe: "month",
    },
  ],

  // SERVICE STUCKNESS
  "Capacity Overflow": [
    {
      pressureType: "Capacity Overflow",
      industry: "Dentist",
      situation:
        "You book 4 weeks out. Emergency patients walk to competitors. Revenue walks with them.",
      specificDetail:
        "You're turning away same-week appointments and losing patients who can't wait.",
      variabilityStatement:
        "Some weeks you have gaps. Some weeks you're fully booked with no flexibility.",
      timeframe: "week",
    },
    {
      pressureType: "Capacity Overflow",
      industry: "Clinic",
      situation:
        "Appointment demand exceeds your scheduling capacity. Patients wait weeks for non-urgent care.",
      specificDetail:
        "You're managing waitlists and cancellations trying to fit emergency appointments.",
      variabilityStatement: "Some days you find slots. Some days you turn people away.",
      timeframe: "day",
    },
    {
      pressureType: "Capacity Overflow",
      industry: "Call Center",
      situation:
        "Incoming calls exceed staffing capacity. Average wait times hit 10+ minutes. Callers hang up.",
      specificDetail:
        "You're losing customer satisfaction and competitive advantage as call abandonment rates climb.",
      variabilityStatement:
        "Some hours you answer quickly. Peak hours have 40-minute queues.",
      timeframe: "day",
    },
    {
      pressureType: "Capacity Overflow",
      industry: "Home Services",
      situation:
        "Call volume exceeds your dispatch capacity. Jobs stack up and response times slip.",
      specificDetail:
        "You're managing a backlog of requests and doing manual dispatch trying to optimize routes.",
      variabilityStatement: "Some jobs get scheduled next day. Some wait a week.",
      timeframe: "week",
    },
  ],

  "Service Quality Inconsistency": [
    {
      pressureType: "Service Quality Inconsistency",
      industry: "Food Manufacturing",
      situation:
        "Batch rejections due to QC failures cost thousands. Compliance documentation is manual.",
      specificDetail:
        "You're checking each batch manually and managing regulatory paperwork in spreadsheets.",
      variabilityStatement:
        "Some batches pass first-time. Some get flagged weeks into production.",
      timeframe: "week",
    },
    {
      pressureType: "Service Quality Inconsistency",
      industry: "Medical Practice",
      situation:
        "Patient safety standards require perfect documentation. Manual paper systems create liability.",
      specificDetail:
        "You're managing compliance manually and worried about audit failures or regulatory penalties.",
      variabilityStatement:
        "Most records are correct. Some patient files have missing documentation.",
      timeframe: "day",
    },
  ],

  // GROWTH STUCKNESS
  "Customer Acquisition Friction": [
    {
      pressureType: "Customer Acquisition Friction",
      industry: "B2B SaaS",
      situation:
        "Sales cycle is 6+ months. Pipeline is unpredictable. Revenue is lumpy.",
      specificDetail:
        "You're spending heavily on marketing but closing deals unpredictably.",
      variabilityStatement:
        "Some months you close 3 deals. Some months you close none.",
      timeframe: "quarter",
    },
    {
      pressureType: "Customer Acquisition Friction",
      industry: "Insurance",
      situation:
        "Customer acquisition cost is climbing. New policy volume isn't keeping up with targets.",
      specificDetail:
        "You're competing on price while your margins shrink.",
      variabilityStatement:
        "Some campaigns convert well. Some cost £10 per customer acquisition.",
      timeframe: "month",
    },
  ],

  "Customer Churn": [
    {
      pressureType: "Customer Churn",
      industry: "Subscription SaaS",
      situation:
        "Monthly churn bleeds revenue. Customers downgrade without warning.",
      specificDetail:
        "You're reacting to cancellations instead of proactively engaging at-risk customers.",
      variabilityStatement: "Some cohorts stick. Some churn within 3 months.",
      timeframe: "month",
    },
    {
      pressureType: "Customer Churn",
      industry: "Telecom",
      situation:
        "Contract renewals are chaotic. Customers leave for competitors with better retention offers.",
      specificDetail:
        "You're manually tracking renewal dates and losing customers who aren't re-engaged before expiration.",
      variabilityStatement:
        "Some renewals convert smoothly. Some customers ghost.",
      timeframe: "quarter",
    },
  ],

  // MOVEMENT STUCKNESS (Saint & Story core)
  "Time-Critical Movement": [
    {
      pressureType: "Time-Critical Movement",
      industry: "Lawyer",
      situation:
        "Files arrive at your desk with same-day court deadlines. Your courier promises next-day.",
      specificDetail:
        "So you're calling around at 1:45pm trying to find someone who can guarantee 2pm pickup → courthouse by close of business.",
      variabilityStatement: "Sometimes it works. Sometimes it doesn't.",
      timeframe: "Tuesday",
    },
    {
      pressureType: "Time-Critical Movement",
      industry: "Pharmacy",
      situation:
        "Prescription orders arrive during 10am rush with tight delivery windows. Your courier gaps create customer panic.",
      specificDetail:
        "Customers call asking 'can you get this there by noon?' and you're scrambling to find coverage.",
      variabilityStatement: "Some days you solve it. Some days they go to competitors.",
      timeframe: "morning",
    },
    {
      pressureType: "Time-Critical Movement",
      industry: "Laboratory",
      situation:
        "Lab samples arrive with same-day analysis deadlines. Courier gaps mean missed test windows.",
      specificDetail:
        "You're calling around at 2pm trying to guarantee 3pm sample delivery to avoid overnight delays.",
      variabilityStatement:
        "Sometimes samples arrive in time. Sometimes tests slip to next day.",
      timeframe: "afternoon",
    },
    {
      pressureType: "Time-Critical Movement",
      industry: "Veterinary",
      situation:
        "Emergency animal transport arrives with same-day delivery requirements. Courier delays mean animal suffering.",
      specificDetail:
        "You're coordinating pickups at 1:30pm trying to guarantee next-clinic arrival by 3pm.",
      variabilityStatement:
        "Some emergencies you handle smoothly. Some you have to turn away.",
      timeframe: "day",
    },
    {
      pressureType: "Time-Critical Movement",
      industry: "Medical Device",
      situation:
        "Urgent parts shipments for equipment repairs arrive with 4-hour service windows. Delays cost reputation.",
      specificDetail:
        "You're coordinating with couriers at 9am trying to guarantee 12pm arrival before customer deadlines hit.",
      variabilityStatement:
        "Some deliveries make the window. Some delay customer surgeries.",
      timeframe: "morning",
    },
  ],

  "Bulk Distribution Coordination": [
    {
      pressureType: "Bulk Distribution Coordination",
      industry: "Food Distributor",
      situation:
        "Restaurant supply chains require coordinated multi-location delivery. Timing misses waste product.",
      specificDetail:
        "You're coordinating deliveries across 30 restaurants weekly and managing returns.",
      variabilityStatement:
        "Some weeks deliveries go smoothly. Some weeks you waste deliveries due to coordination gaps.",
      timeframe: "week",
    },
    {
      pressureType: "Bulk Distribution Coordination",
      industry: "Retail Distributor",
      situation:
        "Store replenishment requires synchronized timing. Late deliveries create empty shelves.",
      specificDetail:
        "You're managing 50+ store delivery schedules and optimizing routes manually.",
      variabilityStatement:
        "Some weeks inventory is balanced. Some weeks stores are understocked.",
      timeframe: "week",
    },
  ],

  "Reverse Logistics": [
    {
      pressureType: "Reverse Logistics",
      industry: "E-Commerce",
      situation:
        "Product returns are chaotic. You're managing returns logistics without process.",
      specificDetail:
        "You're picking up returns from customers' homes and managing reinventory manually.",
      variabilityStatement:
        "Some returns get processed quickly. Some sit for weeks.",
      timeframe: "week",
    },
    {
      pressureType: "Reverse Logistics",
      industry: "Equipment Rental",
      situation:
        "Equipment returns from job sites are uncoordinated. Items go missing or get damaged.",
      specificDetail:
        "You're tracking down equipment manually and managing damage assessments.",
      variabilityStatement:
        "Some returns come back on time. Some disappear.",
      timeframe: "month",
    },
  ],

  "Cross-Location Coordination": [
    {
      pressureType: "Cross-Location Coordination",
      industry: "Manufacturing",
      situation:
        "Parts must move between factories. Coordination gaps halt production lines.",
      specificDetail:
        "You're manually coordinating inter-facility moves and managing timing gaps.",
      variabilityStatement:
        "Some transfers are smooth. Some cause production delays.",
      timeframe: "week",
    },
    {
      pressureType: "Cross-Location Coordination",
      industry: "Pharmacy Chain",
      situation:
        "Medicine redistribution between locations must be coordinated precisely. Gaps create stockouts.",
      specificDetail:
        "You're managing inventory transfers manually across 20+ locations.",
      variabilityStatement:
        "Some locations balance supply. Some run out while others overstock.",
      timeframe: "week",
    },
  ],

  "Emergency Response Logistics": [
    {
      pressureType: "Emergency Response Logistics",
      industry: "Roadside Assistance",
      situation:
        "Breakdowns happen unpredictably. Dispatch times are inconsistent.",
      specificDetail:
        "You're manually dispatching technicians and trying to minimize wait times.",
      variabilityStatement:
        "Some calls get rapid response. Some wait hours.",
      timeframe: "day",
    },
    {
      pressureType: "Emergency Response Logistics",
      industry: "Emergency Plumbing",
      situation:
        "Emergency calls come at random times. Dispatch chaos during peak hours.",
      specificDetail:
        "You're managing same-day emergency scheduling manually.",
      variabilityStatement:
        "Some emergencies get same-day service. Some wait until next day.",
      timeframe: "day",
    },
  ],

  // PRESCRIPTIONS / ORDERS
  "Prescription Processing Delays": [
    {
      pressureType: "Prescription Processing Delays",
      industry: "Pharmacy",
      situation:
        "Prescription verification takes hours. Patients wait while you call doctors.",
      specificDetail:
        "You're manually verifying prescriptions by phone while customers wait.",
      variabilityStatement:
        "Some prescriptions verify quickly. Some require 10+ calls to doctors' offices.",
      timeframe: "day",
    },
    {
      pressureType: "Prescription Processing Delays",
      industry: "Medical Practice",
      situation:
        "Refill requests pile up. Patients get frustrated waiting for authorization.",
      specificDetail:
        "You're processing refill requests manually and managing patient follow-ups.",
      variabilityStatement:
        "Some refills process immediately. Some take days of back-and-forth.",
      timeframe: "day",
    },
  ],

  "Order Processing Complexity": [
    {
      pressureType: "Order Processing Complexity",
      industry: "Custom Manufacturing",
      situation:
        "Custom orders require manual spec verification. Errors cascade through production.",
      specificDetail:
        "You're manually checking orders and managing back-and-forth clarification with customers.",
      variabilityStatement:
        "Some orders have clear specs. Some require 5+ revision rounds.",
      timeframe: "week",
    },
    {
      pressureType: "Order Processing Complexity",
      industry: "B2B Commerce",
      situation:
        "Complex orders with multiple SKUs require validation. Manual processing delays fulfillment.",
      specificDetail:
        "You're validating stock availability and confirming specs manually.",
      variabilityStatement:
        "Simple orders ship next day. Complex orders take a week.",
      timeframe: "week",
    },
  ],

  // DELIVERIES
  "Delivery Reliability": [
    {
      pressureType: "Delivery Reliability",
      industry: "Manufacturing",
      situation:
        "Parts deliveries are unreliable. Production lines sit idle waiting for supplies.",
      specificDetail:
        "You're coordinating with 5+ suppliers trying to guarantee on-time delivery.",
      variabilityStatement:
        "Sometimes parts arrive on schedule. Sometimes you have production gaps.",
      timeframe: "week",
    },
    {
      pressureType: "Delivery Reliability",
      industry: "Construction",
      situation:
        "Material delivery delays push project timelines. Crews sit idle waiting for supplies.",
      specificDetail:
        "You're coordinating deliveries across multiple job sites and juggling contractor schedules.",
      variabilityStatement:
        "Some deliveries arrive on time. Some delay projects by weeks.",
      timeframe: "week",
    },
    {
      pressureType: "Delivery Reliability",
      industry: "Restaurant",
      situation:
        "Supplier deliveries are unpredictable. Menu planning gets derailed.",
      specificDetail:
        "You're adjusting menus daily based on what actually arrived from suppliers.",
      variabilityStatement:
        "Some suppliers are reliable. Some deliver incomplete orders.",
      timeframe: "day",
    },
  ],

  "Proof-of-Delivery Visibility": [
    {
      pressureType: "Proof-of-Delivery Visibility",
      industry: "Courier Service",
      situation:
        "Customers demand proof-of-delivery. Your manual system creates disputes.",
      specificDetail:
        "You're handling customer complaints about missing POD signatures.",
      variabilityStatement:
        "Most deliveries have POD. Some drivers forget signatures.",
      timeframe: "week",
    },
    {
      pressureType: "Proof-of-Delivery Visibility",
      industry: "Pharmacy Delivery",
      situation:
        "Controlled substance delivery requires verified proof-of-delivery. Compliance is manual.",
      specificDetail:
        "You're tracking signatures and managing regulatory compliance manually.",
      variabilityStatement:
        "Most deliveries have proper documentation. Some audits reveal gaps.",
      timeframe: "month",
    },
  ],

  // APPOINTMENTS
  "Appointment Scheduling Friction": [
    {
      pressureType: "Appointment Scheduling Friction",
      industry: "Dentist",
      situation:
        "You book 4 weeks out. Emergency patients walk to competitors. Revenue walks with them.",
      specificDetail:
        "You're turning away same-week appointments and losing patients who can't wait.",
      variabilityStatement:
        "Some weeks you have gaps. Some weeks you're fully booked with no flexibility.",
      timeframe: "week",
    },
    {
      pressureType: "Appointment Scheduling Friction",
      industry: "Hair Salon",
      situation:
        "Popular stylists book 3+ weeks out. Customers leave if they can't get their preferred person.",
      specificDetail:
        "You're manually trying to stagger bookings and watching revenue leak to competitors with availability.",
      variabilityStatement:
        "Some stylists have dead gaps. Some are overbooked for months.",
      timeframe: "month",
    },
    {
      pressureType: "Appointment Scheduling Friction",
      industry: "Barber",
      situation:
        "Walk-ins clog the schedule while online bookings conflict with manual slots.",
      specificDetail:
        "You're juggling customers at the door while losing online bookings to competitors with clear availability.",
      variabilityStatement:
        "Some days you're fully booked with walk-ins. Some days you have empty chairs.",
      timeframe: "day",
    },
  ],

  "No-Show and Cancellation Losses": [
    {
      pressureType: "No-Show and Cancellation Losses",
      industry: "Medical Practice",
      situation:
        "No-shows cost you 30% of appointment slots. Revenue leaks silently.",
      specificDetail:
        "You're manually calling patients the day before to reduce no-shows.",
      variabilityStatement:
        "Some slots fill. Some patients ghost and you lose revenue.",
      timeframe: "week",
    },
    {
      pressureType: "No-Show and Cancellation Losses",
      industry: "Physical Therapy",
      situation:
        "No-shows waste treatment slots. Double-bookings create staff chaos.",
      specificDetail:
        "You're manually confirming appointments and reallocating therapist time reactively.",
      variabilityStatement:
        "Some slots stay empty. Some therapists are overbooked with back-to-back sessions.",
      timeframe: "day",
    },
    {
      pressureType: "No-Show and Cancellation Losses",
      industry: "Optician",
      situation:
        "Appointment slots fill with no-shows. Revenue leaks from unused capacity.",
      specificDetail:
        "You're doing manual reminder calls 24 hours before to reduce no-show rates.",
      variabilityStatement:
        "Some weeks no-shows are low. Some weeks they spike.",
      timeframe: "week",
    },
  ],

  // EXPERIENCE STUCKNESS
  "Communication Breakdown": [
    {
      pressureType: "Communication Breakdown",
      industry: "Design Agency",
      situation:
        "Client approvals stall projects. Design iterations happen offline in email chains.",
      specificDetail:
        "You're managing feedback across Slack, email, and meetings while projects miss deadlines.",
      variabilityStatement:
        "Some clients give clear feedback quickly. Some drag reviews out for weeks.",
      timeframe: "week",
    },
    {
      pressureType: "Communication Breakdown",
      industry: "Construction",
      situation:
        "Site updates are chaotic. Managers, crews, and customers can't sync.",
      specificDetail:
        "You're managing status updates across multiple channels.",
      variabilityStatement:
        "Some days everyone is aligned. Some days people are frustrated by confusion.",
      timeframe: "day",
    },
  ],

  "Visibility and Tracking Gaps": [
    {
      pressureType: "Visibility and Tracking Gaps",
      industry: "E-Commerce",
      situation:
        "Customers don't know where their orders are. Status tracking is manual.",
      specificDetail:
        "You're sending manual email updates and customers are asking constantly.",
      variabilityStatement:
        "Some customers are satisfied with silence. Some demand hourly updates.",
      timeframe: "day",
    },
    {
      pressureType: "Visibility and Tracking Gaps",
      industry: "Field Service",
      situation:
        "Customers don't know when the technician is arriving. Dispatch transparency is zero.",
      specificDetail:
        "You're not providing real-time visibility and customers call constantly asking 'where are you?'",
      variabilityStatement:
        "Some customers accept estimates. Some demand real-time tracking.",
      timeframe: "day",
    },
  ],

  "Issue Resolution Speed": [
    {
      pressureType: "Issue Resolution Speed",
      industry: "Customer Support",
      situation:
        "Problem resolution takes days. Ticket handoffs create delays.",
      specificDetail:
        "You're manually routing tickets and watching resolution times climb.",
      variabilityStatement:
        "Some issues resolve in hours. Some drag for weeks.",
      timeframe: "week",
    },
    {
      pressureType: "Issue Resolution Speed",
      industry: "Logistics",
      situation:
        "Delivery problems require manual investigation. Customers wait for answers.",
      specificDetail:
        "You're manually tracing shipments and calling carriers to resolve customer issues.",
      variabilityStatement:
        "Some issues are resolved quickly. Some require days of back-and-forth.",
      timeframe: "day",
    },
  ],

  // CROSS-CUTTING
  "Inventory Friction": [
    {
      pressureType: "Inventory Friction",
      industry: "Retail",
      situation:
        "Inventory sits in the wrong warehouse. Customer orders arrive but stock isn't where you need it.",
      specificDetail:
        "You're redistributing stock across locations weekly trying to match demand patterns.",
      variabilityStatement:
        "Some days you have it in stock. Some days customers wait or leave.",
      timeframe: "week",
    },
    {
      pressureType: "Inventory Friction",
      industry: "Restaurant",
      situation:
        "Food spoilage from overstock mixed with stockouts during peak service. Margins disappear.",
      specificDetail:
        "You're guessing ingredient volumes for each location and managing waste daily.",
      variabilityStatement:
        "Some locations run tight. Some waste thousands on excess stock.",
      timeframe: "shift",
    },
    {
      pressureType: "Inventory Friction",
      industry: "Automotive",
      situation:
        "Popular parts stock out while slow-movers pile up. Customers wait weeks or go to competitors.",
      specificDetail:
        "You're manually forecasting demand from technician schedules and reordering reactively.",
      variabilityStatement:
        "Some months you have coverage. Some months you disappoint customers.",
      timeframe: "week",
    },
  ],

  "Staff and Resource Constraints": [
    {
      pressureType: "Staff and Resource Constraints",
      industry: "Healthcare",
      situation:
        "Nurses and doctors burn out from understaffing. Turnover creates coverage gaps and more burnout.",
      specificDetail:
        "You're manually covering shifts, losing staff to competitors, and struggling to attract quality replacements.",
      variabilityStatement:
        "Some units are stable. Some have 3+ open positions and double-shift staff.",
      timeframe: "month",
    },
    {
      pressureType: "Staff and Resource Constraints",
      industry: "Hospitality",
      situation:
        "Restaurant staff quit during peak season. Remaining team works 60+ hour weeks.",
      specificDetail:
        "You're working doubles yourself and watching service quality tank as tired staff make mistakes.",
      variabilityStatement:
        "Summer service is chaos. Winter allows team recovery.",
      timeframe: "season",
    },
  ],

  "Workflow and Process Bottlenecks": [
    {
      pressureType: "Workflow and Process Bottlenecks",
      industry: "Accounting",
      situation:
        "Tax season crunch creates spreadsheet chaos. Manual data entry and validation bottleneck audits.",
      specificDetail:
        "You're managing Excel files across teams and watching human errors delay client deliverables.",
      variabilityStatement:
        "Off-season is manageable. Tax season is mayhem.",
      timeframe: "season",
    },
    {
      pressureType: "Workflow and Process Bottlenecks",
      industry: "Legal Services",
      situation:
        "Case file organization is chaotic. Lawyers waste hours searching for documents.",
      specificDetail:
        "You're managing version control manually and clients ask for documents you can't quickly locate.",
      variabilityStatement:
        "Some cases are organized. Some case files are nightmares.",
      timeframe: "week",
    },
  ],
};

/**
 * Get a situation for a specific pressure type and industry
 */
export function getSituation(
  pressureType: string,
  industry: string
): PressureSituation | undefined {
  const situations = PRESSURE_SITUATIONS[pressureType];
  if (!situations) return undefined;

  let situation = situations.find((s) => s.industry === industry);
  if (!situation) {
    situation = situations[0];
  }

  return situation;
}

/**
 * Get all industries for a pressure type
 */
export function getIndustriesForPressure(pressureType: string): string[] {
  const situations = PRESSURE_SITUATIONS[pressureType];
  return situations ? situations.map((s) => s.industry) : [];
}

/**
 * Get all pressure types
 */
export function getAllPressureTypes(): string[] {
  return Object.keys(PRESSURE_SITUATIONS);
}

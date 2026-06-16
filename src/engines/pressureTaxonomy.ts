import { PressureType } from "@/modules/types";

export const PRESSURE_TAXONOMY: PressureType[] = [
  {
    id: "prescription-fulfilment",
    name: "Prescription Fulfilment",
    definition:
      "Delays or inaccuracies in processing and delivering prescriptions to patients",
    symptoms: [
      "Patient complaints about wait times",
      "Prescription fulfillment backlog",
      "Manual processing errors",
      "Regulatory compliance issues",
      "Staff overtime due to volume",
    ],
    affectedIndustries: [
      "Pharmacies",
      "Healthcare Clinics",
      "Pharmacy Distribution",
      "Medical Supply Companies",
    ],
  },
  {
    id: "inventory-friction",
    name: "Inventory Friction",
    definition:
      "Difficulty managing stock levels, tracking inventory, and fulfilling orders efficiently",
    symptoms: [
      "Frequent stockouts",
      "Overstocking of slow-moving items",
      "Manual inventory counts",
      "Inaccurate inventory records",
      "Delayed order fulfillment",
    ],
    affectedIndustries: [
      "Retail",
      "Wholesale Distribution",
      "Manufacturing",
      "E-commerce",
      "Warehousing",
    ],
  },
  {
    id: "customer-wait-time",
    name: "Customer Wait Time",
    definition:
      "Long queues, delays in service delivery, and customer frustration from waiting",
    symptoms: [
      "Customer complaints about wait times",
      "Peak-hour bottlenecks",
      "Limited service capacity",
      "Declining customer satisfaction",
      "Abandonment of transactions",
    ],
    affectedIndustries: [
      "Retail",
      "Healthcare",
      "Hospitality",
      "Government Services",
      "Service Centers",
    ],
  },
  {
    id: "appointment-backlog",
    name: "Appointment Backlog",
    definition:
      "Inability to schedule appointments promptly, leading to customer dissatisfaction",
    symptoms: [
      "Weeks-long appointment waiting lists",
      "Manual scheduling processes",
      "Double-booking incidents",
      "Customer calls asking about availability",
      "Lost appointments due to admin errors",
    ],
    affectedIndustries: [
      "Healthcare",
      "Salons & Spas",
      "Legal Services",
      "Automotive Service",
      "Professional Services",
    ],
  },
  {
    id: "delivery-reliability",
    name: "Delivery Reliability Pressure",
    definition:
      "Missed deliveries, late arrivals, and inconsistent delivery performance",
    symptoms: [
      "Missed scheduled deliveries",
      "Customer complaints about late arrivals",
      "Driver route inefficiencies",
      "Lack of real-time tracking",
      "Last-mile delivery challenges",
    ],
    affectedIndustries: [
      "E-commerce",
      "Logistics",
      "Food Delivery",
      "Pharmacy Delivery",
      "Furniture & Appliances",
    ],
  },
  {
    id: "capacity-overflow",
    name: "Capacity Overflow",
    definition:
      "Operations exceeding maximum capacity, leading to service degradation",
    symptoms: [
      "System crashes during peak demand",
      "Staff burnout from overwork",
      "Quality drops due to rushing",
      "Inability to take new business",
      "Emergency overtime costs",
    ],
    affectedIndustries: [
      "Manufacturing",
      "Logistics",
      "Healthcare",
      "Hospitality",
      "Call Centers",
    ],
  },
  {
    id: "time-critical-logistics",
    name: "Time-Critical Logistics Pressure",
    definition:
      "Need for fast, reliable logistics for time-sensitive operations",
    symptoms: [
      "Perishable goods spoilage",
      "Time-window delivery failures",
      "Temperature control issues",
      "Compliance violations",
      "Customer refunds due to lateness",
    ],
    affectedIndustries: [
      "Food & Beverage",
      "Pharmaceuticals",
      "Fresh Produce",
      "Medical Device Distribution",
      "Cold Chain Logistics",
    ],
  },
];

export function getPressureTaxonomy(): PressureType[] {
  return PRESSURE_TAXONOMY;
}

export function getPressureByName(name: string): PressureType | undefined {
  return PRESSURE_TAXONOMY.find((p) => p.name === name);
}

export function getPressureById(id: string): PressureType | undefined {
  return PRESSURE_TAXONOMY.find((p) => p.id === id);
}

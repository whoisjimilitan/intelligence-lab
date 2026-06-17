# Intelligence Lab: Real Production Architecture

**Intelligence Lab replaces Saint & Story's B2B sales pipeline. It is NOT an agent-powered system. It is a deterministic, rules-based platform.**

---

## Core Philosophy

**NO Claude Agent Calls at Runtime**
- Cost: Claude API calls at scale = too expensive
- Control: Need deterministic logic (same input = same output, always)
- Speed: Rules-based is instant, not API-latency-dependent
- Reliability: Zero external dependencies for core logic

**Everything runs on rules, data, and templates.**

---

## Architecture: Three Layers

### Layer 1: DETECTION (Rules-Based)

**Input:** Business data (industry, location, website, reviews)

**Process:** Classification engine
- Industry + location → look up likely pressures
- Review keywords → signal specific pressures
- Size signals (employees, locations) → pressure patterns
- Website inspection → operational signals

**Rules DB:**
```
IF industry = "Pharmacy" AND location contains "London" AND employee_count < 20
  THEN likely_pressures = [
    "Time-Critical Movement",
    "Appointment Flow",
    "Customer Churn"
  ]
```

**Output:**
```json
{
  "businessId": "pharm-001",
  "detectedPressures": [
    {
      "pressureType": "Time-Critical Movement",
      "signals": ["small staff", "multiple deliveries daily"],
      "confidence": 0.82
    }
  ]
}
```

**Note:** No Claude. Pure rule evaluation. Fast. Deterministic.

---

### Layer 2: QUALIFICATION (Scoring)

**Input:** Detected pressure + business data

**Process:** Three-dimension scoring
```
Psychological Fit (0-1):
  IF business_type = "Service" THEN +0.3
  IF multi_location = true THEN +0.2
  IF online_review_sentiment = "frustrated" THEN +0.3
  (Max 1.0)

Commercial Fit (0-1):
  IF employee_count > 50 THEN +0.4
  IF revenue_estimate > £1M THEN +0.3
  IF growing = true THEN +0.3
  (Max 1.0)

Logistics Fit (0-1):
  IF distance_to_depot < 20_miles THEN +0.5
  IF business_type in our_serviceable_verticals THEN +0.5
  (Max 1.0)

Overall = (Psych + Commercial + Logistics) / 3
```

**Threshold:** 65% (0.65) required to show operator

**Output:**
```json
{
  "businessId": "pharm-001",
  "pressureType": "Time-Critical Movement",
  "scores": {
    "psychological": 0.85,
    "commercial": 0.72,
    "logistics": 0.78,
    "overall": 0.78
  },
  "qualified": true,
  "reason": "Meets 65% threshold. Service business, multi-location, frustrated reviews, profitable, within depot range."
}
```

---

### Layer 3: EMAIL GENERATION (Template Engine)

**Input:** Pressure type + business data

**Process:** Template lookup + variable substitution

```
Template for "Time-Critical Movement" + "Pharmacy":

I need you to answer this honestly:

Some pharmacies in {{location}} say {{situation}}.

{{specific_detail}}

{{variability}}

Sound like your {{timeframe}}?

[YES] [NO]
```

**Variable Lookup:**

```json
{
  "pressureType": "Time-Critical Movement",
  "industry": "Pharmacy",
  "location": "London",
  "template_vars": {
    "situation": "prescription orders arrive during 10am rush with tight delivery windows, and courier gaps create customer panic",
    "specific_detail": "You're probably calling asking 'can you get this there by noon?' and scrambling to find coverage",
    "variability": "Some days you solve it. Some days they go to competitors.",
    "timeframe": "morning"
  }
}
```

**Output Email:**
```
I need you to answer this honestly:

Some pharmacies in London say prescription orders arrive during 
10am rush with tight delivery windows, and courier gaps create 
customer panic.

You're probably calling asking "can you get this there by noon?" 
and scrambling to find coverage.

Some days you solve it. Some days they go to competitors.

Sound like your morning?

[YES] [NO]
```

**Note:** No generation. Pure template substitution. Deterministic. Fast. Consistent.

---

## Data Layer: PostgreSQL Schema

### core_businesses
```sql
CREATE TABLE core_businesses (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  location VARCHAR(255),
  postcode VARCHAR(10),
  employee_count INT,
  revenue_estimate INT,
  website VARCHAR(500),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  -- Classification
  detected_pressures JSONB, -- [{pressureType, confidence}]
  psychological_fit DECIMAL(3,2),
  commercial_fit DECIMAL(3,2),
  logistics_fit DECIMAL(3,2),
  overall_fit DECIMAL(3,2),
  qualified BOOLEAN,
  -- Tracking
  last_contacted TIMESTAMP,
  contact_count INT DEFAULT 0
);
```

### outreach_emails
```sql
CREATE TABLE outreach_emails (
  id UUID PRIMARY KEY,
  business_id UUID REFERENCES core_businesses(id),
  pressure_type VARCHAR(100),
  email_subject VARCHAR(255),
  email_body TEXT,
  template_vars JSONB,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  response_type VARCHAR(10), -- 'YES', 'NO', NULL
  responded_at TIMESTAMP,
  created_at TIMESTAMP
);
```

### learning_metrics
```sql
CREATE TABLE learning_metrics (
  id UUID PRIMARY KEY,
  pressure_type VARCHAR(100),
  industry VARCHAR(100),
  emails_sent INT DEFAULT 0,
  responses_yes INT DEFAULT 0,
  responses_no INT DEFAULT 0,
  yes_rate DECIMAL(5,2), -- percentage
  conversion_rate DECIMAL(5,2), -- percentage
  updated_at TIMESTAMP,
  UNIQUE(pressure_type, industry)
);
```

---

## API Layer: Deterministic Endpoints

### POST /api/analyze
```
Input:
{
  "name": "Morrison's Pharmacy",
  "industry": "Pharmacy",
  "location": "London, UK",
  "postcode": "M1 1AA",
  "website": "www.morrisons-pharmacy.co.uk",
  "employee_count": 15,
  "revenue_estimate": 1500000
}

Processing:
1. Apply classification rules → detect pressures
2. Apply qualification rules → score fit
3. Query outreach_emails for deduplication
4. Return qualified opportunities

Output:
{
  "businessId": "uuid",
  "detectedPressures": [{pressureType, signals, confidence}],
  "qualified": true,
  "overallFit": 0.78,
  "reason": "...",
  "email": {
    "subject": "...",
    "body": "..."
  }
}
```

### POST /api/send-email
```
Input:
{
  "businessId": "uuid",
  "pressureType": "Time-Critical Movement"
}

Processing:
1. Lookup business from core_businesses
2. Generate email from template
3. Insert into outreach_emails
4. ACTUALLY SEND via SendGrid/Mailgun
5. Update business.last_contacted, contact_count

Output:
{
  "emailId": "uuid",
  "sent_at": "2025-01-15T10:30:00Z",
  "status": "sent"
}
```

### POST /api/respond
```
Input:
{
  "emailId": "uuid",
  "response": "YES"
}

Processing:
1. Lookup outreach_email
2. Record response_type, responded_at
3. Update learning_metrics
  - Find pressure_type + industry row
  - increment responses_yes or responses_no
  - recalculate yes_rate, conversion_rate

Output:
{
  "success": true,
  "message": "Response recorded"
}
```

### GET /api/metrics
```
Output:
{
  "overall": {
    "emailsSent": 47,
    "responsesYes": 6,
    "responsesNo": 2,
    "yesRate": 75%,
    "conversionRate": 13%
  },
  "byPressureType": [
    {
      "pressureType": "Time-Critical Movement",
      "emailsSent": 21,
      "responsesYes": 5,
      "conversionRate": 24%
    },
    {
      "pressureType": "Capacity Overflow",
      "emailsSent": 18,
      "responsesYes": 1,
      "conversionRate": 6%
    }
  ]
}
```

---

## Key Rules Engines

### Pressure Detection Rules

**Time-Critical Movement:**
```
IF (
  (industry in ["Pharmacy", "Lab", "Lawyer", "Vet"]) AND
  (business_type = "Service") AND
  (has_multiple_locations OR employee_count > 5)
) THEN confidence = 0.85
```

**Capacity Overflow:**
```
IF (
  (industry in ["Dentist", "Salon", "Clinic"]) AND
  (website mentions "book" OR "appointment" OR "schedule") AND
  (review_sentiment contains ["wait", "backlog", "can't get in", "booked out"])
) THEN confidence = 0.78
```

**Inventory Friction:**
```
IF (
  (industry in ["Retail", "Restaurant", "Auto"]) AND
  (multi_location = true OR employee_count > 20) AND
  (review_sentiment contains ["out of stock", "inconsistent", "availability"])
) THEN confidence = 0.72
```

*Add 46 such rules (one per pressure type)*

---

## Learning Loop (Deterministic)

**Every Time User Responds YES/NO:**

```sql
UPDATE learning_metrics
SET
  responses_yes = responses_yes + CASE WHEN response='YES' THEN 1 ELSE 0 END,
  responses_no = responses_no + CASE WHEN response='NO' THEN 1 ELSE 0 END,
  yes_rate = (responses_yes::DECIMAL / (responses_yes + responses_no)) * 100,
  conversion_rate = (responses_yes::DECIMAL / emails_sent) * 100,
  updated_at = NOW()
WHERE pressure_type = ? AND industry = ?
```

**Result:**
- Week 1: Time-Critical Movement = 8% conversion
- Week 2: Time-Critical Movement = 12% conversion (as data accumulates)
- Operator sees trending: which pressures convert
- Next batch prioritizes high-converting pressures

---

## No Magic, No Agents

### Traditional (Broken):
```
Operator → Sales person → Guess → Cold email → 2% response
```

### Intelligence Lab (Deterministic):
```
Database (rules) → Scoring engine → Template → YES/NO tracking → Learning
Operator sees: ranked qualified leads + high-converting pressures
```

**Everything is:**
- ✅ Auditable (can trace any decision to a rule)
- ✅ Fast (no API latency)
- ✅ Cost-efficient (no per-call charges)
- ✅ Reproducible (same input = same output)
- ✅ Learnable (YES/NO data improves targeting)

---

## Technology Stack

**Frontend:**
- Next.js 15.5 (App Router)
- TypeScript
- Tailwind CSS

**Backend:**
- Next.js API routes
- Rules engine (TypeScript, embedded in API)
- PostgreSQL (via Prisma or Drizzle)
- Email service (SendGrid/Mailgun)

**Deployment:**
- Vercel (frontend + API)
- Postgres (AWS RDS or Neon)
- Email provider (SendGrid)

**No Claude. No agents. All deterministic.**

---

## Roadmap: From Rules to Learning

### Phase 1 (Now)
- Manual detection rules (hardcoded)
- Static scoring
- Template emails
- YES/NO tracking

### Phase 2
- Rule builder UI (product team manages rules without code)
- Dynamic industry mapping
- A/B testing framework

### Phase 3
- Pattern discovery from YES/NO data
- Automatic rule suggestions
- Pressure sub-type discovery

### Phase 4
- Operator feedback loop (flag "wrong pressure")
- Rule refinement from corrections
- Continuous learning

---

## Success Metrics

**NOT:**
- API latency
- Cost per lead
- Automation percentage

**YES:**
- YES response rate (which pressures work?)
- Operator adoption (postcodes searched/week)
- Decision velocity (time from search to send)
- Pressure type ranking stability (which pressures consistently convert?)

---

## Build Checklist

- [ ] Define all 46 pressure types with 2-4 rule sets each
- [ ] Build classification engine (rules → pressures)
- [ ] Build scoring engine (3D fit scoring)
- [ ] Define all 46 email templates + variables
- [ ] Design database schema
- [ ] Build API: /analyze, /send-email, /respond, /metrics
- [ ] Build operator UI: Decision Screen, Company View, Reporting
- [ ] Integrate email provider (SendGrid)
- [ ] Build learning loop (YES/NO → metrics)
- [ ] Train on real data (launch with manual mode first)
- [ ] Monitor metrics for 30 days
- [ ] Refine rules based on learning
- [ ] Launch autonomous mode (nightly scan)

---

## This Is Your Real B2B Pipeline

Intelligence Lab is **not a research project with Claude**. It is **the system that replaces manual B2B outreach**.

Every operator at Saint & Story will use this daily.
Every pressure type will generate measurable response data.
Every YES/NO will improve targeting.

No magic. Just rules, data, and learning.

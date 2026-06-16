# Intelligence Lab — Operational Friction Market Analysis

A decision intelligence simulator for discovering operational friction conversion opportunities in local markets.

## What This Is

Intelligence Lab is a **completely isolated, educational project** that demonstrates how to:
- Scan markets for operational pressure clusters
- Calculate buying probability based on multiple factors
- Generate strategically sound recommendations (ACT/WATCH/IGNORE)
- Simulate recognition messaging
- Run multi-dimensional stress tests

## What This Is NOT

🚫 This is NOT:
- A CRM system
- An outreach automation platform
- Connected to production systems or real customer data
- Sending emails or contacting businesses
- Tracking real revenue or conversions
- Using real external APIs

## Architecture

### Phase 1: Core Data Model (`src/modules/types.ts`)
Defines TypeScript interfaces for all intelligence entities.

### Phase 2: Pressure Taxonomy (`src/engines/pressureTaxonomy.ts`)
Hardcoded taxonomy of 7 operational pressure types:
- Prescription Fulfilment
- Inventory Friction
- Customer Wait Time
- Appointment Backlog
- Delivery Reliability
- Capacity Overflow
- Time-Critical Logistics

### Phase 3: Market Scanner (`src/engines/marketScanner.ts`)
Scans postcode areas for industry clusters and pressure opportunities. Uses mock data by default, accepts CSV upload for custom data.

### Phase 4: Buying Probability Engine (`src/engines/buyingProbability.ts`)
Computes probability = pressure_intensity × urgency × logistics_fit × market_similarity

### Phase 5: Decision Engine (`src/engines/decisionEngine.ts`)
Generates ACT/WATCH/IGNORE decisions with reasoning and expected outcomes.

### Phase 6: Recognition Simulator (`src/engines/recognitionSimulator.ts`)
Generates simulated outreach messages with fit scores (psychological, commercial, logistics).

### Phase 7: Stress Test Engine (`src/engines/stressTest.ts`)
Evaluates opportunity safety across 3 dimensions:
- **Psychological**: helpful vs creepy, clarity, trust
- **Commercial**: urgency, budget likelihood, decision accessibility
- **Behavioral**: likelihood of action in 7 days

### UI Implementation
Three screens:
1. **Postcode Search** — Enter postcode, see opportunity clusters
2. **CSV Upload** — Upload custom business dataset
3. **Opportunity Detail** — Full analysis with all engines' output + "Why This Was Surfaced" panel

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
  app/
    page.tsx                 # Postcode search homepage
    upload/page.tsx          # CSV upload page
    opportunity/page.tsx     # Opportunity detail page
    layout.tsx
    globals.css
  components/
    PostcodeSearch.tsx       # Postcode input component
    OpportunityCard.tsx      # Opportunity summary card
    OpportunityDetail.tsx    # Full opportunity breakdown
  engines/
    pressureTaxonomy.ts      # Pressure definitions
    marketScanner.ts         # Market scanning logic
    buyingProbability.ts     # Probability calculation
    decisionEngine.ts        # Decision logic
    recognitionSimulator.ts  # Message generation
    stressTest.ts            # Safety evaluation
  modules/
    types.ts                 # TypeScript interfaces
  lib/
    opportunityOrchestrator.ts # Orchestrates all engines
```

## Features

### Every opportunity output includes:
✓ Pressure cluster name and affected business count
✓ Buying probability calculation
✓ ACT/WATCH/IGNORE decision with reasoning
✓ Expected engagement and conversion rates
✓ Simulated recognition message
✓ Psychological, commercial, and logistics fit scores
✓ Stress test results (safe to surface: yes/no)
✓ "Why This Was Surfaced" narrative panel

### Design Rule (PHASE 10)
Every output includes the **"Why This Was Surfaced"** panel, explaining:
- Matched known conversion clusters?
- High urgency signals?
- Strong logistics fit?
- Market similarity indicators?

## Constraints (PHASE 11 — Forbidden Features)

❌ NO:
- CRM functionality
- Outreach automation
- Email sending
- Production integrations
- Revenue tracking
- Customer accounts
- Authentication systems
- External API calls

## Success Criteria (PHASE 12)

✅ Project is complete when:
- [x] Postcode → pressure clusters works
- [x] CSV → clusters works
- [x] Decision engine always outputs ACT/WATCH/IGNORE
- [x] Buying probability visible everywhere
- [x] Recognition simulation generates believable output
- [x] Stress test layer exists on all outputs
- [x] Zero production dependencies
- [x] All phases implemented and functional

## Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js / Vercel
- **Data**: Mock database + CSV upload

## License

Educational use only. No production deployment.

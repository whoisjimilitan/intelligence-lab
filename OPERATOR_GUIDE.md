# Intelligence Lab: Complete Operator Guide

**Everything you need to know to use Intelligence Lab effectively.**

---

## What Intelligence Lab Does (In One Sentence)

It finds businesses experiencing specific operational pressures, generates personalized recognition emails that make them feel understood, and learns which pressure types convert to conversation.

---

## The Problem It Solves

### Before Intelligence Lab (Current B2B Pipeline)

1. You have a list of businesses
2. You send them a cold email: "We move things. Need our help?"
3. 98% don't respond (because they don't feel understood)
4. You don't know which message types actually work

**Result:** Low response rate. High frustration. Low efficiency.

### With Intelligence Lab

1. You search a postcode
2. System detects what operational pressure each business faces
3. System generates a personalized recognition email for that specific pressure
4. Business feels understood (prospect recognizes themselves)
5. They click YES or NO
6. System learns which pressures convert
7. Next batch targets proven high-converting pressures

**Result:** Higher response rate. Efficient targeting. Learning loop.

---

## How It Works: Your Day-To-Day Workflow

### Step 1: Open Intelligence Lab

You open the Decision Screen and see:

```
OPERATIONS
Decision Screen.

POSTCODE
[Enter postcode here]  ← Type M1 1AA

SEARCH RADIUS
[5 miles]  ← Adjust if needed

[Scan Market]  ← Click to search
```

**What it does:**
- Takes your postcode (e.g., "M1 1AA" = Manchester)
- Searches all businesses in that postcode
- Applies classification rules (detects pressures)
- Ranks them by fit score (65% threshold)
- Shows you "Ready to Contact" opportunities

### Step 2: Review Opportunities

System returns:

```
Ready to Contact: 7 opportunities

1. Morrison's Pharmacy
   Time-Critical Movement | 78% fit
   [View & Decide]

2. John Lewis Distribution
   Bulk Distribution | 85% fit
   [View & Decide]

3. Express Courier
   Time-Critical Movement | 72% fit
   [View & Decide]
   
... and 4 more
```

**What each line means:**
- **Name:** Business name (from business registry)
- **Pressure Type:** The operational problem we detected
- **Fit %:** How confident we are they'll recognize the pressure (must be 65%+ to show)
- **Status:** Ready = not yet contacted

**You pick the highest fit first. That's most likely to convert.**

### Step 3: Click "View & Decide"

You see the detailed view:

```
Morrison's Pharmacy
Pharmacy • M1 1AA

Detected Pressure: Time-Critical Movement
Fit Score: 78%
Status: Ready

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email to Send:

I need you to answer this honestly:

Some pharmacies in Manchester say prescription 
orders arrive during 10am rush with tight 
delivery windows, and courier gaps create 
customer panic.

You're probably calling asking "can you get 
this there by noon?" and scrambling to find 
coverage.

Some days you solve it. Some days they go to 
competitors.

Sound like your morning?

[YES] [NO]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact:
Email: manager@morrisons-pharm.co.uk
Phone: 0161 234 5678
Website: www.morrisons-pharmacy.co.uk

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Send Email to Morrison's] [Skip]
```

**What you see:**
- **Detected Pressure:** What operational problem we think they face
- **Fit Score:** Why we think this will resonate (78% = high confidence)
- **Email Preview:** EXACTLY what will be sent (you can't edit, ensures consistency)
- **Contact Details:** Where to reach them if they reply
- **Decision:** Send or Skip

### Step 4: Make a Decision

**Option A: [Send Email]**
- Email is sent immediately
- System records: send time, business ID, pressure type
- Prospect receives recognition email
- They click [YES] or [NO]

**Option B: [Skip]**
- No email sent
- Moves to next opportunity
- Can come back to this business later

### Step 5: Track Responses

Over the next few hours/days:

```
Morrison's Pharmacy
Status: Sent ✓

Opened: Yes (at 10:47 AM)
Clicked: Yes (at 10:52 AM)
Response: [Pending...]
```

When they click YES:

```
Morrison's Pharmacy
Status: YES Response ✓

Prospect confirmed: "Sound like your morning? → YES"
Next: Schedule call or send follow-up info
```

### Step 6: Check Reporting

You go to /admin (Reporting page):

```
OPERATIONS
Reporting.

OUTCOMES

Emails Sent: 47
Conversations Started: 8
Positive Responses (YES): 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS

You have 6 conversations waiting for follow-up.

[→ Scan Another Market]
[→ Follow Up on Replies]
```

**What this tells you:**
- 47 emails sent total
- 8 prospects responded (any response)
- 6 said YES (ready to talk)
- 2 said NO (not their problem)

---

## How Intelligence Lab Detects Pressures

### The Detection Engine

When you search a postcode, here's what happens behind the scenes:

```
Input: Morrison's Pharmacy (Pharmacy, Manchester, 15 employees)

Detection Rules:
IF industry = "Pharmacy" 
   AND location = "Manchester"
   AND employee_count < 20
THEN detect: [
   "Time-Critical Movement" (confidence: 0.82),
   "Prescription Processing Delays" (confidence: 0.71),
   "Delivery Reliability" (confidence: 0.65)
]

Output: Top pressure = "Time-Critical Movement" (82% confident)
```

**No magic here.** It's rule-based classification:
- Your industry
- Your location
- Your size (employees)
- Your website signals
- Your review sentiment

Example rule for "Capacity Overflow":

```
IF (
  industry in ["Dentist", "Salon", "Clinic"] AND
  website mentions ["book", "appointment", "schedule"] AND
  reviews contain ["wait", "backlog", "can't get in", "booked out"]
)
THEN "Capacity Overflow" likely (high confidence)
```

**Key point:** Every pressure detection is deterministic. Same input = same output, always. No guessing.

---

## How It Qualifies Fitness (Why 65%?)

After detecting pressure, system asks: **"Will this prospect actually resonate with our message?"**

Three-dimensional scoring:

### Dimension 1: Psychological Fit
**Question:** Do they actually EXPERIENCE this pressure?

Scoring:
- Service business? +0.3 (vs. product-only)
- Multiple locations? +0.2 (more coordination chaos)
- Frustrated reviews? +0.3 (signals active pain)
- Max score: 1.0 (100%)

**Example:**
- Morrison's Pharmacy: Service business ✓ (0.3), small multi-location ✓ (0.2), reviews mention "tight timeline" ✓ (0.3) = **0.8 (80%)**

### Dimension 2: Commercial Fit
**Question:** Can they actually AFFORD us?

Scoring:
- > 50 employees? +0.4 (bigger budget)
- Revenue > £1M? +0.3 (profitable)
- Growing (yes/no)? +0.3
- Max score: 1.0 (100%)

**Example:**
- Morrison's Pharmacy: 15 employees (-) (0.0), revenue ~£1.5M ✓ (0.3), stable growth ✓ (0.3) = **0.6 (60%)**

### Dimension 3: Logistics Fit
**Question:** Can we actually SERVE them?

Scoring:
- Within 20 miles of depot? +0.5 (reachable)
- In our serviceable vertical? +0.5 (have trucks for this)
- Max score: 1.0 (100%)

**Example:**
- Morrison's Pharmacy: Manchester depot = 3 miles ✓ (0.5), pharmacy ✓ (0.5) = **1.0 (100%)**

### Overall Score

```
Overall = (Psychological + Commercial + Logistics) / 3
Overall = (0.8 + 0.6 + 1.0) / 3 = 0.8 = 80%

Threshold: 65% required
Result: 80% > 65% → QUALIFIED ✓ Show to operator
```

**Morrison's Pharmacy = 80% fit. Appears on your Decision Screen.**

**Why 65%?** Conservative threshold ensures you're only reaching out to prospects who'll genuinely recognize themselves. Prevents wasting emails on poor-fit businesses.

---

## How Postcode Search Works

### What Happens When You Enter "M1 1AA"

```
1. LOCATION LOOKUP
   M1 1AA = Manchester city center, UK
   Distance from Saint & Story depot: 3 miles
   Population: ~25,000 businesses

2. DATABASE QUERY
   SELECT all_businesses 
   WHERE postcode starts with "M1 1AA"
   OR postcode within 5 miles radius

3. PRESSURE DETECTION
   FOR EACH business:
      Apply industry rules → detect pressures
      Score psychological fit
      Score commercial fit
      Score logistics fit
      Calculate overall fit

4. FILTERING
   Keep only businesses where overall_fit >= 65%
   Sort by fit (highest first)

5. DEDUPLICATION
   Check: Have we already sent this business an email?
   If yes, hide from Decision Screen
   (Don't want to contact same person twice)

6. RETURN TO YOU
   "Ready to Contact: 7 opportunities"
   Sorted by fit, highest first
```

### Behind the Scenes: Database Schema

**core_businesses table:**
```
business_id | name               | industry | postcode | fit_score | pressure_type    | last_contacted | contacted_count
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
123         | Morrison's Pharmacy | Pharmacy | M1 1AA  | 0.80      | Time-Critical    | 2025-01-15    | 1
124         | John Lewis Dist.    | Logistics| M1 1AA  | 0.85      | Bulk Coord       | NULL          | 0
125         | Express Courier     | Courier  | M1 1AA  | 0.72      | Time-Critical    | NULL          | 0
```

When you send an email, system updates:
- `last_contacted = NOW()`
- `contacted_count = contacted_count + 1`

This prevents double-contacting.

---

## Manual Mode: How You Use It

**CURRENT STATE (Operational Now)**

### The Workflow

```
1. You enter postcode → M1 1AA
2. System scans and detects pressures
3. Shows: 7 qualified opportunities
4. You click: Morrison's Pharmacy
5. You see: Recognition email + contact details
6. You decide: Send or Skip
7. Email sent (if you choose Send)
8. You get notification when they respond
9. You follow up with: "Perfect, let's chat about..."
10. System tracks: YES responses, conversion rates
```

**This is MANUAL because:**
- YOU are doing the postcode searches
- YOU are making the send/skip decisions
- YOU are scheduling follow-ups

**Advantages:**
- Full control
- Can see every prospect before sending
- Can add context ("I know this person")
- Builds operator intuition

**Disadvantage:**
- Only works when you're actively searching
- Doesn't scan businesses you don't know about

---

## Autonomous Mode (Future)

**FUTURE STATE (Not Yet Built)**

### The Workflow

```
Every night at 02:00 UTC:

1. System scans ENTIRE UK
2. Detects pressures for all ~2M businesses
3. Qualifies on 65% fit threshold
4. Auto-sends emails to all qualified prospects
5. Tracks responses
6. Next morning: You see results

Next morning operator sees:
- 147 emails sent overnight
- 18 YES responses waiting for follow-up
- 9 NO responses (learn from these)
- Updated pressure type rankings
```

**This is AUTONOMOUS because:**
- System does the searching
- System does the sending
- Manual override optional (you approve before send)

**Advantages:**
- 24/7 coverage
- Scales to entire UK
- Consistent messaging
- Learning loop runs continuously

**Disadvantage:**
- Less control (but with override option)
- May contact businesses you wouldn't prioritize
- Requires careful monitoring

---

## How Learning Works

### The Learning System

Every time a prospect responds, system learns:

```
Email sent: Morrison's Pharmacy
Pressure type: Time-Critical Movement
Industry: Pharmacy
Location: Manchester

[Prospect opens email]
[Prospect clicks YES]

UPDATE learning_metrics:
WHERE pressure_type = "Time-Critical Movement"
  AND industry = "Pharmacy"

SET:
  emails_sent = 47
  responses_yes = 6
  responses_no = 2
  yes_rate = (6 / 8) = 75%
  conversion_rate = (6 / 47) = 13%
```

### Pressure Type Rankings

After 1 week, you can see which pressures work:

```
PRESSURE TYPE                    SENT    YES    YES RATE    CONVERSION
────────────────────────────────────────────────────────────────────────
Time-Critical Movement            21      5      62%         24%
Capacity Overflow                 18      1      50%         6%
Delivery Reliability              12      1      50%         8%
Customer Churn                     8      2      67%         25%
Appointment Scheduling Friction    6      0      0%          0%
```

**What you learn:**
- Time-Critical Movement converts at 24% (your highest winner)
- Customer Churn converts at 25% (hidden gem)
- Appointment Scheduling Friction converts at 0% (stop sending)

**Next week:**
- Prioritize Time-Critical Movement + Customer Churn
- De-prioritize Appointment Scheduling Friction
- Keep testing others

### 30-Day Learning Curve

```
Week 1: Rough data (small sample)
Week 2: Trends emerging (more confidence)
Week 3: Clear winners and losers (actionable insights)
Week 4: Pressure type ranking is solid
```

---

## The 46 Operational Pressures (Full List)

Your system can detect any of these pressures:

### MOVEMENT STUCKNESS (Our Core)
1. Time-Critical Movement
2. Bulk Distribution Coordination
3. Reverse Logistics
4. Cross-Location Coordination
5. Emergency Response Logistics

### SERVICE STUCKNESS
6. Capacity Overflow
7. Service Quality Inconsistency
8. Geographic Service Gaps

### GROWTH STUCKNESS
9. Customer Acquisition Friction
10. Customer Churn
11. Customer Expansion Friction

### MONEY STUCKNESS
12. Payment Collection Delays
13. Financial Visibility
14. Working Capital Constraints

### ORDERS & PRESCRIPTIONS
15. Prescription Processing Delays
16. Order Processing Complexity
17. Compliance Documentation

### DELIVERY & LOGISTICS
18. Delivery Reliability
19. Fragile Goods Handling
20. Proof-of-Delivery Visibility

### APPOINTMENTS & SCHEDULING
21. Appointment Scheduling Friction
22. No-Show and Cancellation Losses
23. Rescheduling Complexity

### CUSTOMER EXPERIENCE
24. Communication Breakdown
25. Visibility and Tracking Gaps
26. Issue Resolution Speed
27. Feedback Collection and Action

**... Plus 19 more subcategories and variations for specific industries (Pharmacy, Law, Dentistry, etc.)**

---

## Key Concepts

### What Is "Fit Score"?

A percentage (0-100%) representing how confident the system is that this prospect will recognize themselves in the recognition email.

- **90%+** = Extremely likely to resonate
- **80-90%** = High confidence
- **65-80%** = Decent match (this is the floor)
- **<65%** = Too risky (won't show)

### What Is "Recognition" vs. "Sales Pitch"?

**Recognition Email:**
```
Some pharmacies in Manchester say you're 
juggling same-day delivery requests...

Sound like your morning?

[YES] [NO]
```

→ "Do YOU feel this pain?" (Prospect recognizes themselves)

**Sales Pitch Email (What We Avoid):**
```
We move things fast. Here's why you should 
hire us. Book a call today.

[Schedule Call]
```

→ "Buy what we're selling." (Prospect feels sold to)

**The difference:** Recognition = they feel understood. Sales pitch = they feel interrupted.

### What Does "Deduplication" Mean?

System tracks: "Have we already emailed this business?"

If YES within last 90 days → Don't email again (prevents annoyance)

When you send Morrison's Pharmacy an email, system records:
- business_id: 123
- email_sent_at: 2025-01-15 10:30 AM
- pressure_type: Time-Critical Movement

If you search M1 1AA again next week:
- System checks: Morrison's Pharmacy contacted in last 90 days? YES
- Result: Hidden from Decision Screen (will reappear after 90 days)

---

## Your Daily Checklist

**Morning:**
- [ ] Check Reporting page (how many YES responses overnight?)
- [ ] Search 1 postcode (scan 5-mile radius)
- [ ] Send 3-5 emails to highest-fit opportunities
- [ ] Record any replies received

**Afternoon:**
- [ ] Search another postcode if time permits
- [ ] Send 2-3 more emails
- [ ] Follow up on YES responses from previous day

**End of Week:**
- [ ] Check pressure type rankings
- [ ] Adjust focus based on what's converting
- [ ] Update team on learnings

---

## FAQ

### Q: Can I edit the recognition email?

**A:** No. Email structure is locked to preserve psychology. Personalization is automatic: business name, location, pressure-specific details. Editing breaks the formula.

### Q: What if the fit score is wrong?

**A:** After first 100 responses, we'll validate and adjust. Right now, 65% is conservative (better to be under-reaching than over-reaching).

### Q: Can I contact the same business twice?

**A:** Not within 90 days. After 90 days, they're "fresh" again and will reappear if you search that postcode.

### Q: How long does it take for a response?

**A:** Varies. Some respond within 2 hours, some within 24 hours. If no response after 48 hours, they're probably not interested.

### Q: What should I do if they say NO?

**A:** Don't follow up on NO responses. System learns: "This pressure type didn't resonate with this industry in this location." Focus energy on YES responses and adjust future targeting.

### Q: What if they respond outside the email (call, website)?

**A:** Record it in the system. Click [Mark as Replied] on their company view. This helps learning loop know pressure type is valid even if response was off-channel.

### Q: Why manual mode if autonomous is better?

**A:** Learning. First 1,000 emails should be manual so operators understand what converts. Then autonomous scales. Plus you catch anomalies a robot would miss.

---

## Success Metrics (What Matters)

**✅ Track these:**
- YES response rate by pressure type
- Postcodes searched per week
- Send decision rate (opportunities seen vs. contacted)
- Pressure type trending

**❌ Don't obsess over:**
- Email open rates (tells you nothing)
- Click rates (tells you nothing)
- Call booking rate (that's sales skill, not intelligence quality)

**Goal:** 10%+ YES response rate across all pressures.

---

## Remember

Intelligence Lab is NOT a sales tool. It's a **discovery tool**.

Your job is NOT to close deals. Your job is:
1. Find businesses with operational pressures
2. Make them feel understood
3. Get them to say YES (recognition)
4. Collect their YES/NO responses
5. Learn which pressures convert

Everything else (scheduling, pitching, closing) is sales.

The system gives you: **Smart targeting + accurate recognition.**

You bring: **Human follow-up + relationship building.**

Together: **Real conversations happen.**

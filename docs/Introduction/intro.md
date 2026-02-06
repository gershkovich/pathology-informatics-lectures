# Pathology Informatics for Residents: Logic, Workflow, and the Future of Practice
**Format:** 35–40 slides (this outline uses **38 slides**)  
**Audience:** Pathology residents (PGY1–PGY4)  
**Core thesis:** Informatics is primarily **logical** (workflow + data + decision + governance) rather than purely technical. Automation should **amplify clinical work**, not coerce clinicians into generic workflows.

**Key analogy (the car):** 30 years ago you could open the hood and change a fuel pump yourself. Today, with modern electronics, you wouldn't dare — and you don't need to. The same applies to informatics: understand the abstraction layers that matter (workflow logic, decisions, data representation) rather than how a CPU works or how a chip is designed. Focus on the driver's perspective, not the mechanic's.

---

## Teaching mechanics (so it feels “software-presented” and interactive)
Use any combo of:
- **Live polls** (Mentimeter / Slido / built-in polling)
- **Micro-cases** with vote → discussion → reveal
- **Think–pair–share** (60–90 seconds) twice
- **Real-time clustering** of resident suggestions into categories (workflow vs data vs decision vs comms vs governance)

**Interactive anchors**
- Poll #1 (early): “Where do systems help vs hurt?”
- Poll #2 (late): “Do you use digital slides today?”
- Micro-case vote #1: “Where did the delay happen?”
- Micro-case vote #2: “Hard stop vs guardrail?”
- Workshop slide: “10 questions for a new LIS/vendor”
- Think–pair–share prompts: “What would you automate tomorrow?” and “Find the ambiguity”

---

# Slide-by-slide outline (34 slides)

## 1) Opening and framing (Slides 1–6)

### Slide 1 — Title + promise
**Title:** *Pathology Informatics for Residents: Logic, Workflow, and the Future of Practice*  
**One-line promise:** “You will practice pathology inside software—so you must understand the logic that shapes it.”  
**Quick opener:** “Show of hands: who has blamed the LIS for something this week?”

---

### Slide 2 — The hook: you already do informatics every day
**Points**
- Case assembly and “what belongs together”
- Stain ordering logic (rules + exceptions)
- Report distribution (who must know, when)
- Amendments (error detection + correction propagation)

**Takeaway:** The clinical work is inseparable from information flow.

---

### Slide 3 — Poll #1: Where do systems help vs hurt you?
**Prompt:** “Where do your current systems most help—and most hurt—your work?” (multi-select)  
**Options**
- Accessioning / specimen labeling
- Grossing / cassette & block tracking
- Slide ordering / special stains
- Case assembly / worklists
- Reporting / synoptics
- Distribution / communication
- Amendments / corrections
- QA / peer review / conference prep

**Use:** Save results; refer back later (“we’ll hit the top 3 pain points”).

---

### Slide 4 — Informatics vs IT (make the distinction explicit)
**Informatics**
- Designs information structures + workflows to improve outcomes
- Optimizes the “human + system” loop

**IT**
- Operates infrastructure, security, devices, networks, installs, uptime

**Takeaway:** Informatics is clinical logic made operational.

---

### Slide 5 — Your thesis: logical problems > technical problems
**Claim:** Most pathology “informatics pain” is not CPU/bandwidth—it's **model mismatch**.

**Examples of logical failures**
- Wrong recipient gets a report (workflow logic + metadata)
- Laterality discrepancy slips through (validation logic)
- “Completed” status ≠ clinically ready (semantic mismatch)
- Synoptic structure doesn’t match real-world exceptions (representation mismatch)
- System supports “workflow” but not the way people *actually* work (reality mismatch)

---

### Slide 6 — Learning objectives (resident language)
By the end, residents can:
1. Describe lab workflow as a system of **events and decisions**
2. Explain why automation should **reduce cognitive load**, not create it
3. Identify how **data representation and quality** drive safety + analytics + AI performance
4. Ask better questions of vendors/IT (“show me how exceptions work”)

---

## 2) Workflow as the substrate (Slides 7–13)

### Slide 7 — What “workflow” means in the lab (concretely)
**Definition:** The chain of tasks/events that creates clinical value.  
**Resident translation:** “Workflow is why your day feels smooth or chaotic.”

**Key message:** Workflow is the substrate on which everything else (data, automation, AI) depends.

---

### Slide 8 — Three-phase view: pre-analytical / analytical / post-analytical
**Pre-analytical:** order → collection → labeling → accessioning  
**Analytical:** grossing → processing → slide creation → staining  
**Post-analytical:** interpretation → reporting → distribution → follow-up/amendments

**Use:** Sets up systematic thinking about “where failures occur.”

---

### Slide 9 — Micro-case #1: “Where did the delay happen?”
**Scenario:** A case is “late.” You have timestamps but unclear cause.  
**Vote:** Pre-analytical vs analytical vs post-analytical

**Reveal discussion**
- Systems often measure the wrong step → wrong intervention
- “Visibility” is the first step toward improvement

---

### Slide 10 — AP workflow steps residents should recognize
- Intake / accession
- Grossing
- Histology
- Slide logistics
- Case assembly
- Sign-out
- Amendments
- Consults & second opinions
- Reporting distribution & notifications

**Takeaway:** A “case” is an evolving object; systems must track state changes.

---

### Slide 11 — The “gap”: why workarounds appear
**Concept:** Requirements evolve; closed systems evolve slowly → gap → workarounds.

**Resident examples**
- Shadow spreadsheets
- “Please ignore the LIS status”
- Manual copy/paste and duplicate data entry
- People becoming the integration layer

**Takeaway:** Workarounds are not “user failure”; they’re often *system design evidence*.

---

### Slide 12 — What workflow management systems *should* do
**Capabilities**
- Track assets and transitions (specimen → blocks → slides → images)
- Coordinate humans (handoffs, assignments, escalations)
- Identify exceptions (delays, missing steps, mismatches)
- Provide meaningful metrics (not vanity timestamps)
- Reduce cognitive load and prevent preventable errors

---

### Slide 13 — Interactive: “What would you automate tomorrow?”
**Prompt (60–90 sec):** “Write one automation you’d implement tomorrow that would make your work safer or faster.”

Collect 5–8 examples, then classify live into:
- (A) Workflow orchestration
- (B) Data quality/validation
- (C) Decision support
- (D) Communication/coordination
- (E) Governance/compliance

**Use:** Keep this taxonomy throughout the lecture.

---

## 3) Automation that serves clinicians (Slides 14–18)

### Slide 14 — The problem with “generic automation”
**Claim:** Automation without domain understanding becomes coercion.

**Examples**
- Forced structured fields that don’t match reality → unsafe workarounds
- Hard stops that don’t understand urgency/context
- Status labels that are administratively neat but clinically false
- One-size workflows that ignore subspecialty differences

---

### Slide 15 — Principle: automate repetition, preserve judgment
**Good automation**
- Removes repetition
- Surfaces exceptions
- Helps triage attention
- Makes the right action easier than the wrong action

**Bad automation**
- Standardizes away nuance
- Creates noise
- Pushes clinicians into “working around the system”

---

### Slide 16 — Maturity ladder: tracking → prevention → guidance
- **Level I:** Audit events (what happened, when)
- **Level II:** Constraints + safety checks (prevent known harms)
- **Level III:** Guidance (dynamic worklists, “falling behind” detection, exception triage)

**Takeaway:** The goal is not “more automation,” but **better logic**.

---

### Slide 17 — Micro-case #2: “Hard stop vs guardrail?”
**Scenario examples**
- Laterality mismatch between requisition and part description
- Wrong-site label risk
- Missing key clinical correlation note
- Missing intended CC recipient (care team gap)

**Vote options**
1. Block sign-out (hard stop)
2. Warn + require acknowledgement (guardrail)
3. Silent logging only (audit)

**Discussion frame**
- Severity × detectability × context × operational reality

---

### Slide 18 — Competitive advantage (yes, even in academia)
**Define:** Competitive advantage = measurable superiority in outcomes, efficiency, reliability, experience.  
**Tie-in:** Better workflow + better data → fewer delays, fewer amendments, better service to care teams.

---

## 4) Data literacy: the hidden determinant of quality (Slides 19–24)

### Slide 19 — Data exists to enable correct action
**Message:** Data isn’t “documentation”—it’s fuel for decisions, distribution, analytics, and safety.

**Resident translation:** Bad data forces humans to become the integration engine.

---

### Slide 20 — Structured vs unstructured in AP (both are necessary)
- Narrative supports nuance and reasoning
- Structure supports computation, QA, registries, staging, and reuse

**Takeaway:** A coherent hybrid model matters more than dogma.

---

### Slide 21 — Data representation: where logic breaks
**Focus:** “Representation” = assignment of meaning to artifacts.

Common failure modes:
- Synonyms, negations, hedging (“cannot exclude”)
- Specimen naming drift (“left pelvic node” vs “pelvic LN, left”)
- Context missing (“per requisition,” “per op note”)
- Laterality is present, but not computable

---

### Slide 22 — Data quality dimensions (why analytics/AI fail)
- Completeness
- Correctness
- Timeliness
- Consistency

**Clinical consequences**
- Wrong follow-up
- Incomplete distribution
- Missed cohorts (research/registry)
- False alarms and alert fatigue

---

### Slide 23 — Interactive: “Find the ambiguity”
Show 3 short (fictional) snippets:
1) “Cannot exclude…”
2) “Left? (per requisition)”
3) Narrative says “negative,” synoptic suggests “present”

**Prompt:** “What would a system need to *know* to prevent downstream error?”  
**Goal:** Make residents articulate context dependencies explicitly.

---

### Slide 24 — Data flow lifecycle: creation → storage → use
A simple pipeline:
- Capture → map → store → clean → present → interpret → act

**Punchline:** Failures cluster at interfaces, not in isolated steps.

---

## 5) Systems ecosystem and stewardship (Slides 25–29)

### Slide 25 — The pathology systems ecosystem (no single “box”)
- LIS
- Instrument interfaces
- Image management / digital slide viewer
- Dictation and reporting tools
- Middleware
- Portals / dashboards
- Data warehouse / analytics
- Messaging/notification systems

**Takeaway:** Pathology runs on a network of systems.

---

### Slide 26 — Stewardship: pathologist responsibility expands
**Concept:** Laboratory information stewardship = integrity + optimal use of lab data.

**Resident translation:** You may not own IT, but you own clinical consequences.

---

### Slide 27 — Org reality: governance and “who decides”
Why this matters:
- Priorities, configuration decisions, safety constraints, change control
- Relationship to CIO/CMIO and institutional standards

**Takeaway:** Knowing decision pathways prevents years of suffering.

---

### Slide 28 — Configuration is clinical practice
**Examples**
- Ordering catalogs and synonyms
- Reflex logic
- Status definitions
- Alert thresholds
- Distribution rules and recipient logic
- Access controls and audit strategy

**Message:** These aren’t “technical preferences”; they shape patient care.

---

### Slide 29 — Workshop slide: “10 questions for a new LIS/vendor”
Use as an interactive checklist (ask residents to add 2 more).

**Workflow**
1. “Show me how exceptions are handled—not the happy path.”
2. “How do you model specimen–part–block–slide relationships?”
3. “How do you handle evolving cases (new stains later, rework, addenda)?”

**Safety**
4. “How do you prevent wrong-patient / wrong-site propagation?”
5. “What is your approach to hard stops vs guardrails?”

**Data + analytics**
6. “Can we compute key metrics without custom extracts?”
7. “How do you represent laterality, anatomical site, and uncertainty in computable form?”

**Interoperability (functional, not just file export)**
8. “What functions can integrate end-to-end, not just export data?”

**Usability + operations**
9. “How do you measure clicks/time-to-complete and reduce cognitive load?”
10. “How quickly can we change configuration safely (change control, validation)?”

---

## 6) Digital pathology + AI + LLMs: residents' near future (Slides 30–37)

### Slide 30 — Poll #2: Do you use digital slides today?
**Options**
- Primary diagnosis routinely
- Occasionally (consults / tumor boards)
- Rarely
- Never

**Use:** Tailor the rest based on adoption level in the room.

---

### Slide 31 — Digital pathology: infrastructure reality
- WSI scanners — high-resolution whole-slide imaging at 40×
- Storage at scale — terabytes per year; on-prem vs cloud tradeoffs
- Viewers + LIS integration — the diagnostic interface must be seamless
- "Digital-first" vs "digital-available" — different maturity, different challenges
- New failure modes: identity management, version control, color calibration, uptime

**Takeaway:** Digital pathology is an infrastructure commitment, not just a scanner purchase.

---

### Slide 32 — Computer vision AI in pathology
- **What it does:** detection, segmentation, quantification, grading assistance
- **FDA-authorized examples:** Paige Prostate (2021) — first AI for pathology, 7.3% improvement in cancer detection
- **Key principle:** accuracy alone is insufficient — workflow integration determines clinical value
- **Validation burden:** institutions must validate independently, not just trust vendor claims
- AI as adjunctive tool: pathologist must review — on-label use matters

---

### Slide 33 — LLMs and language AI in pathology
**What LLMs can do today**
- Structured data extraction from narrative reports
- Report drafting and synoptic population
- Literature summarization and synthesis
- Clinical decision support via natural language
- NLP on path reports for registry/cohort identification
- Automated coding suggestions

**What they cannot do reliably**
- Replace pathologist judgment
- Guarantee factual accuracy (hallucination risk)
- Handle novel or rare entities without training data
- Understand institutional context and local policies
- Self-validate — they don't know what they don't know

**Takeaway:** LLMs are powerful text engines — you must understand their failure modes to use them safely.

---

### Slide 34 — AI governance: who validates, who is liable?
- **On-label vs off-label:** using AI outside its approved indication changes the risk profile
- **Validation responsibility:** vendor claims ≠ institutional validation — you must verify
- **Bias:** training data composition determines performance across demographics and tissue types
- **Documentation:** when AI contributes to diagnosis, what goes in the record?
- **Stewardship connection:** AI governance is the extension of lab information stewardship

---

### Slide 35 — The AI maturity ladder for pathology
*(parallels the automation maturity ladder from Slide 16)*
- **Level I:** Retrospective analytics (TAT reports, volumes, trends)
- **Level II:** Real-time QA & safety (mismatch detection, missing fields, hard stops)
- **Level III:** Assistive AI (flagging, quantification, draft reports)
- **Level IV:** Integrated decision support (differential generation, risk stratification)

**Takeaway:** Don't skip levels. Retrospective analytics must work before you trust real-time AI.

---

### Slide 36 — Interactive: "Would you trust this AI output?"
**Scenarios**
1. An AI flags a region on a prostate biopsy as suspicious for carcinoma
2. An LLM drafts a synoptic report from your dictation
3. An algorithm auto-prioritizes your worklist, moving an "urgent" case to the top

**Vote:** Trust and use as-is / Review and edit / Reject and redo manually

**Discussion**
- Context matters: What's the AI's track record? Is it validated here?
- Trust calibration: Over-trust is as dangerous as under-trust
- Transparency: Can you see WHY the AI made that decision?
- Accountability: If the AI is wrong, whose name is on the report?
- The answer should almost always involve human review — for now

---

### Slide 37 — Cybersecurity + availability: the silent curriculum
- Downtime = patient safety event — not just an inconvenience
- Security controls shape access and workflows daily
- Auditability and traceability matter (especially with AI outputs)
- Ransomware attacks on healthcare systems are increasing yearly
- Your downtime procedures are as important as your uptime workflows

**Resident takeaway:** "The system must be dependable and accountable."

---

## 7) Close (Slide 38)

### Slide 38 — Takeaways + call to action
**Four takeaways**
1. Informatics is the **logic of clinical work expressed in software** — focus on the abstraction layer that matters, not the chipset.
2. Good automation **removes repetition and highlights exceptions**; it does not force generic workflows on clinical practice.
3. Data representation and quality determine **safety, analytics, and AI usefulness** — garbage in, garbage out.
4. AI tools — whether vision or language — are only as good as their **integration, validation, and governance**.

**Call to action**
- "Pick one workflow pain point this month. Describe it as:
  **event → decision → data → consequence**."
- Send me one "automation candidate" and one "ambiguity" you've seen.

---

# Optional add-ons (if you want 39–40 slides)
- **Myth slide:** "Common informatics myths residents hear" + rebuttal
- **Mini-glossary slide:** HL7, FHIR, DICOM, interface, middleware, dictionary, data warehouse (minimal jargon, practical definitions)
- **Career paths slide:** Clinical informatics subspecialty, ACGME fellowships, board certification

---

## Timing guide (typical 45–60 min)
- Opening + framing (incl. car analogy): 8–10 min
- Workflow substrate: 10–12 min
- Automation design: 7–9 min
- Data literacy: 8–10 min
- Ecosystem + stewardship: 7–9 min
- Digital pathology + AI + LLMs: 10–14 min
- Close: 2–3 min
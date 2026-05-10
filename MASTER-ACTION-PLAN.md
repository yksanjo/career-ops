# 🚀 Master Action Plan — Santiago's Automated Job Search

**Generated:** 2026-04-06  
**Status:** System Ready, Applications Prepared  

---

## ✅ What's Been Completed

### 1. System Setup ✅
- [x] Cloned career-ops repository to `~/career-ops`
- [x] Installed npm dependencies + Playwright Chromium
- [x] Created `config/profile.yml` with your complete background
- [x] Created `cv.md` with full professional history
- [x] Created `article-digest.md` with 10 detailed proof points
- [x] Created `portals.yml` with 60+ target companies
- [x] Created `interview-prep/story-bank.md` with 10 STAR+R stories
- [x] Initialized data tracking files (applications.md, pipeline.md, scan-history.tsv)

### 2. Job Discovery ✅
- [x] Researched live job openings at target companies
- [x] Identified 2 high-priority opportunities (Stord, Airtable)
- [x] Created detailed A-F evaluations for both roles
- [x] Generated comprehensive reports with scoring

### 3. Application Materials ✅
- [x] Created tailored cover letter for Stord (Forward Deployed Engineer)
- [x] Created tailored cover letter for Airtable (Senior Solutions Architect)
- [x] Created LinkedIn outreach message templates for 4 scenarios
- [x] Updated applications tracker with both opportunities

### 4. Strategic Assets ✅
- [x] Complete STAR+R story bank (10 stories with usage guidance)
- [x] Competitive advantages documented
- [x] Gap analysis with mitigation strategies
- [x] Compensation research and negotiation positioning

---

## 🎯 Immediate Action Items (Next 48 Hours)

### Priority 1: Apply to Stord (Score: 4.6/5.0)

**Timeline:** Apply TODAY or TOMROW

**Steps:**
1. ✅ Review evaluation report: `reports/001-stord-forward-deployed-2026-04-06.md`
2. ✅ Review cover letter: `output/cover-letter-stord-forward-deployed.md`
3. [ ] **ACTION:** Generate tailored CV PDF (see instructions below)
4. [ ] **ACTION:** Apply at https://jobs.revolution.com/companies/stord/jobs/70883337-forward-deployed-engineer-ai-enablement
5. [ ] **ACTION:** Send LinkedIn connection request to AI Enablement lead (use Template 1)
6. [ ] **ACTION:** Follow up with recruiter via LinkedIn (use Template 1)

**Key Selling Points:**
- Jacobo: 90% self-service rate (exact match for agentic AI requirement)
- Business OS: 170 hrs/month automated (operational automation)
- Founder exit: High agency, autonomous working style
- Career-ops: 7,700 GitHub stars (open-source, AI coding assistant usage)

### Priority 2: Apply to Airtable (Score: 4.4/5.0)

**Timeline:** Apply within 72 hours

**Steps:**
1. ✅ Review evaluation report: `reports/002-airtable-solutions-architect-2026-04-06.md`
2. ✅ Review cover letter: `output/cover-letter-airtable-solutions-architect.md`
3. [ ] **ACTION:** Generate tailored CV PDF (see instructions below)
4. [ ] **ACTION:** Apply at https://uk.linkedin.com/jobs/view/senior-solutions-architect-at-airtable-4393069374
   - **IMPORTANT:** Mention "DailyRemote" when applying
5. [ ] **ACTION:** Send LinkedIn connection request to Solutions Architecture lead (use Template 2)
6. [ ] **ACTION:** Follow up with Airtable recruiter (use Template 2)

**Key Selling Points:**
- Airtable certified at 3 levels (Builder, Admin, AI App Builder)
- Built 12-database Business OS (enterprise-scale implementation)
- 8 Anthropic certifications (exceeds "Experimenter AI fluency" requirement)
- Enterprise clients: Marriott, Telefónica, Santander, Heineken

---

## 📅 This Week's Action Plan

### Day 1-2 (Apr 6-7): Applications
- [ ] Generate CV PDFs for both roles
- [ ] Submit Stord application
- [ ] Submit Airtable application
- [ ] Send LinkedIn connection requests (4-6 people total)

### Day 3-4 (Apr 8-9): Follow-ups
- [ ] Send follow-up messages to new connections
- [ ] Search for 3-5 additional opportunities using career-ops
- [ ] Run `/career-ops scan` to discover new openings

### Day 5-7 (Apr 10-12): Pipeline Building
- [ ] Evaluate any new opportunities found
- [ ] Generate CVs for additional applications
- [ ] Submit 3-5 more applications (score 4.0+)
- [ ] Start LinkedIn content strategy (post about Jacobo/career-ops)

---

## 🔄 Ongoing Weekly Workflow

### Every Week:

**Monday: Discovery**
```bash
cd ~/career-ops && claude
# Run: /career-ops scan
# Review new opportunities found
# Add promising URLs to pipeline
```

**Tuesday: Evaluation**
```bash
# In Claude Code session:
# Paste job URLs one by one
# System auto-evaluates each (A-F scoring)
# Review reports for scores 4.0+
```

**Wednesday: Application**
```bash
# For each high-score opportunity (4.0+):
# 1. Generate tailored CV PDF
# 2. Review cover letter template
# 3. Submit application
# 4. Update tracker
```

**Thursday: Outreach**
```bash
# Send LinkedIn connection requests
# Follow up with previous week's contacts
# Post content on LinkedIn (case study, open-source update)
```

**Friday: Review & Plan**
```bash
cd ~/career-ops && claude
# Run: /career-ops tracker
# Review application stats
# Plan next week's targets
# Update story-bank with new insights
```

---

## 📊 Target Metrics

### Weekly Goals:
- **Jobs Evaluated:** 15-25
- **Applications Sent:** 5-8 (score 4.0+)
- **LinkedIn Connections:** 10-15
- **Response Rate Target:** 30%+
- **Interview Conversion Target:** 20-30% of applications

### 30-Day Goals:
- **Total Applications:** 20-30
- **Interviews:** 5-8
- **Final Rounds:** 2-3
- **Offers:** 1+

---

## 🎨 CV PDF Generation Instructions

### For Each Application:

**Option A: Using Claude Code (Recommended)**

```bash
cd ~/career-ops && claude

# Then say:
"Generate CV PDF for [Company] - [Role]"

# Claude will:
# 1. Read the job description
# 2. Extract keywords
# 3. Tailor your CV
# 4. Generate PDF via Playwright
# 5. Save to output/cv-candidate-[company].pdf
```

**Option B: Manual Generation**

```bash
cd ~/career-ops

# Edit cv.md to tailor for specific role
# Then generate PDF:
node generate-pdf.mjs /tmp/cv-candidate.html output/cv-candidate-[company].pdf --format=letter
```

### Tailoring Guidelines:

**For Stord (Forward Deployed Engineer):**
- Lead summary with: "Forward Deployed Engineer who builds production AI systems with measurable business impact"
- Emphasize: Jacobo (90% self-service), embedded consulting, high autonomy
- Add competencies: "Agentic AI Systems", "Internal Automation", "LLM-Powered Tools"
- Highlight: AI coding assistant daily usage (Claude Code, Cursor)

**For Airtable (Solutions Architect):**
- Lead summary with: "Airtable-certified Solutions Architect designing enterprise implementations with AI integration"
- Emphasize: Business OS (12 databases), LICO Cosmetics consulting, enterprise clients
- Move certifications higher (Airtable Builder + Admin + AI App Builder)
- Add competencies: "Solution Architecture", "Enterprise Airtable Implementations", "Client Consulting"

---

## 🔍 How to Find More Opportunities

### Method 1: Career-Ops Scanner

```bash
cd ~/career-ops && claude

# Run scanner:
/career-ops scan

# This will:
# 1. Check all 60+ target companies' career pages
# 2. Filter by title keywords (AI, Solutions, Forward Deployed, etc.)
# 3. Deduplicate against existing tracker
# 4. Add new opportunities to pipeline
```

### Method 2: Manual Discovery

**Job Boards to Check:**
- https://www.ottogroup.ai/jobs (AI/ML roles)
- https://weworkremotely.com/categories/programming
- https://remoteok.com/remote-ai-jobs
- https://builtin.com/jobs/remote/product/artificial-intelligence
- https://www.glassdoor.com/Job/remote-ai-engineer-jobs

**Search Queries:**
```
site:jobs.ashbyhq.com "AI" OR "Solutions" OR "Forward Deployed"
site:job-boards.greenhouse.io "AI Product Manager" OR "Solutions Architect"
"AI Solutions Architect" remote Europe
"Forward Deployed Engineer" remote
```

### Method 3: LinkedIn Search

```
Search: "AI Solutions Architect" OR "Forward Deployed" OR "AI Product Manager"
Filter: Remote, Past 24 hours, Europe
```

---

## 📝 Application Checklist (Per Role)

For each application, ensure:

- [ ] Evaluation report created and reviewed (score 4.0+)
- [ ] Tailored CV PDF generated
- [ ] Cover letter customized
- [ ] Application submitted via company portal
- [ ] LinkedIn connection request sent to hiring manager
- [ ] LinkedIn connection request sent to recruiter
- [ ] Follow-up message scheduled (3-4 days later)
- [ ] Tracker updated with date, status, notes
- [ ] STAR+R stories identified for this role
- [ ] Company research completed (use `/career-ops deep` mode)

---

## 🎯 Interview Preparation

### When You Get an Interview:

**Step 1: Review Story Bank**
```bash
# Open: interview-prep/story-bank.md
# Identify 3-5 stories relevant to this role
# Practice telling each story in 2-3 minutes
```

**Step 2: Company Research**
```bash
cd ~/career-ops && claude

# Run:
/career-ops deep [Company Name]

# This generates research prompts for:
# - Company background and recent news
# - Product/technology stack
# - Team structure and culture
# - Recent funding/growth
```

**Step 3: Technical Prep**
- Review Jacobo architecture (be ready to whiteboard it)
- Review Business OS architecture (be ready to explain design decisions)
- Prepare to discuss: multi-agent orchestration, HITL workflows, evals, observability
- Be ready for: "Tell me about a production AI system you built end-to-end"

**Step 4: Questions to Ask Them**
Use the "Red Flag Questions" from each evaluation report. Examples:
- "What's the current state of AI automation in your organization?"
- "How do you measure success for this role?"
- "What's the biggest challenge your team is facing right now?"

---

## 💰 Compensation Negotiation

### When You Receive an Offer:

**Your Positioning:**
- Target: €80K-120K / $100K-150K
- Minimum: €70K / $90K
- Leverage points:
  - 16 years experience (not just 2 years LLM)
  - Proven metrics (90% self-service, 170 hrs/month)
  - Rare certification combination (Airtable + Anthropic)
  - Open-source credibility (7,700 stars)

**Negotiation Script:**
```
"I'm excited about this opportunity and the impact I can deliver. 
Based on my track record of [specific metric], I'm looking for 
compensation in the range of [target + 10%]. 

I'm also in conversation with [other company] for similar roles, 
so I'd love to move forward efficiently if we can align on comp."
```

**Geographic Salary Strategy:**
- If they try to discount for Spain location:
  "I'm optimizing for production impact, not geography. My work delivers 
   the same value whether I'm in Seville or San Francisco. Let's discuss 
   the value I'll create, not my zip code."

---

## 📱 LinkedIn Content Strategy

### Posts to Create (Schedule 1-2 per week):

**Week 1: Jacobo Case Study**
```
"I built an AI agent that handles 90% of customer service inquiries.

Not a demo. Production. Real customers. Daily.

Here's the architecture breakdown:
[Thread with diagrams]

#AI #AgenticAI #LLM #Automation"
```

**Week 2: Career-Ops Open Source**
```
"I open-sourced my job search automation pipeline.

7,700 GitHub stars later, it's helping thousands of people.

Here's what it does:
[Thread with screenshots]

#OpenSource #AI #JobSearch"
```

**Week 3: Business OS**
```
"I automated 170 hours/month of work with Airtable.

Here's the system architecture:
[Thread with diagrams]

#Airtable #Automation #Productivity"
```

**Week 4: Lessons from Exit**
```
"I exited my business after 16 years.

Here are 10 things I learned about building products that matter:
[Thread with insights]

#Founder #ProductManagement #AI"
```

---

## 🚨 Common Pitfalls to Avoid

### ❌ Don't:
- Apply to roles scoring below 4.0/5.0 (quality over quantity)
- Use generic CVs (always tailor to the role)
- Skip the outreach messages (applications alone get lost)
- Accept first offer without negotiating (always counter)
- Stop pipeline after getting interviews (keep options open)

### ✅ Do:
- Apply systematically with scoring discipline
- Personalize every application
- Follow up within 48 hours of applying
- Track everything in applications.md
- Learn from every rejection (update scoring if needed)
- Celebrate small wins (connections, responses, interviews)

---

## 📂 File Structure Reference

```
career-ops/
├── config/
│   └── profile.yml                  ← Your complete profile
├── cv.md                            ← Source CV (always up-to-date)
├── article-digest.md                ← 10 proof points
├── portals.yml                      ← 60+ target companies
├── interview-prep/
│   └── story-bank.md               ← 10 STAR+R stories
├── reports/
│   ├── 001-stord-forward-deployed-2026-04-06.md    ← Stord evaluation
│   └── 002-airtable-solutions-architect-2026-04-06.md  ← Airtable evaluation
├── output/
│   ├── cover-letter-stord-forward-deployed.md      ← Stord cover letter
│   ├── cover-letter-airtable-solutions-architect.md ← Airtable cover letter
│   └── linkedin-outreach-messages.md                ← All outreach templates
├── data/
│   ├── applications.md             ← Tracker (currently 2 entries)
│   ├── pipeline.md                 ← Inbox (add URLs here)
│   └── scan-history.tsv            ← Dedup history
└── AUTOMATION-WORKFLOW.md          ← This file
```

---

## 🎓 Using Career-Ops Commands

### In Claude Code Session:

```bash
cd ~/career-ops && claude

# Discovery menu
/career-ops

# Evaluate single job (paste URL or JD)
# Just paste the URL directly - no command needed

# Scan all target companies
/career-ops scan

# Process pending URLs in pipeline
/career-ops pipeline

# Generate CV PDF
/career-ops pdf [Company Name]

# View tracker
/career-ops tracker

# LinkedIn outreach
/career-ops contacto [Company Name]

# Deep company research
/career-ops deep [Company Name]

# Batch processing (multiple jobs)
/career-ops batch

# Application form assistant
/career-ops apply
```

---

## 🆘 Troubleshooting

### Problem: Dashboard crashes on empty tracker
**Solution:** Already fixed - applications.md has header row

### Problem: PDF generation fails
**Solution:** Ensure Playwright Chromium is installed: `npx playwright install chromium`

### Problem: Scan finds no jobs
**Solution:** Check portals.yml - ensure companies are enabled and URLs are current

### Problem: Score seems too high/low
**Solution:** Review `_shared.md` scoring rubrics, adjust weights in next evaluation

---

## 📞 Quick Reference

### Your Key Metrics (Memorize These):
- **Jacobo:** 90% self-service, 80 hrs/month saved, <€200/mo, <30s response
- **Business OS:** 12 databases, 2,100+ fields, 170 hrs/month automated
- **Career-Ops:** 7,700 GitHub stars, 1,300+ forks
- **Programmatic SEO:** 15,500 pages, 2M+ impressions
- **Self-Healing Chatbot:** <$0.005/conversation, 71 evals, 6-layer defense
- **Business Exit:** 16 years, 30,000+ clients, successfully exited 2025

### Your Certifications:
- **Airtable:** Builder, Admin, AI App Builder
- **Anthropic:** 8 certifications (MCP, Claude API, AI Fluency series)
- **Make:** Advanced Certification
- **Teaching:** AI PM Bootcamp Teaching Fellow (2026)

### Your Target Roles:
1. AI Solutions Architect
2. Forward Deployed Engineer
3. AI Product Manager
4. Agentic Workflows / Automation Engineer
5. AI Forward Deployed Engineer

---

## 🎉 You're Ready to Launch!

**Everything is set up and ready to go.** Your next steps:

1. **Today:** Review both evaluation reports and cover letters
2. **Today:** Generate CV PDFs for Stord and Airtable
3. **Tomorrow:** Submit both applications
4. **This week:** Send LinkedIn outreach messages
5. **Ongoing:** Run weekly discovery → evaluate → apply → outreach cycle

**Remember:**
- Quality over quantity (score 4.0+ only)
- Personalize every application
- Follow up within 48 hours
- Track everything
- Negotiate every offer

**You have:**
✅ World-class open-source credibility (7,700 stars)  
✅ Production AI proof (90% self-service)  
✅ Enterprise experience (Marriott, Telefónica, Santander, Heineken)  
✅ Rare certifications (Airtable + Anthropic)  
✅ Successful exit story (proven execution)  
✅ Systematic approach (career-ops pipeline)  

**The market wants people who can ship production AI. You've done it. Now let's find the right company.**

---

*Generated by career-ops automated pipeline on 2026-04-06*  
*Next review: 2026-04-13 (1 week)*

# Automated Job Search Pipeline - Complete Workflow

## System Status: ✅ READY

All configuration files created and dependencies installed.

---

## What's Been Set Up

### 1. Configuration Files ✅
- **`config/profile.yml`**: Your complete profile with target roles, preferences, and narrative
- **`cv.md`**: Full CV with 16+ years experience, exit story, certifications, and metrics
- **`article-digest.md`**: 10 detailed proof points from your case studies
- **`portals.yml`**: 60+ target companies across AI labs, automation, enterprise SaaS
- **`interview-prep/story-bank.md`**: 10 STAR+R stories ready for interviews

### 2. Data Files ✅
- **`data/applications.md`**: Tracker ready for applications
- **`data/pipeline.md`**: Inbox ready for job URLs
- **`data/scan-history.tsv`**: History tracking initialized

### 3. Dependencies ✅
- **npm packages**: Installed
- **Playwright + Chromium**: Installed

---

## How to Use the System

### Option A: Manual Claude Code Session (Recommended)

The career-ops system is designed to run inside Claude Code. Here's your workflow:

```bash
# 1. Open Claude Code in the career-ops directory
cd ~/career-ops && claude

# 2. The system will auto-detect your configuration and enter ready state

# 3. Use any of these commands:
/career-ops                          # Discovery menu
/career-ops scan                     # Scan all 60+ companies for open roles
/career-ops pipeline                 # Process pending URLs
/career-ops tracker                  # View application tracker
```

**For each job you find:**
```bash
# Just paste the job URL or JD text
# The auto-pipeline will:
# 1. Evaluate the role (A-F scoring)
# 2. Generate tailored CV PDF
# 3. Add to tracker with score
# 4. Create interview prep stories
```

### Option B: Semi-Automated Batch Processing

```bash
cd ~/career-ops

# Run batch processor for multiple jobs at once
./batch/batch-runner.sh

# This will:
# 1. Read pending URLs from data/pipeline.md
# 2. Process each with claude -p in parallel
# 3. Generate PDFs and reports
# 4. Merge results into tracker
```

### Option C: Web-Based Discovery (What I'll Do Now)

Since you want me to find and process jobs for you, I'll:
1. Search for current openings at your target companies
2. Add promising URLs to your pipeline
3. Help you evaluate each one
4. Generate customized CVs and cover letters

---

## Target Companies (60+ Configured)

### Tier 1 - Apply Immediately:
1. **Stord** - Forward Deployed Engineer (perfect match)
2. **n8n** - Automation Builder (community posting)
3. **Airtable** - Senior Solutions Architect
4. **Anthropic** - Manager, Applied AI (Startups)
5. **LangChain** - Solutions/Forward Deployed

### Tier 2 - High Priority:
- OpenAI, Hugging Face, Cohere (AI Labs)
- ElevenLabs, Vapi, Retell AI (Voice AI)
- Zapier, Make, Workato (Automation)
- GitLab, Supabase, Vercel (Remote-first)

### Tier 3 - European AI:
- Mistral AI, Aleph Alpha, DeepL (EU AI)
- Celonis, Contentful (Enterprise SaaS)
- Synthesia, Gong, Cresta (AI Applications)

---

## Next Steps

### Immediate Actions (This Session):

1. **Search for Live Openings**: I'll find current job postings at your target companies
2. **Evaluate Top Matches**: Score each against your profile (A-F system)
3. **Generate Customized CVs**: Create tailored PDFs for top opportunities
4. **Prepare Application Materials**: Cover letters, outreach messages

### This Week:

5. **Apply to Top 5-10 Roles**: Using your career-ops system
6. **LinkedIn Outreach**: Contact hiring managers directly
7. **Track Everything**: In your applications.md tracker

### Ongoing:

8. **Weekly Scans**: Run `/career-ops scan` to find new openings
9. **Pipeline Processing**: Evaluate all new opportunities systematically
10. **Interview Prep**: Use story-bank.md for behavioral interviews

---

## Your Competitive Advantages

✅ **16+ years building production systems** (not prototypes)  
✅ **Successfully exited founder** (proven execution)  
✅ **7,700 GitHub stars** (technical credibility + community)  
✅ **Real AI at scale** (Jacobo: 90% self-service)  
✅ **Full-stack capability** (Go, Python, React, n8n, Airtable, LLMs)  
✅ **Enterprise clients** (Marriott, Telefónica, Santander, Heineken)  
✅ **Anthropic + Airtable certified** (rare combination)  
✅ **Teaching Fellow** (thought leadership)  

---

## Files Created/Modified

```
career-ops/
├── config/
│   └── profile.yml              ✅ Created (your complete profile)
├── cv.md                        ✅ Created (full CV)
├── article-digest.md            ✅ Created (10 proof points)
├── portals.yml                  ✅ Created (60+ companies)
├── interview-prep/
│   └── story-bank.md           ✅ Created (10 STAR+R stories)
├── data/
│   ├── applications.md         ✅ Created (tracker)
│   ├── pipeline.md             ✅ Created (inbox)
│   └── scan-history.tsv        ✅ Created (history)
└── AUTOMATION-WORKFLOW.md      ✅ This file
```

---

## Key Metrics to Track

- **Jobs Evaluated**: Target 50-100 per week
- **Applications Sent**: Target 10-15 high-fit per week (score 4.0+)
- **Interview Rate**: Target 20-30% of applications
- **Offer Rate**: Target 5-10% of interviews

---

## Ready to Launch! 🚀

The system is fully configured and ready to automate your job search. 

**What would you like to do first?**

A. Search for current openings at specific companies
B. Generate a tailored CV for a specific role
C. Create LinkedIn outreach messages
D. Run a full scan of all target companies
E. Something else?

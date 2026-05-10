# Article Digest -- Proof Points

Compact proof points from portfolio projects. Read by career-ops at evaluation time.

---

## Jacobo -- AI Omnichannel Agent

**Hero metrics:** ~90% self-service rate, ~80 hrs/month automated, <€200/mo cost, <30s response time

**Architecture:** Central intent-classifying router dispatching to specialized sub-agents via tool calling. Integrates ElevenLabs voice, n8n/WATI WhatsApp, Aircall PBX, YouCanBookMe, Airtable, Slack. Multi-agent orchestration with HITL handoff for edge cases.

**Key decisions:**
- Chose n8n workflow orchestration over custom code for rapid iteration and maintainability
- 4 of 7 workflows use zero LLMs -- pure business logic for efficiency and cost control
- LLMs (GPT-4.1, MiniMax M2.5) only where reasoning/flexibility needed
- Built sub-agent architecture: booking agent, discount agent, order agent, each with specialized tools
- Implemented HITL escalation for complex cases, maintaining quality while maximizing automation

**Proof points:**
- Handles ~90% of customer inquiries autonomously without human intervention
- Saves ~80 hours/month in manual customer service work
- Total cost under €200/month including all LLM API calls and integrations
- Response time under 30 seconds across all channels (voice, WhatsApp, phone)
- 7 production workflows open-sourced: github.com/santifer/jacobo-workflows (70+ stars)
- Multi-lingual support (Spanish/English)

---

## Business OS -- Airtable Enterprise System

**Hero metrics:** 170+ hrs/month automated, 12 connected databases, 2,100+ fields

**Architecture:** Complete ERP/CRM/CMS/Inventory system on Airtable as single source of truth. 12 interconnected databases with automated workflows for inventory ordering, omnichannel communications, accounting, and task management.

**Key decisions:**
- Chose Airtable over custom database for speed of iteration and stakeholder accessibility
- Built 12 connected databases: Inventory, Orders, Customers, Invoices, Tasks, Communications, Suppliers, Products, Locations, Categories, Reports, Settings
- Automated workflows: auto-inventory ordering based on stock levels, automated accounting entries, omnichannel communication routing
- Implemented role-based access and views for different stakeholders

**Proof points:**
- Replaced multiple disconnected systems (spreadsheets, legacy software) with single platform
- Automated 170+ hours/month of manual administrative work
- 2,100+ fields managing complete business operations
- Enabled real-time visibility across all departments
- Used with enterprise clients: Marriott, Telefónica, Santander, Heineken

---

## Programmatic SEO Website

**Hero metrics:** 15,500+ unique pages generated, 2M+ impressions

**Architecture:** Headless CMS (Airtable) → Astro static site generator pipeline. Auto-generates repair pages, model pages, location pages with intelligent crawl budget management. Auto-decides indexable vs UX-only content.

**Key decisions:**
- Chose Astro over Next.js for superior static generation performance and SEO
- Airtable as CMS for easy content management by non-technical stakeholders
- Implemented intelligent content decisions: auto-determine which pages should be indexable vs UX-only
- Built automated page generation from structured data in Airtable

**Proof points:**
- Generated 15,500+ unique, valuable pages from structured Airtable data
- Achieved 2M+ impressions through search engines
- Managed crawl budget intelligently to maximize SEO impact
- Zero manual content writing -- all generated from structured data
- Open-sourced approach: github.com/santifer/santifer-irepair

---

## Self-Healing Chatbot (Production)

**Hero metrics:** <$0.005/conversation, 71 evals, 6-layer defense, voice support

**Architecture:** Agentic observability system with 6-layer defense in depth. Automated evals (71 tests), voice support integration, auto-test generation from real failures. Continuous improvement loop.

**Key decisions:**
- Built comprehensive eval suite (71 tests) before deployment, not after
- Implemented 6-layer defense: input validation, intent classification, tool access control, output validation, monitoring, human escalation
- Auto-generates new tests from real conversation failures
- Cost optimization: <$0.005 per conversation through efficient LLM usage

**Proof points:**
- Production system handling real customer conversations at minimal cost
- 71 automated evals catching regressions before deployment
- 6-layer defense preventing failures and maintaining quality
- Voice support for accessibility and multi-modal interactions
- Auto-test generation from real failures -- system improves itself

---

## Career-Ops -- AI Job Search Pipeline

**Hero metrics:** 7,700+ GitHub stars, 1,300+ forks, 24 languages supported

**Architecture:** Claude Code agent-driven pipeline with Go TUI dashboard (Bubble Tea + Lipgloss). 14 skill modes including auto-pipeline, scan, batch, apply, tracker, contacto. Playwright for portal scraping, PDF generation via Puppeteer. A-F scoring across 10 weighted dimensions.

**Key decisions:**
- Built as Claude Code skill system (not standalone app) for maximum flexibility
- 14 distinct modes covering entire job search workflow
- Go dashboard for visualization, Node.js for PDF generation
- Structured A-F evaluation framework preventing bad-fit applications
- Batch processing for parallel evaluation with clean 200K contexts

**Proof points:**
- 7,700+ GitHub stars showing strong community adoption
- 1,300+ forks demonstrating practical utility
- Used to evaluate 740+ job offers, generate 100+ tailored CVs
- Landed Head of Applied AI role through systematic approach
- Available in English and Spanish
- Featured in AI/ML communities and newsletters

---

## Watermark Remover -- CLI Tool

**Hero metrics:** Python 3.10+, ~2GB RAM, YOLO + LaMa pipeline

**Architecture:** CLI tool using YOLO detection + LaMa inpainting to automatically detect and remove watermarks from images. OpenCV fallback for edge cases.

**Key decisions:**
- Combined YOLO (detection) with LaMa (inpainting) for best results
- Built as CLI for easy integration into workflows
- OpenCV fallback for cases where ML models struggle
- Minimal resource requirements (~2GB RAM)

**Proof points:**
- Fully automated watermark detection and removal
- Handles various watermark types and positions
- Open-source with clear documentation
- Practical tool solving real problem

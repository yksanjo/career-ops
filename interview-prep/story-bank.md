# Story Bank -- STAR+R Interview Stories

Accumulated STAR+R stories from evaluations and interviews. Use these as building blocks for behavioral interviews.

---

## Story 1: Building Jacobo AI Agent (90% Self-Service)

**Situation:** Customer service was overwhelmed with repetitive inquiries across multiple channels (phone, WhatsApp, walk-ins). Response times were slow, costs high, and customer satisfaction inconsistent.

**Task:** Design and deploy an omnichannel AI agent that could handle the majority of customer inquiries autonomously while maintaining quality and providing seamless human handoff for complex cases.

**Action:** 
- Built multi-agent system with central intent-classifying router
- Created 4 specialized sub-agents (booking, discounts, orders, general inquiries)
- Integrated ElevenLabs voice, n8n workflows, WATI WhatsApp, Aircall PBX
- Implemented 6-layer defense: input validation, intent classification, tool access control, output validation, monitoring, human escalation
- Built 71 automated evals to catch regressions
- Made architectural decision: 4 of 7 workflows use zero LLMs (pure business logic) for cost efficiency
- Implemented HITL escalation maintaining quality while maximizing automation

**Result:** 
- ~90% self-service rate (only 10% require human intervention)
- ~80 hours/month automated
- <€200/month total cost
- <30 second response time across all channels
- Open-sourced workflows: 70+ GitHub stars

**Relevance:** Agentic AI, multi-agent orchestration, cost optimization, production ML systems, HITL workflows

---

## Story 2: Business OS on Airtable (170+ Hours/Month Saved)

**Situation:** Business operations were scattered across spreadsheets, legacy software, and manual processes. No single source of truth, leading to errors, delays, and inefficiencies.

**Task:** Design and implement a complete ERP/CRM/CMS/Inventory system that would serve as the single source of truth for all business operations.

**Action:**
- Conducted stakeholder workshops to map all workflows and identify automation opportunities
- Designed 12 interconnected Airtable databases: Inventory, Orders, Customers, Invoices, Tasks, Communications, Suppliers, Products, Locations, Categories, Reports, Settings
- Built automated workflows: auto-inventory ordering based on stock levels, automated accounting entries, omnichannel communication routing
- Implemented role-based access and views for different stakeholders
- Created 2,100+ fields managing complete business operations

**Result:**
- 170+ hours/month of manual work automated
- Complete visibility across all departments in real-time
- Enabled scaling to enterprise clients (Marriott, Telefónica, Santander, Heineken)
- Successfully used as proof point in consulting engagements

**Relevance:** Systems thinking, stakeholder workshops, enterprise architecture, automation, Airtable expertise

---

## Story 3: Programmatic SEO (15,500+ Pages, 2M+ Impressions)

**Situation:** Needed to generate organic search visibility for thousands of service/model combinations without manual content creation.

**Task:** Build automated pipeline from structured data (Airtable) to SEO-optimized pages that would rank and drive traffic.

**Action:**
- Chose Astro over Next.js for superior static generation performance and SEO
- Built Airtable → Astro pipeline generating pages from structured data
- Implemented intelligent content decisions: auto-determine which pages should be indexable vs UX-only
- Built automated page generation with intelligent crawl budget management
- Created 15,500+ unique, valuable pages from Airtable data

**Result:**
- 15,500+ unique pages generated
- 2M+ impressions through search engines
- Zero manual content writing
- Managed crawl budget intelligently to maximize SEO impact

**Relevance:** Programmatic SEO, content automation, technical SEO, data-driven growth

---

## Story 4: Self-Healing Chatbot (<$0.005/Conversation)

**Situation:** Chatbot needed to handle real customer conversations at minimal cost while continuously improving from failures.

**Task:** Build production chatbot with comprehensive quality assurance and self-improvement capabilities.

**Action:**
- Built 71 automated evals before deployment (not after)
- Implemented 6-layer defense in depth: input validation, intent classification, tool access control, output validation, monitoring, human escalation
- Auto-generates new tests from real conversation failures
- Implemented voice support for accessibility and multi-modal interactions
- Cost optimization through efficient LLM usage patterns

**Result:**
- <$0.005 per conversation cost
- 71 automated evals catching regressions
- 6-layer defense preventing failures
- Voice support for multi-modal interactions
- System improves itself through auto-test generation

**Relevance:** LLMOps, evals, observability, responsible AI, cost optimization, production ML

---

## Story 5: Career-Ops Open Source (7,700+ GitHub Stars)

**Situation:** Needed systematic approach to job search that could evaluate opportunities objectively and generate tailored applications at scale.

**Task:** Build comprehensive AI-powered job search pipeline that others could also benefit from.

**Action:**
- Designed 14 skill modes covering entire job search workflow
- Built Claude Code agent-driven pipeline with Go TUI dashboard
- Implemented A-F scoring across 10 weighted dimensions preventing bad-fit applications
- Created batch processing for parallel evaluation with clean 200K contexts
- Built Playwright portal scraping, PDF generation, tracker system
- Made available in English and Spanish

**Result:**
- 7,700+ GitHub stars, 1,300+ forks
- Used to evaluate 740+ job offers, generate 100+ tailored CVs
- Landed Head of Applied AI role through systematic approach
- Featured in AI/ML communities and newsletters
- 24 languages supported through community contributions

**Relevance:** Open source, AI agents, systematic thinking, community building, Go/Node.js/Playwright

---

## Story 6: Enterprise Client Management (Marriott, Telefónica, Santander, Heineken)

**Situation:** Managed relationships and delivered solutions for enterprise clients including Marriott, Telefónica, Santander, and Heineken.

**Task:** Ensure high-quality delivery while maintaining client satisfaction and identifying additional opportunities.

**Action:**
- Built custom solutions for each client's specific needs
- Maintained regular communication and reporting
- Identified automation opportunities within each organization
- Delivered measurable ROI through implemented solutions
- Managed stakeholder expectations across different organizational levels

**Result:**
- Successful long-term relationships with Fortune 500 companies
- Multiple automation implementations saving hundreds of hours
- Generated referrals and additional business from satisfied clients
- Built reputation for reliable, production-ready delivery

**Relevance:** Enterprise sales, stakeholder management, client-facing skills, solution delivery

---

## Story 7: Company Exit (2025)

**Situation:** Built B2B/B2C device repair business over 16 years, scaled to 30,000+ repairs with enterprise clients.

**Task:** Transform operations through AI/automation to make business acquisition-ready and successfully exit.

**Action:**
- Systematically automated all operational processes
- Built Business OS and AI agent handling 90% of customer service
- Documented all systems and processes
- Demonstrated scalable, repeatable business model
- Negotiated and closed acquisition

**Result:**
- Successfully exited in 2025
- Business running as fully automated operation
- Proven track record of building and scaling
- Validated business acumen and execution ability

**Relevance:** Entrepreneurship, exit experience, business acumen, full-stack execution

---

## Story 8: AI Product Management Bootcamp (Winning Capstone)

**Situation:** Enrolled in AI Product Management Bootcamp at Maven to formalize product skills and validate approach.

**Task:** Complete bootcamp with winning capstone project demonstrating AI product thinking.

**Action:**
- Applied real-world experience from Jacobo and Business OS projects
- Structured approach to AI product discovery and delivery
- Demonstrated measurable impact and systematic thinking
- Presented capstone with clear problem-solution fit

**Result:**
- Won capstone competition
- Later became Teaching Fellow for same bootcamp (2026)
- Validated approach to AI product management
- Built network in AI PM community

**Relevance:** AI Product Management, teaching, community, formal validation

---

## Story 9: LICO Cosmetics Consulting (Airtable + Shopify)

**Situation:** E-commerce company needed internal systems for inventory management, order processing, and task coordination.

**Task:** Design Airtable-based internal OS and integrate with Shopify for real-time operations.

**Action:**
- Led co-design workshops with stakeholders
- Mapped all workflows and identified automation opportunities
- Designed Airtable system for inventory, orders, tasks
- Built Airtable-Shopify integration for real-time sync
- Trained team on new system

**Result:**
- Automated inventory management and order processing
- Real-time sync between Airtable and Shopify
- Enabled team to focus on growth instead of operations
- Generated case study for future consulting

**Relevance:** Consulting, workshops, Airtable, Shopify, e-commerce, stakeholder management

---

## Story 10: Everis (NTT DATA) -- Medical Coding with RL

**Situation:** Healthcare software needed intelligent medical coding recommendations across multi-vendor platform.

**Task:** Develop self-learning recommendation engine using Reinforcement Learning while managing QA for 8 testers.

**Action:**
- Coordinated functional testing across 8 testers and multiple vendors
- Developed RL-based medical coding recommendation engine
- Established quality assurance processes
- Managed distributed development teams

**Result:**
- Successful platform launch with intelligent coding
- Established QA processes adopted across teams
- Early experience with production ML systems
- Built foundation for later AI work

**Relevance:** Early ML experience, healthcare, QA, team coordination, RL

---

## Usage Notes

**When to use which story:**
- **Agentic AI / LLMOps roles:** Stories 1, 4, 5
- **Solutions Architect roles:** Stories 2, 6, 9
- **Product Manager roles:** Stories 2, 3, 8
- **Forward Deployed roles:** Stories 1, 6, 9
- **Leadership / Staff roles:** Stories 5, 7, 8
- **Enterprise roles:** Stories 6, 7, 9

**Customization tips:**
- Always tie back to the specific company's challenges
- Emphasize metrics that matter to them
- Show progression and learning
- Demonstrate both technical and business thinking
- Highlight end-to-end ownership

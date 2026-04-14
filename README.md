# OleScan

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38BDF8)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG--Focused-2E7D32)
![AI Assisted](https://img.shields.io/badge/Development-AI--Assisted-purple)
![Status](https://img.shields.io/badge/Status-Active_Development-orange)

OleScan is a developer-focused accessibility auditing tool that analyzes public webpages and produces structured accessibility reports with severity-based issue grouping, multiple affected elements per issue, and actionable guidance.

The goal of this project is to demonstrate accessibility knowledge, frontend architecture skills, API design, and modern AI-assisted engineering workflows in a real-world portfolio application.

---

# Project Status

OleScan is currently under active development.

Implemented:

- URL validation
- server-side HTML analysis pipeline
- axe-core based server-side accessibility analysis
- Playwright-based browser accessibility analysis
- dual-engine scan mode selection
- structured accessibility issue reporting
- severity-based scoring model
- grouped issue presentation
- multiple affected elements per issue
- manual accessibility review reminders
- scan lifecycle states (idle, loading, success, error)
- stale report detection when editing scanned URLs
- report metadata display
- browser-mode reporting note and mode-specific metadata

Planned:

- screenshot examples in README
- report export options (JSON / PDF)
- scan comparison between runs
- accessibility scoring transparency panel
- richer debugging metadata

---

# Why OleScan Exists

Accessibility tooling is often treated as a checkbox step late in development.

OleScan is designed to demonstrate how accessibility can be integrated earlier into engineering workflows by:

- identifying likely accessibility risks
- highlighting structural HTML issues
- prioritizing fixes by severity
- reinforcing manual accessibility review practices

The project intentionally focuses on **developer experience**, not just automated detection.

---

# Features

## Dual Engine Scanning

OleScan supports two analysis modes:

### Server DOM scan

A faster mode based on fetched HTML and server-side DOM analysis using `axe-core + jsdom`.

### Browser scan

A more realistic mode based on a live rendered page using `axe-core + Playwright`.

This makes the project more useful across both static and dynamic sites.

## URL Analysis Pipeline

Users can submit a public webpage URL and receive a structured accessibility report generated through a layered analysis pipeline.

Pipeline flow:

URL input  
→ validation  
→ engine selection  
→ HTML fetch or browser navigation  
→ audit execution  
→ result normalization  
→ severity scoring  
→ structured report response

## Severity-Based Issue Grouping

Accessibility findings are categorized into:

- critical
- serious
- moderate
- minor

This helps developers prioritize fixes efficiently.

## Multi-Node Issue Support

A single accessibility rule can fail in multiple places on the same page.

OleScan keeps and displays multiple affected elements for each issue, including:

- selector
- HTML snippet
- failure summary when available

This makes reports more useful for debugging and closer to real accessibility tooling workflows.

## Heuristic Accessibility Scoring

Each scan begins with a score of **100**.

Points are deducted based on severity:

- critical: −20
- serious: −10
- moderate: −5
- minor: −2

The score represents estimated accessibility risk, **not WCAG certification**.

## Manual Review Reminders

OleScan highlights accessibility concerns automated tools cannot reliably detect, including:

- keyboard navigation quality
- focus visibility
- screen reader reading order
- link purpose clarity
- form error messaging
- alt-text usefulness

These reminders reinforce real-world accessibility workflows.

## Report Lifecycle Awareness

The interface detects when a report becomes outdated after editing the scanned URL and prompts the user to rescan.

This prevents misleading results and improves usability.

---

# Tech Stack

Frontend:

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS

Backend:

- Next.js Route Handlers
- server-side HTML fetching
- axe-core accessibility analysis
- jsdom DOM environment
- Playwright browser automation

Current scan engines:

- axe-core + jsdom
- axe-core + Playwright

---

# Architecture Overview

OleScan uses a layered analyzer pipeline designed to separate responsibilities clearly.

Pipeline flow:

URL input  
→ validation  
→ engine mode selection  
→ server DOM scan or browser scan  
→ result normalization  
→ severity scoring  
→ structured report response

Core modules:

lib/analyzer/

validateUrl.ts  
fetchPageHtml.ts  
runAudit.ts  
runBrowserAudit.ts  
normalizeResults.ts  
buildSummary.ts  
getManualChecks.ts

Responsibilities are intentionally isolated so the audit engine can evolve independently from the UI layer.

---

# AI-Assisted Development

OleScan was intentionally developed using AI-assisted engineering workflows.

The goal of this project is not only to demonstrate accessibility tooling, but also to demonstrate how modern developers can collaborate effectively with AI to improve productivity, iteration speed, and architectural quality.

AI assistance was used for:

- architectural brainstorming
- component structure planning
- TypeScript modeling
- API route design
- accessibility rule exploration
- UX wording refinement
- documentation drafting
- implementation support during iteration and debugging

All generated output was reviewed, validated, and adjusted manually.

The project reflects a workflow where AI accelerates implementation while the developer remains responsible for:

- design decisions
- accessibility interpretation
- system structure
- code quality
- correctness verification

This mirrors how AI is increasingly used in professional frontend environments to improve productivity without replacing engineering judgment.

---

# Roadmap

Short term:

- add screenshots to the README
- improve score explanation and transparency
- expand report metadata and debugging context

Mid term:

- compare scan results between runs
- support richer reporting workflows
- improve scan accuracy for complex dynamic pages

Long term:

- export reports as JSON or PDF
- CI accessibility check integration
- accessibility regression tracking
- developer dashboard interface

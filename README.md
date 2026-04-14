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
- axe-core accessibility analysis (jsdom)
- Playwright browser accessibility analysis
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

- screenshots in README
- report export options (JSON / PDF)
- scan comparison between runs
- accessibility scoring transparency panel
- richer debugging metadata

---

# Getting Started

Follow these steps to run OleScan locally.

## 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/olescan.git
cd olescan

## 2. Install dependencies

npm install

## 3. Install Playwright browsers

OleScan supports browser-based accessibility scanning using Playwright.

npx playwright install

## 4. Start the development server

npm run dev

Open:

http://localhost:3000

in your browser.

---

# How to Use OleScan

1. Paste a public webpage URL

2. Choose scan mode:
   - Server DOM scan (faster)
   - Browser scan (Playwright) (more accurate for dynamic pages)

3. Click Run scan

4. Review:
   - severity score
   - grouped accessibility issues
   - affected elements
   - HTML snippets
   - manual accessibility review reminders

OleScan analyzes publicly accessible pages only.

---

# Why OleScan Exists

Accessibility tooling is often treated as a checkbox step late in development.

OleScan is designed to demonstrate how accessibility can be integrated earlier into engineering workflows by:

- identifying likely accessibility risks
- highlighting structural HTML issues
- prioritizing fixes by severity
- reinforcing manual accessibility review practices

The project intentionally focuses on developer experience, not just automated detection.

---

# Features

## Dual Engine Scanning

OleScan supports two analysis modes:

Server DOM scan
A faster mode based on fetched HTML and server-side DOM analysis using axe-core + jsdom.

Browser scan
A more realistic mode based on a live rendered page using axe-core + Playwright.

This makes OleScan effective across both static and dynamic websites.

---

## URL Analysis Pipeline

Pipeline flow:

URL input
→ validation
→ engine selection
→ HTML fetch or browser navigation
→ audit execution
→ result normalization
→ severity scoring
→ structured report response

---

## Severity-Based Issue Grouping

Accessibility findings are categorized into:

- critical
- serious
- moderate
- minor

This helps developers prioritize fixes efficiently.

---

## Multi-Node Issue Support

A single accessibility rule can fail in multiple places on the same page.

OleScan displays:

- selectors
- HTML snippets
- failure summaries (when available)

for each affected element.

---

## Heuristic Accessibility Scoring

Each scan begins with a score of 100.

Points deducted:

- critical: −20
- serious: −10
- moderate: −5
- minor: −2

This score represents estimated accessibility risk — not WCAG certification.

---

## Manual Review Reminders

OleScan highlights issues automated tools cannot reliably detect:

- keyboard navigation quality
- focus visibility
- screen reader reading order
- link purpose clarity
- form error messaging
- alt-text usefulness

These reinforce real-world accessibility workflows.

---

## Report Lifecycle Awareness

The interface detects when a report becomes outdated after editing the scanned URL and prompts the user to rescan.

This prevents misleading results.

---

# Tech Stack

Frontend:

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS

Backend:

- Next.js Route Handlers
- axe-core
- jsdom
- Playwright

Scan engines:

- axe-core + jsdom
- axe-core + Playwright

---

# Architecture Overview

OleScan uses a layered analyzer pipeline designed to separate responsibilities clearly.

Pipeline:

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

The goal of this project is to demonstrate how modern developers can collaborate effectively with AI to improve productivity while maintaining engineering ownership.

AI assistance supported:

- architecture planning
- TypeScript modeling
- analyzer pipeline design
- accessibility rule exploration
- component structure
- API route implementation
- documentation drafting
- debugging workflows

All generated output was reviewed and validated manually.

This reflects real-world AI-assisted development practices increasingly used in professional frontend teams.

---

# Roadmap

Short term:

- add screenshots to README
- improve score transparency explanation
- expand report metadata

Mid term:

- compare scan results between runs
- richer reporting workflows
- improved dynamic-page scan accuracy

Long term:

- export reports (JSON / PDF)
- CI accessibility integration
- regression tracking
- accessibility dashboard interface

---

# Project Goals

This project exists to demonstrate:

- accessibility awareness beyond automated tooling
- strong TypeScript architecture in strict mode
- API route design with Next.js App Router
- reusable UI component structure
- analyzer pipeline design
- dual-engine accessibility scanning
- product-level UX thinking
- modern AI-assisted engineering workflows

---

# Disclaimer

OleScan provides automated accessibility insights based on structured analysis techniques.

It does not certify WCAG compliance and should be used alongside manual accessibility testing.

Server DOM mode and browser mode may produce different results depending on how a page renders. This reflects real differences between static HTML analysis and live browser accessibility evaluation.

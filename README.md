# OleScan

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38BDF8)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG--Focused-2E7D32)
![AI Assisted](https://img.shields.io/badge/Development-AI--Assisted-purple)
![Status](https://img.shields.io/badge/Status-Active_Development-orange)

OleScan is a developer-focused accessibility auditing tool that analyzes public webpages and produces structured accessibility reports with severity-based issue grouping and actionable guidance.

The goal of this project is to demonstrate accessibility knowledge, frontend architecture skills, API design, and modern AI-assisted engineering workflows in a real-world portfolio application.

---

# Project Status

OleScan is currently under active development.

Implemented:

- URL validation
- server-side HTML analysis pipeline
- axe-core based server-side accessibility analysis
- structured accessibility issue reporting
- severity-based scoring model
- grouped issue presentation
- multiple affected elements per issue
- manual accessibility review reminders
- scan lifecycle states (idle, loading, success, error)
- stale report detection when editing scanned URLs
- report metadata display (URL + timestamp)

Planned:

- Playwright-based browser audit execution
- report export options (JSON / PDF)
- scan comparison between runs
- accessibility scoring transparency panel
- deeper report metadata and debugging tools

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

## URL Analysis Pipeline

Users can submit a public webpage URL and receive a structured accessibility report generated through a server-side analysis pipeline.

Pipeline flow:

URL input  
→ validation  
→ HTML fetch  
→ audit engine  
→ result normalization  
→ severity scoring  
→ structured report response

## axe-core Powered Analysis

OleScan now uses **axe-core** as the primary accessibility engine for automated rule detection.

This gives the project a stronger and more realistic audit foundation than a custom heuristic-only approach.

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

Browser audit foundation:

- Playwright

---

# Architecture Overview

OleScan uses a layered analyzer pipeline designed to separate responsibilities clearly.

Pipeline flow:

URL input  
→ validation  
→ HTML fetch  
→ axe-core audit execution in jsdom  
→ result normalization  
→ severity scoring  
→ structured report response

Core modules:

lib/analyzer/

validateUrl.ts  
fetchPageHtml.ts  
runAudit.ts  
normalizeResults.ts  
buildSummary.ts  
getManualChecks.ts

Responsibilities are intentionally isolated so the audit engine can evolve independently from the UI layer, including future upgrades from server-side DOM analysis to browser-based Playwright scanning.

---

# Accessibility Philosophy

OleScan does not attempt to replace manual accessibility audits.

Instead, it:

- identifies likely accessibility risks
- highlights structural issues
- prioritizes fixes by severity
- reminds developers what automated tools cannot detect

The report score is a heuristic indicator, **not a compliance certification**.

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

- improve score explanation and transparency
- expand report metadata and debugging context
- polish issue card readability for dense results

Mid term:

- connect Playwright-based browser scanning
- compare scan results between runs
- support richer reporting workflows
- improve scan accuracy for dynamic pages

Long term:

- export reports as JSON or PDF
- CI accessibility check integration
- accessibility regression tracking
- developer dashboard interface

---

# Project Goals

This project exists to demonstrate:

- accessibility awareness beyond automated tooling
- strong TypeScript architecture (strict mode)
- API route design using Next.js App Router
- reusable UI component structure
- product-level UX thinking
- analyzer pipeline design
- modern AI-assisted engineering workflows

---

# Disclaimer

OleScan provides heuristic accessibility insights based on automated analysis techniques.

It does **not** certify WCAG compliance and should be used as a development support tool alongside manual accessibility testing.

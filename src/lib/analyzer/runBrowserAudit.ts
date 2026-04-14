import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import type { RawAuditResult, Severity } from "@/types/audit";

type BrowserViolationNode = {
	target: unknown[];
	html?: string;
	failureSummary?: string;
};

type BrowserViolation = {
	id: string;
	impact?: string | null;
	description: string;
	help: string;
	helpUrl?: string;
	nodes: BrowserViolationNode[];
};

type BrowserRunResult = {
	violations: BrowserViolation[];
};

const impactMap: Record<string, Severity> = {
	critical: "critical",
	serious: "serious",
	moderate: "moderate",
	minor: "minor",
};

// Runs axe-core inside a live Playwright browser page.
// This captures the rendered DOM instead of only fetched HTML.
export async function runBrowserAudit(url: string): Promise<RawAuditResult> {
	const browser = await chromium.launch({
		headless: true,
	});

	try {
		const page = await browser.newPage();

		const axeSource = await loadAxeSource();

		await page.addInitScript({
			content: axeSource,
		});

		await page.goto(url, {
			waitUntil: "domcontentloaded",
			timeout: 30_000,
		});

		await page.waitForLoadState("networkidle");

		const result = await page.evaluate(async () => {
			const browserWindow = window as Window &
				typeof globalThis & {
					axe?: {
						run: () => Promise<BrowserRunResult>;
					};
				};

			if (!browserWindow.axe) {
				throw new Error("axe was not available in the browser context");
			}

			return browserWindow.axe.run();
		});

		return {
			issues: result.violations.map((violation) => ({
				id: violation.id,
				impact: normalizeImpact(violation.impact),
				description: violation.description,
				help: violation.help,
				helpUrl: violation.helpUrl,
				nodes: violation.nodes.map((node) => ({
					target: node.target.map((item) => String(item)),
					html: node.html,
					failureSummary: node.failureSummary,
				})),
			})),
		};
	} catch (error) {
		console.error("Playwright browser audit error:", error);
		throw error;
	} finally {
		await browser.close();
	}
}

async function loadAxeSource(): Promise<string> {
	const axePath = path.join(process.cwd(), "node_modules", "axe-core", "axe.min.js");

	return readFile(axePath, "utf8");
}

function normalizeImpact(impact: string | null | undefined): Severity {
	if (!impact) {
		return "minor";
	}

	return impactMap[impact] ?? "minor";
}

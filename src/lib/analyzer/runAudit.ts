import { readFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import type { RawAuditResult, Severity } from "@/types/audit";

type AxeViolationNode = {
	target: unknown[];
	html?: string;
	failureSummary?: string;
};

type AxeViolation = {
	id: string;
	impact?: string | null;
	description: string;
	help: string;
	helpUrl?: string;
	nodes: AxeViolationNode[];
};

type AxeRunResult = {
	violations: AxeViolation[];
};

type AxeRunner = {
	run: (context?: Document | Element) => Promise<AxeRunResult>;
};

type AxeWindowShim = {
	axe?: AxeRunner;
	module?: {
		exports?: Partial<AxeRunner>;
	};
	exports?: unknown;
	eval: (code: string) => unknown;
	document: Document;
	close: () => void;
};

const impactMap: Record<string, Severity> = {
	critical: "critical",
	serious: "serious",
	moderate: "moderate",
	minor: "minor",
};

// Runs axe-core against fetched page HTML using JSDOM.
// axe is loaded from the installed axe.min.js bundle and executed in the JSDOM window.
export async function runAudit(html: string): Promise<RawAuditResult> {
	const dom = new JSDOM(html, {
		runScripts: "outside-only",
	});

	const shimWindow = dom.window as unknown as AxeWindowShim;

	try {
		const axeSource = await loadAxeSource();

		shimWindow.module = { exports: {} };
		shimWindow.exports = shimWindow.module.exports;

		shimWindow.eval(axeSource);

		const axeRunner: Partial<AxeRunner> | undefined = shimWindow.axe ?? shimWindow.module?.exports;

		if (!axeRunner?.run) {
			throw new Error("axe-core failed to initialize inside the JSDOM window.");
		}

		const result = await axeRunner.run(shimWindow.document);

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
	} finally {
		shimWindow.close();
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

import axe from "axe-core";
import { JSDOM } from "jsdom";
import type { RawAuditResult, Severity } from "@/types/audit";

const impactMap: Record<string, Severity> = {
	critical: "critical",
	serious: "serious",
	moderate: "moderate",
	minor: "minor",
};

// Runs axe-core against fetched page HTML using JSDOM.
// This is the current real analysis engine for OleScan.
export async function runAudit(html: string): Promise<RawAuditResult> {
	const dom = new JSDOM(html);
	const { window } = dom;

	const previousWindow = globalThis.window;
	const previousDocument = globalThis.document;
	const previousNode = globalThis.Node;
	const previousElement = globalThis.Element;
	const previousDocumentFragment = globalThis.DocumentFragment;
	const previousHTMLElement = globalThis.HTMLElement;
	const previousSVGElement = globalThis.SVGElement;

	try {
		globalThis.window = window as unknown as typeof globalThis.window;
		globalThis.document = window.document as unknown as typeof globalThis.document;
		globalThis.Node = window.Node as unknown as typeof globalThis.Node;
		globalThis.Element = window.Element as unknown as typeof globalThis.Element;
		globalThis.DocumentFragment =
			window.DocumentFragment as unknown as typeof globalThis.DocumentFragment;
		globalThis.HTMLElement = window.HTMLElement as unknown as typeof globalThis.HTMLElement;
		globalThis.SVGElement = window.SVGElement as unknown as typeof globalThis.SVGElement;

		const result = await axe.run(window.document);

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
		globalThis.window = previousWindow;
		globalThis.document = previousDocument;
		globalThis.Node = previousNode;
		globalThis.Element = previousElement;
		globalThis.DocumentFragment = previousDocumentFragment;
		globalThis.HTMLElement = previousHTMLElement;
		globalThis.SVGElement = previousSVGElement;
		window.close();
	}
}

function normalizeImpact(impact: string | null | undefined): Severity {
	if (!impact) {
		return "minor";
	}

	return impactMap[impact] ?? "minor";
}

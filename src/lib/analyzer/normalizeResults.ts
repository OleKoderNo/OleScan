import type { AuditIssue, RawAuditResult, Severity } from "@/types/audit";

const ruleTitleMap: Record<string, string> = {
	"button-name": "Buttons must have an accessible name",
	"document-title": "Documents must have a title",
	"html-has-lang": "HTML element must have a language",
	"image-alt": "Images must have alternative text",
	"landmark-one-main": "Document should have one main landmark",
};

// Converts raw audit engine output into OleScan's normalized issue format.
// This keeps UI components independent from engine-specific data shapes.
export function normalizeResults(result: RawAuditResult): AuditIssue[] {
	return result.issues.map((issue) => {
		const firstNode = issue.nodes[0];

		return {
			id: issue.id,
			title: formatRuleTitle(issue.id),
			severity: normalizeSeverity(issue.impact),
			description: issue.description,
			help: issue.help,
			helpUrl: issue.helpUrl,
			selector: firstNode?.target[0],
			htmlSnippet: firstNode?.html,
		};
	});
}

function normalizeSeverity(impact?: Severity): Severity {
	if (!impact) {
		return "minor";
	}

	return impact;
}

function formatRuleTitle(ruleId: string): string {
	const mappedTitle = ruleTitleMap[ruleId];

	if (mappedTitle) {
		return mappedTitle;
	}

	return ruleId
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

import type { AuditIssue, RawAuditResult, Severity } from "@/types/audit";

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

// Converts engine severity into OleScan severity.
// Falls back to "minor" if impact is missing.
function normalizeSeverity(impact?: Severity): Severity {
	if (!impact) {
		return "minor";
	}

	return impact;
}

// Converts rule ids like "image-alt" into cleaner display titles.
function formatRuleTitle(ruleId: string): string {
	return ruleId
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

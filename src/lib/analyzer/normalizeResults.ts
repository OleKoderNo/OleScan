import type { AuditIssue, RawAuditResult, Severity } from "@/types/audit";

const ruleTitleMap: Record<string, string> = {
	"alt-text-quality": "Alternative text should be meaningful",
};

// Converts raw audit engine output into OleScan's normalized issue format.
// This keeps UI components independent from engine-specific data shapes.
export function normalizeResults(result: RawAuditResult): AuditIssue[] {
	return result.issues.map((issue) => {
		const firstNode = issue.nodes[0];

		return {
			id: issue.id,
			title: formatRuleTitle(issue.id, issue.help),
			severity: normalizeSeverity(issue.impact),
			description: buildDescription(issue.description, firstNode?.failureSummary),
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

function formatRuleTitle(ruleId: string, help: string): string {
	const mappedTitle = ruleTitleMap[ruleId];

	if (mappedTitle) {
		return mappedTitle;
	}

	return help;
}

function buildDescription(description: string, failureSummary?: string): string {
	if (!failureSummary) {
		return description;
	}

	return `${description} ${failureSummary}`;
}

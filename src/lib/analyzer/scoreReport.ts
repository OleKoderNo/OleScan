import type { AuditIssue, Severity } from "@/types/audit";

// Penalty values for each severity level.
// This is a project score system, not official WCAG scoring.
const severityPenaltyMap: Record<Severity, number> = {
	critical: 20,
	serious: 10,
	moderate: 5,
	minor: 2,
};

// Calculates the project score from a list of issue severities.
// Start at 100 and subtract points based on issue severity.
// The minimum allowed score is 0.
export function scoreReport(severities: Severity[]): number {
	const score = severities.reduce((total, severity) => {
		return total - severityPenaltyMap[severity];
	}, 100);

	return Math.max(0, score);
}

// Convenience helper for working directly with issue objects.
// This keeps API route code cleaner.
export function scoreIssues(issues: AuditIssue[]): number {
	const severities = issues.map((issue) => issue.severity);
	return scoreReport(severities);
}

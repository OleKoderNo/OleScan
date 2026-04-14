import type { Severity } from "@/types/audit";

// Penalty values for each severity level.
// This is a project score system, not official WCAG scoring.
const severityPenaltyMap: Record<Severity, number> = {
	critical: 20,
	serious: 10,
	moderate: 5,
	minor: 2,
};

// Start at 100 and subtract points based on issue severity.
// The minimum allowed score is 0.
export function scoreReport(severities: Severity[]): number {
	const score = severities.reduce((total, severity) => {
		return total - severityPenaltyMap[severity];
	}, 100);

	return Math.max(0, score);
}

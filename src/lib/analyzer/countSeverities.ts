import type { AuditIssue } from "@/types/audit";

type SeverityCounts = {
	criticalCount: number;
	seriousCount: number;
	moderateCount: number;
	minorCount: number;
};

// Counts issue totals for each severity bucket.
// This is used later to build the report summary.
export function countSeverities(issues: AuditIssue[]): SeverityCounts {
	return issues.reduce<SeverityCounts>(
		(counts, issue) => {
			if (issue.severity === "critical") {
				counts.criticalCount += 1;
			}

			if (issue.severity === "serious") {
				counts.seriousCount += 1;
			}

			if (issue.severity === "moderate") {
				counts.moderateCount += 1;
			}

			if (issue.severity === "minor") {
				counts.minorCount += 1;
			}

			return counts;
		},
		{
			criticalCount: 0,
			seriousCount: 0,
			moderateCount: 0,
			minorCount: 0,
		},
	);
}

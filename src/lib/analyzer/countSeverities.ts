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
			switch (issue.severity) {
				case "critical":
					counts.criticalCount += 1;
					break;
				case "serious":
					counts.seriousCount += 1;
					break;
				case "moderate":
					counts.moderateCount += 1;
					break;
				case "minor":
					counts.minorCount += 1;
					break;
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

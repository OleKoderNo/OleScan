import { countSeverities } from "@/lib/analyzer/countSeverities";
import { scoreIssues } from "@/lib/analyzer/scoreReport";
import type { AuditIssue, AuditSummary } from "@/types/audit";

// Builds the report summary from a normalized issue list.
// This keeps summary logic in one place and avoids duplication.
export function buildSummary(issues: AuditIssue[]): AuditSummary {
	const counts = countSeverities(issues);

	return {
		score: scoreIssues(issues),
		totalIssues: issues.length,
		criticalCount: counts.criticalCount,
		seriousCount: counts.seriousCount,
		moderateCount: counts.moderateCount,
		minorCount: counts.minorCount,
	};
}

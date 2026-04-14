import type { AuditIssue } from "@/types/audit";

type GroupedIssues = {
	critical: AuditIssue[];
	serious: AuditIssue[];
	moderate: AuditIssue[];
	minor: AuditIssue[];
};

// Groups issues into severity buckets.
// This keeps rendering components simpler and easier to read.
export function groupIssuesBySeverity(issues: AuditIssue[]): GroupedIssues {
	return issues.reduce<GroupedIssues>(
		(groups, issue) => {
			groups[issue.severity].push(issue);
			return groups;
		},
		{
			critical: [],
			serious: [],
			moderate: [],
			minor: [],
		},
	);
}

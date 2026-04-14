import { IssueCard } from "@/components/analyzer/IssueCard";
import { groupIssuesBySeverity } from "@/lib/analyzer/groupIssuesBySeverity";
import type { AuditIssue, Severity } from "@/types/audit";

type IssueListProps = {
	issues: AuditIssue[];
};

type SeveritySectionProps = {
	severity: Severity;
	issues: AuditIssue[];
};

// Renders a single severity section with its issues.
function SeveritySection({ severity, issues }: SeveritySectionProps) {
	if (issues.length === 0) {
		return null;
	}

	return (
		<section className="space-y-4">
			<div>
				<h3 className="text-lg font-semibold capitalize text-zinc-100">{severity}</h3>
			</div>

			<div className="space-y-4">
				{issues.map((issue) => (
					<IssueCard key={issue.id} issue={issue} />
				))}
			</div>
		</section>
	);
}

// Renders accessibility issues grouped by severity level.
export function IssueList({ issues }: IssueListProps) {
	const groupedIssues = groupIssuesBySeverity(issues);

	return (
		<section className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-zinc-100">Issues</h2>
				<p className="mt-2 text-sm text-zinc-400">Accessibility findings grouped by severity.</p>
			</div>

			<SeveritySection severity="critical" issues={groupedIssues.critical} />
			<SeveritySection severity="serious" issues={groupedIssues.serious} />
			<SeveritySection severity="moderate" issues={groupedIssues.moderate} />
			<SeveritySection severity="minor" issues={groupedIssues.minor} />
		</section>
	);
}

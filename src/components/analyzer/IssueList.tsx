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

const severityDescriptionMap: Record<Severity, string> = {
	critical: "Issues with the highest impact on accessibility.",
	serious: "High-impact issues that should be fixed early.",
	moderate: "Important issues that still affect usability.",
	minor: "Lower-impact issues that still improve accessibility.",
};

const severityOrder: Severity[] = ["critical", "serious", "moderate", "minor"];

// Renders a single severity section with its issues.
function SeveritySection({ severity, issues }: SeveritySectionProps) {
	if (issues.length === 0) {
		return null;
	}

	return (
		<section className="space-y-4">
			<div>
				<h3 className="text-lg font-semibold capitalize text-zinc-100">
					{severity} ({issues.length})
				</h3>
				<p className="mt-1 text-sm text-zinc-400">{severityDescriptionMap[severity]}</p>
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
	if (issues.length === 0) {
		return (
			<section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
				<h2 className="text-xl font-semibold text-zinc-100">Issues</h2>
				<p className="mt-2 text-sm leading-6 text-zinc-400">
					No automated issues were found in this scan. That is a useful signal, but it does not
					guarantee the page is fully accessible.
				</p>
			</section>
		);
	}

	const groupedIssues = groupIssuesBySeverity(issues);

	return (
		<section className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-zinc-100">Issues</h2>
				<p className="mt-2 text-sm leading-6 text-zinc-400">
					Review findings from highest to lowest severity. Start with critical and serious issues
					first, then work through moderate and minor improvements.
				</p>
			</div>

			{severityOrder.map((severity) => (
				<SeveritySection key={severity} severity={severity} issues={groupedIssues[severity]} />
			))}
		</section>
	);
}

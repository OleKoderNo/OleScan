import { IssueCard } from "@/components/analyzer/IssueCard";
import type { AuditIssue } from "@/types/audit";

type IssueListProps = {
	issues: AuditIssue[];
};

// Renders all accessibility issues in a stacked list.
export function IssueList({ issues }: IssueListProps) {
	return (
		<section className="space-y-4">
			<div>
				<h2 className="text-xl font-semibold text-zinc-100">Issues</h2>
				<p className="mt-2 text-sm text-zinc-400">Grouped accessibility findings from the scan.</p>
			</div>

			<div className="space-y-4">
				{issues.map((issue) => (
					<IssueCard key={issue.id} issue={issue} />
				))}
			</div>
		</section>
	);
}

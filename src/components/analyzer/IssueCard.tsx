import { SeverityBadge } from "@/components/analyzer/SeverityBadge";
import type { AuditIssue } from "@/types/audit";

type IssueCardProps = {
	issue: AuditIssue;
};

// Displays one accessibility issue with context, suggested fix,
// and all known failing occurrences for that rule.
export function IssueCard({ issue }: IssueCardProps) {
	return (
		<article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-2">
					<SeverityBadge severity={issue.severity} />

					<h3 className="text-lg font-semibold text-zinc-100">{issue.title}</h3>
				</div>
			</div>

			<div className="mt-4 space-y-4">
				<div>
					<h4 className="text-sm font-semibold text-zinc-200">Why it matters</h4>
					<p className="mt-2 text-sm leading-6 text-zinc-300">{issue.description}</p>
				</div>

				<div>
					<h4 className="text-sm font-semibold text-zinc-200">How to fix it</h4>
					<p className="mt-2 text-sm leading-6 text-zinc-300">{issue.help}</p>
				</div>

				{issue.occurrences.length > 0 && (
					<div>
						<h4 className="text-sm font-semibold text-zinc-200">Affected elements</h4>

						<ul className="mt-3 space-y-3">
							{issue.occurrences.map((occurrence, index) => (
								<li
									key={`${issue.id}-${index}`}
									className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3"
								>
									{occurrence.selector && (
										<div>
											<p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
												Selector
											</p>
											<code className="mt-1 block overflow-x-auto text-sm text-zinc-300">
												{occurrence.selector}
											</code>
										</div>
									)}

									{occurrence.htmlSnippet && (
										<div className="mt-3">
											<p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
												HTML snippet
											</p>
											<code className="mt-1 block overflow-x-auto text-sm text-zinc-300">
												{occurrence.htmlSnippet}
											</code>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				)}

				{issue.helpUrl && (
					<a
						href={issue.helpUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex text-sm font-medium text-zinc-200 underline underline-offset-4 hover:text-zinc-100"
					>
						Read more about this rule
					</a>
				)}
			</div>
		</article>
	);
}

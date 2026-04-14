import type { AuditSummary } from "@/types/audit";

type SummaryCardsProps = {
	summary: AuditSummary;
};

const scoreDescription = "OleScan starts at 100 and subtracts points based on issue severity.";

// Displays top-level report numbers in small reusable cards.
export function SummaryCards({ summary }: SummaryCardsProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
			<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm text-zinc-400">Score</p>
				<p className="mt-2 text-2xl font-bold text-zinc-100">{summary.score}</p>
				<p className="mt-2 text-xs leading-5 text-zinc-500">{scoreDescription}</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm text-zinc-400">Total issues</p>
				<p className="mt-2 text-2xl font-bold text-zinc-100">{summary.totalIssues}</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm text-zinc-400">Critical</p>
				<p className="mt-2 text-2xl font-bold text-zinc-100">{summary.criticalCount}</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm text-zinc-400">Serious</p>
				<p className="mt-2 text-2xl font-bold text-zinc-100">{summary.seriousCount}</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm text-zinc-400">Moderate + minor</p>
				<p className="mt-2 text-2xl font-bold text-zinc-100">
					{summary.moderateCount + summary.minorCount}
				</p>
			</div>
		</div>
	);
}

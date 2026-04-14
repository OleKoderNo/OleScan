import type { ManualCheck } from "@/types/audit";

type ManualChecksProps = {
	checks: ManualCheck[];
};

// Displays reminders for accessibility concerns that still need human review.
export function ManualChecks({ checks }: ManualChecksProps) {
	return (
		<section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
			<div>
				<h2 className="text-xl font-semibold text-zinc-100">Manual review</h2>
				<p className="mt-2 text-sm text-zinc-400">
					Automated tools can detect many technical issues, but they cannot fully judge clarity,
					usability, or real user experience.
				</p>
			</div>

			<div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
				<p className="text-sm leading-6 text-zinc-300">
					A page can pass automated checks and still be frustrating to use. These reminders help
					keep the report grounded in real accessibility work, not just rule matching.
				</p>
			</div>

			<ul className="mt-6 grid gap-4 sm:grid-cols-2">
				{checks.map((check, index) => (
					<li key={check.id} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
						<div className="space-y-3">
							<span className="inline-flex rounded-full border border-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-300">
								Check {index + 1}
							</span>

							<h3 className="text-base font-semibold text-zinc-100">{check.title}</h3>

							<p className="text-sm leading-6 text-zinc-300">{check.description}</p>

							<p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
								Requires human judgment
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

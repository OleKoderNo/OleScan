// Empty state shown before the user has analyzed a page.
// This helps the interface feel complete even before results exist.
export function EmptyState() {
	return (
		<div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-8 text-center">
			<h2 className="text-xl font-semibold text-zinc-100">No report yet</h2>

			<p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
				Enter a public URL above to run your first accessibility scan. OleScan will later show a
				project score, grouped issues, and manual review reminders here.
			</p>
		</div>
	);
}

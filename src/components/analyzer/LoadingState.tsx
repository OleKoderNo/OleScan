// Loading state shown while the URL is being analyzed.
// This gives clear feedback so the interface does not feel frozen.
export function LoadingState() {
	return (
		<div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8" aria-live="polite">
			<div className="flex items-center gap-3">
				<div
					className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-zinc-100"
					aria-hidden="true"
				/>

				<p className="text-sm font-medium text-zinc-200 sm:text-base">
					Running accessibility scan...
				</p>
			</div>

			<p className="mt-3 text-sm leading-6 text-zinc-400">
				OleScan is preparing a structured report for the submitted page.
			</p>
		</div>
	);
}

type ErrorStateProps = {
	message: string;
};

// Error state shown when the scan request fails.
// Receives a message so it can be reused for different failure cases later.
export function ErrorState({ message }: ErrorStateProps) {
	return (
		<div
			className="rounded-2xl border border-red-900/60 bg-red-950/30 p-8"
			role="alert"
			aria-live="assertive"
		>
			<h2 className="text-xl font-semibold text-red-200">Scan failed</h2>

			<p className="mt-3 text-sm leading-6 text-red-100/90 sm:text-base">{message}</p>
		</div>
	);
}

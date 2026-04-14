import type { AuditMetadata } from "@/types/audit";

type ReportMetadataPanelProps = {
	url: string;
	metadata: AuditMetadata;
};

// Displays high-level metadata about the current scan.
export function ReportMetadataPanel({ url, metadata }: ReportMetadataPanelProps) {
	const formattedScannedAt = new Date(metadata.scannedAt).toLocaleString();

	return (
		<section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
			<h2 className="text-lg font-semibold text-zinc-100">Scan complete</h2>

			<p className="mt-2 text-sm leading-6 text-zinc-400">
				Review the scan details below to understand what was analyzed and how this report was
				generated.
			</p>

			<div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Scanned URL</p>
					<p className="mt-1 break-all text-sm text-zinc-300">{url}</p>
				</div>

				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Scanned at</p>
					<p className="mt-1 text-sm text-zinc-300">{formattedScannedAt}</p>
				</div>

				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Engine</p>
					<p className="mt-1 text-sm text-zinc-300">{metadata.engine}</p>
				</div>

				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
						Affected elements
					</p>
					<p className="mt-1 text-sm text-zinc-300">{metadata.totalOccurrences}</p>
				</div>
			</div>
		</section>
	);
}

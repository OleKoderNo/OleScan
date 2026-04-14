import type { Severity } from "@/types/audit";

type SeverityBadgeProps = {
	severity: Severity;
};

// Small badge used to highlight issue severity consistently.
export function SeverityBadge({ severity }: SeverityBadgeProps) {
	const severityClassMap: Record<Severity, string> = {
		critical: "border-red-800 bg-red-950/40 text-red-200",
		serious: "border-orange-800 bg-orange-950/40 text-orange-200",
		moderate: "border-yellow-800 bg-yellow-950/40 text-yellow-200",
		minor: "border-blue-800 bg-blue-950/40 text-blue-200",
	};

	return (
		<span
			className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${severityClassMap[severity]}`}
		>
			{severity}
		</span>
	);
}

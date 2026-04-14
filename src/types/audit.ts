// Allowed severity levels in the normalized report.
export type Severity = "critical" | "serious" | "moderate" | "minor";

// A single accessibility issue shown in the report UI.
export type AuditIssue = {
	id: string;
	title: string;
	severity: Severity;
	description: string;
	help: string;
	helpUrl?: string;
	selector?: string;
	htmlSnippet?: string;
};

// Summary information shown at the top of the report.
export type AuditSummary = {
	score: number;
	totalIssues: number;
	criticalCount: number;
	seriousCount: number;
	moderateCount: number;
	minorCount: number;
};

// Manual checks are reminders for things automated tools cannot fully verify.
export type ManualCheck = {
	id: string;
	title: string;
	description: string;
};

// Full report shape returned from the analyzer.
export type AuditReport = {
	url: string;
	summary: AuditSummary;
	issues: AuditIssue[];
	manualChecks: ManualCheck[];
};

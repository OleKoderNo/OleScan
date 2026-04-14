// Allowed severity levels in the normalized report.
export type Severity = "critical" | "serious" | "moderate" | "minor";

export type AuditIssueOccurrence = {
	selector?: string;
	htmlSnippet?: string;
	failureSummary?: string;
};

// A single accessibility issue shown in the report UI.
export type AuditIssue = {
	id: string;
	title: string;
	severity: Severity;
	description: string;
	help: string;
	helpUrl?: string;
	occurrences: AuditIssueOccurrence[];
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
	scannedAt: string;
	summary: AuditSummary;
	issues: AuditIssue[];
	manualChecks: ManualCheck[];
};

// Raw node target from an underlying audit engine.
export type RawAuditNode = {
	target: string[];
	html?: string;
	failureSummary?: string;
};

// Raw issue from the audit engine before OleScan converts it
// into a cleaner UI-friendly issue object.
export type RawAuditIssue = {
	id: string;
	impact?: Severity;
	description: string;
	help: string;
	helpUrl?: string;
	nodes: RawAuditNode[];
};

// Raw audit result returned by the analysis engine layer.
export type RawAuditResult = {
	issues: RawAuditIssue[];
};

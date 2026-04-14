import type { RawAuditResult } from "@/types/audit";

// Placeholder for future Playwright-based accessibility analysis.
// This file exists so browser-mode scanning can be added without
// reshaping the current server-side analyzer pipeline.
export async function runBrowserAudit(_url: string): Promise<RawAuditResult> {
	throw new Error("Browser-based audit mode is not implemented yet.");
}

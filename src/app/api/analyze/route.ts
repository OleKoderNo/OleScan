import { NextRequest, NextResponse } from "next/server";
import { buildSummary } from "@/lib/analyzer/buildSummary";
import { fetchPageHtml } from "@/lib/analyzer/fetchPageHtml";
import { getManualChecks } from "@/lib/analyzer/getManualChecks";
import { normalizeResults } from "@/lib/analyzer/normalizeResults";
import { runAudit } from "@/lib/analyzer/runAudit";
import { validateUrl } from "@/lib/analyzer/validateUrl";
import type { AuditReport } from "@/types/audit";

// API route for accessibility analysis.
// Current flow:
// 1. validate URL
// 2. fetch page HTML
// 3. run audit engine
// 4. normalize raw results
// 5. build report summary
// 6. return OleScan report
export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as { url?: string };
		const url = body.url?.trim() ?? "";

		const validationResult = validateUrl(url);

		if (!validationResult.isValid) {
			return NextResponse.json(
				{
					message: validationResult.error ?? "Invalid URL.",
				},
				{
					status: 400,
				},
			);
		}

		const html = await fetchPageHtml(url);
		const rawResult = await runAudit(html);
		const issues = normalizeResults(rawResult);

		const report: AuditReport = {
			url,
			scannedAt: new Date().toISOString(),
			summary: buildSummary(issues),
			issues,
			manualChecks: getManualChecks(),
		};

		return NextResponse.json(report, { status: 200 });
	} catch (error) {
		console.error("OleScan analyze route error:", error);

		const message = error instanceof Error ? error.message : `Unknown error: ${String(error)}`;

		return NextResponse.json(
			{
				message,
			},
			{
				status: 500,
			},
		);
	}
}

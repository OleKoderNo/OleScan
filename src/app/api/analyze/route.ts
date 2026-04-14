export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { buildSummary } from "@/lib/analyzer/buildSummary";
import { fetchPageHtml } from "@/lib/analyzer/fetchPageHtml";
import { getManualChecks } from "@/lib/analyzer/getManualChecks";
import { normalizeResults } from "@/lib/analyzer/normalizeResults";
import { runAudit } from "@/lib/analyzer/runAudit";
import { runBrowserAudit } from "@/lib/analyzer/runBrowserAudit";
import { validateUrl } from "@/lib/analyzer/validateUrl";
import type { AuditEngineMode, AuditReport } from "@/types/audit";

// API route for accessibility analysis.
// Supports both server DOM and browser-based audit modes.
export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as {
			url?: string;
			engineMode?: AuditEngineMode;
		};

		const url = body.url?.trim() ?? "";
		const engineMode: AuditEngineMode = body.engineMode ?? "server-dom";

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

		const rawResult =
			engineMode === "browser" ? await runBrowserAudit(url) : await runServerDomAudit(url);

		const issues = normalizeResults(rawResult);

		const totalOccurrences = issues.reduce((total, issue) => {
			return total + issue.occurrences.length;
		}, 0);

		const report: AuditReport = {
			url,
			metadata: {
				engine: engineMode === "browser" ? "axe-core + Playwright" : "axe-core + jsdom",
				engineMode,
				scannedAt: new Date().toISOString(),
				totalOccurrences,
			},
			summary: buildSummary(issues),
			issues,
			manualChecks: getManualChecks(),
		};

		return NextResponse.json(report, { status: 200 });
	} catch (error) {
		console.error("OleScan analyze route error:", error);

		const message = getFriendlyErrorMessage(error);

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

async function runServerDomAudit(url: string) {
	const html = await fetchPageHtml(url);
	return runAudit(html);
}

function getFriendlyErrorMessage(error: unknown): string {
	if (!(error instanceof Error)) {
		return "Something went wrong while analyzing the URL.";
	}

	const lowerMessage = error.message.toLowerCase();

	if (lowerMessage.includes("timeout")) {
		return "The scan timed out before the page finished loading.";
	}

	if (lowerMessage.includes("net::err")) {
		return "The page could not be reached in browser mode.";
	}

	if (lowerMessage.includes("axe was not available")) {
		return "Browser scan setup failed before accessibility analysis could begin.";
	}

	return error.message;
}

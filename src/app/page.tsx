"use client";

import { useState } from "react";
import { EmptyState } from "@/components/analyzer/EmptyState";
import { ErrorState } from "@/components/analyzer/ErrorState";
import { IssueList } from "@/components/analyzer/IssueList";
import { LoadingState } from "@/components/analyzer/LoadingState";
import { ManualChecks } from "@/components/analyzer/ManualChecks";
import { SummaryCards } from "@/components/analyzer/SummaryCards";
import { UrlForm } from "@/components/analyzer/UrlForm";
import type { AuditReport } from "@/types/audit";

type RequestState = "idle" | "loading" | "success" | "error";

// Main app page.
// Handles the request lifecycle and renders report components when data exists.
export default function HomePage() {
	const [requestState, setRequestState] = useState<RequestState>("idle");
	const [report, setReport] = useState<AuditReport | null>(null);
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmitUrl(url: string) {
		setRequestState("loading");
		setErrorMessage("");
		setReport(null);

		try {
			const response = await fetch("/api/analyze", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				const errorData = (await response.json()) as { message?: string };

				setRequestState("error");
				setErrorMessage(errorData.message ?? "Failed to analyze the submitted URL.");
				return;
			}

			const reportData = (await response.json()) as AuditReport;

			setReport(reportData);
			setRequestState("success");
		} catch {
			setRequestState("error");
			setErrorMessage("Unable to reach the analyzer. Please try again.");
		}
	}

	return (
		<main className="min-h-screen bg-zinc-950 text-zinc-100">
			<section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
				<header className="max-w-3xl">
					<p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
						Accessibility auditing tool
					</p>

					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">OleScan</h1>

					<p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
						Paste in a public URL and get a structured accessibility report with grouped issues,
						severity-based scoring, and manual review reminders.
					</p>
				</header>

				<section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm">
					<UrlForm onSubmitUrl={handleSubmitUrl} />
				</section>

				{requestState === "idle" && <EmptyState />}
				{requestState === "loading" && <LoadingState />}
				{requestState === "error" && <ErrorState message={errorMessage} />}

				{requestState === "success" && report && (
					<section className="space-y-6">
						<div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
							<h2 className="text-lg font-semibold text-zinc-100">Scan complete</h2>

							<p className="mt-2 break-all text-sm text-zinc-300 sm:text-base">{report.url}</p>
						</div>

						<div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
							<p className="text-sm leading-6 text-zinc-300">
								This report is based on an automated heuristic scan. It can help surface likely
								accessibility issues, but it does not replace manual review or formal WCAG
								conformance testing.
							</p>
						</div>

						<SummaryCards summary={report.summary} />
						<IssueList issues={report.issues} />
						<ManualChecks checks={report.manualChecks} />
					</section>
				)}
			</section>
		</main>
	);
}

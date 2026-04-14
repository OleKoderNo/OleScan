"use client";

import { useState } from "react";
import { EmptyState } from "@/components/analyzer/EmptyState";
import { ErrorState } from "@/components/analyzer/ErrorState";
import { LoadingState } from "@/components/analyzer/LoadingState";
import { UrlForm } from "@/components/analyzer/UrlForm";
import type { AuditReport } from "@/types/audit";

type RequestState = "idle" | "loading" | "success" | "error";

// Home page for the first full request flow.
// This version sends the submitted URL to the analyze API route
// and renders a basic success state with summary data.
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

				<section>
					{requestState === "idle" && <EmptyState />}
					{requestState === "loading" && <LoadingState />}
					{requestState === "error" && <ErrorState message={errorMessage} />}
					{requestState === "success" && report && (
						<div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
							<div className="flex flex-col gap-3 border-b border-zinc-800 pb-6">
								<h2 className="text-lg font-semibold text-zinc-100">Scan complete</h2>

								<p className="break-all text-sm text-zinc-300 sm:text-base">{report.url}</p>
							</div>

							<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
								<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
									<p className="text-sm text-zinc-400">Score</p>
									<p className="mt-2 text-2xl font-bold text-zinc-100">{report.summary.score}</p>
								</div>

								<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
									<p className="text-sm text-zinc-400">Total issues</p>
									<p className="mt-2 text-2xl font-bold text-zinc-100">
										{report.summary.totalIssues}
									</p>
								</div>

								<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
									<p className="text-sm text-zinc-400">Critical</p>
									<p className="mt-2 text-2xl font-bold text-zinc-100">
										{report.summary.criticalCount}
									</p>
								</div>

								<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
									<p className="text-sm text-zinc-400">Serious</p>
									<p className="mt-2 text-2xl font-bold text-zinc-100">
										{report.summary.seriousCount}
									</p>
								</div>

								<div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
									<p className="text-sm text-zinc-400">Moderate + minor</p>
									<p className="mt-2 text-2xl font-bold text-zinc-100">
										{report.summary.moderateCount + report.summary.minorCount}
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
								<h3 className="text-base font-semibold text-zinc-100">Mock issue preview</h3>

								<ul className="mt-4 space-y-3">
									{report.issues.map((issue) => (
										<li key={issue.id} className="rounded-lg border border-zinc-800 p-4">
											<p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
												{issue.severity}
											</p>

											<h4 className="mt-2 text-base font-semibold text-zinc-100">{issue.title}</h4>

											<p className="mt-2 text-sm leading-6 text-zinc-300">{issue.description}</p>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</section>
			</section>
		</main>
	);
}

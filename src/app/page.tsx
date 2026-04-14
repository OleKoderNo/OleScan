"use client";

import { useState } from "react";
import { EmptyState } from "@/components/analyzer/EmptyState";
import { UrlForm } from "@/components/analyzer/UrlForm";

// Home page for the first interactive UI step.
// This version stores the entered URL in local page state,
// but does not send it anywhere yet.
export default function HomePage() {
	const [submittedUrl, setSubmittedUrl] = useState("");

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
					<UrlForm onSubmitUrl={setSubmittedUrl} />
				</section>

				<section className="space-y-4">
					{submittedUrl ? (
						<div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
							<h2 className="text-lg font-semibold text-zinc-100">Submitted URL</h2>

							<p className="mt-2 break-all text-sm text-zinc-300 sm:text-base">{submittedUrl}</p>

							<p className="mt-3 text-sm text-zinc-400">API integration comes next.</p>
						</div>
					) : (
						<EmptyState />
					)}
				</section>
			</section>
		</main>
	);
}

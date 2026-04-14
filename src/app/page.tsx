import { EmptyState } from "@/components/analyzer/EmptyState";
import { UrlForm } from "@/components/analyzer/UrlForm";

// Home page for the first real UI step.
// For now we render the page shell, the URL form area,
// and the empty state before any scan has been run.
export default function HomePage() {
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
					<UrlForm />
				</section>

				<section>
					<EmptyState />
				</section>
			</section>
		</main>
	);
}

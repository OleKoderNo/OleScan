// Temporary landing page for the foundation commit.
// We are only setting up the project structure here,
// not building the full analyzer UI yet.
export default function HomePage() {
	return (
		<main className="min-h-screen bg-zinc-950 text-zinc-100">
			<section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
				<div className="max-w-3xl">
					<p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
						Portfolio Project
					</p>

					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">OleScan</h1>

					<p className="mt-6 text-lg leading-8 text-zinc-300">
						An accessibility auditing tool for developers. Paste in a public URL, run a scan, and
						get a structured accessibility report with grouped issues, scoring, and manual review
						reminders.
					</p>

					<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
						<h2 className="text-lg font-semibold">Planned MVP</h2>

						<ul className="mt-4 space-y-2 text-sm text-zinc-300">
							<li>• URL input and validation</li>
							<li>• Accessibility scan via API route</li>
							<li>• Structured report output</li>
							<li>• Severity-based project scoring</li>
							<li>• Manual accessibility review reminders</li>
						</ul>
					</div>
				</div>
			</section>
		</main>
	);
}

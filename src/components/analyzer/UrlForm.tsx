// Presentational version of the URL form.
// This first version only builds the UI structure.
// Form behavior will be connected in the next commit.
export function UrlForm() {
	return (
		<form className="flex flex-col gap-4" aria-label="Analyze website URL">
			<div className="space-y-2">
				<label htmlFor="url" className="text-sm font-medium text-zinc-200">
					Public URL
				</label>

				<input
					id="url"
					name="url"
					type="url"
					placeholder="https://example.com"
					className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
				/>
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-zinc-400">
					Use a public page that can be accessed without login.
				</p>

				<button
					type="submit"
					className="inline-flex items-center justify-center rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-300"
				>
					Run scan
				</button>
			</div>
		</form>
	);
}

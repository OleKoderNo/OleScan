"use client";

import { useState } from "react";

type UrlFormProps = {
	onSubmitUrl: (url: string) => void;
};

// URL form with local input state.
// On submit, it passes the entered URL up to the page component.
// Validation is not added yet because that will be its own step.
export function UrlForm({ onSubmitUrl }: UrlFormProps) {
	const [url, setUrl] = useState("");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSubmitUrl(url.trim());
	}

	return (
		<form className="flex flex-col gap-4" aria-label="Analyze website URL" onSubmit={handleSubmit}>
			<div className="space-y-2">
				<label htmlFor="url" className="text-sm font-medium text-zinc-200">
					Public URL
				</label>

				<input
					id="url"
					name="url"
					type="url"
					value={url}
					onChange={(event) => setUrl(event.target.value)}
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

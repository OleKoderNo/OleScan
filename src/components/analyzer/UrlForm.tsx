"use client";

import { useState } from "react";
import { validateUrl } from "@/lib/analyzer/validateUrl";
import type { AuditEngineMode } from "@/types/audit";

type UrlFormProps = {
	value: string;
	engineMode: AuditEngineMode;
	onChange: (value: string) => void;
	onEngineModeChange: (mode: AuditEngineMode) => void;
	onSubmitUrl: (url: string) => void;
};

const modeHelpTextMap: Record<AuditEngineMode, string> = {
	"server-dom": "Faster scan based on fetched HTML and server-side DOM analysis.",
	browser: "Slower but more realistic scan using a live browser for dynamic pages.",
};

// URL form with visible validation feedback.
// The parent owns the input value so the page can manage scan flow more clearly.
export function UrlForm({
	value,
	engineMode,
	onChange,
	onEngineModeChange,
	onSubmitUrl,
}: UrlFormProps) {
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedUrl = value.trim();
		const result = validateUrl(trimmedUrl);

		if (!result.isValid) {
			setError(result.error ?? "Invalid URL");
			return;
		}

		setError(null);
		onSubmitUrl(trimmedUrl);
	}

	return (
		<form className="flex flex-col gap-4" aria-label="Analyze website URL" onSubmit={handleSubmit}>
			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-2 md:col-span-2">
					<label htmlFor="url" className="text-sm font-medium text-zinc-200">
						Public URL
					</label>

					<input
						id="url"
						name="url"
						type="url"
						value={value}
						onChange={(event) => {
							onChange(event.target.value);
							setError(null);
						}}
						placeholder="https://example.com"
						aria-invalid={Boolean(error)}
						className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
					/>

					{error && (
						<p className="text-sm text-red-400" role="alert">
							{error}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<label htmlFor="engineMode" className="text-sm font-medium text-zinc-200">
						Audit mode
					</label>

					<select
						id="engineMode"
						name="engineMode"
						value={engineMode}
						onChange={(event) => onEngineModeChange(event.target.value as AuditEngineMode)}
						className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
					>
						<option value="server-dom">Server DOM (recommended)</option>

						{typeof window !== "undefined" && window.location.hostname === "localhost" && (
							<option value="browser">Browser (Playwright)</option>
						)}
					</select>

					<p className="text-sm leading-6 text-zinc-400">{modeHelpTextMap[engineMode]}</p>
				</div>
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

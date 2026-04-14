// Fetches the raw HTML of a public page.
// This is the first step in the analysis pipeline.
//
// Responsibility:
// - request the page
// - return HTML text
// - throw meaningful errors when fetching fails
//
// It should NOT:
// - validate the URL format
// - analyze accessibility
// - normalize report data
export async function fetchPageHtml(url: string): Promise<string> {
	let response: Response;

	try {
		response = await fetch(url, {
			method: "GET",
			headers: {
				"User-Agent": "OleScan Accessibility Auditor",
			},
			cache: "no-store",
		});
	} catch {
		throw new Error("Unable to reach the submitted URL.");
	}

	if (!response.ok) {
		throw new Error("The submitted page could not be fetched successfully.");
	}

	const html = await response.text();

	if (!html.trim()) {
		throw new Error("The submitted page returned empty HTML.");
	}

	return html;
}

import type { RawAuditIssue, RawAuditResult } from "@/types/audit";

// Runs the current audit engine against page HTML.
//
// For now, this is a lightweight temporary implementation that produces
// structured raw issues from simple HTML checks.
//
// Later, this function is the place where Playwright + axe-core can be added
// without forcing large changes to the rest of the app.
export async function runAudit(html: string): Promise<RawAuditResult> {
	const issues: RawAuditIssue[] = [];

	// Check for missing or empty page title.
	// We use [\s\S]*? instead of the regex s-flag so this works in stricter TS setups.
	const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

	if (!titleMatch || !titleMatch[1]?.trim()) {
		issues.push({
			id: "document-title",
			impact: "serious",
			description: "The page does not appear to have a meaningful document title.",
			help: "Add a descriptive title element inside the document head.",
			helpUrl: "https://dequeuniversity.com/rules/axe/4.10/document-title",
			nodes: [
				{
					target: ["head > title"],
					html: "<title></title>",
				},
			],
		});
	}

	// Check for missing lang attribute on the html element.
	const htmlTagMatch = html.match(/<html\b[^>]*>/i);

	if (!htmlTagMatch || !/\blang\s*=\s*["'][^"']+["']/i.test(htmlTagMatch[0])) {
		issues.push({
			id: "html-has-lang",
			impact: "serious",
			description: "The root html element does not appear to define a valid language.",
			help: 'Add a lang attribute to the html element, such as lang="en".',
			helpUrl: "https://dequeuniversity.com/rules/axe/4.10/html-has-lang",
			nodes: [
				{
					target: ["html"],
					html: htmlTagMatch?.[0] ?? "<html>",
				},
			],
		});
	}

	// Check for missing main landmark.
	if (!html.includes("<main") && !html.includes("<main ")) {
		issues.push({
			id: "landmark-one-main",
			impact: "minor",
			description: "The page does not appear to expose a clear main landmark for navigation.",
			help: "Wrap the primary page content in a main element.",
			helpUrl: "https://dequeuniversity.com/rules/axe/4.10/landmark-one-main",
			nodes: [
				{
					target: ["body"],
					html: "<body>...</body>",
				},
			],
		});
	}

	// Check for images without alt attributes.
	const imageWithoutAltMatch = html.match(/<img\b(?![^>]*\balt=)[^>]*>/i);

	if (imageWithoutAltMatch) {
		issues.push({
			id: "image-alt",
			impact: "critical",
			description:
				"Some images appear to be missing alternative text for assistive technology users.",
			help: "Add descriptive alt text to informative images.",
			helpUrl: "https://dequeuniversity.com/rules/axe/4.10/image-alt",
			nodes: [
				{
					target: ["img"],
					html: imageWithoutAltMatch[0],
				},
			],
		});
	}

	// Check for buttons without visible text.
	const buttonWithoutTextMatch = html.match(/<button[^>]*>\s*<\/button>/i);

	if (buttonWithoutTextMatch) {
		issues.push({
			id: "button-name",
			impact: "serious",
			description: "A button appears to be missing visible text or another accessible name.",
			help: "Add visible text or an accessible label to the button.",
			helpUrl: "https://dequeuniversity.com/rules/axe/4.10/button-name",
			nodes: [
				{
					target: ["button"],
					html: buttonWithoutTextMatch[0],
				},
			],
		});
	}

	return { issues };
}

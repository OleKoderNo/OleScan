import { NextRequest, NextResponse } from "next/server";
import { getManualChecks } from "@/lib/analyzer/getManualChecks";
import { validateUrl } from "@/lib/analyzer/validateUrl";
import type { AuditReport } from "@/types/audit";

// Temporary mock API route.
// This validates the incoming URL and returns a fake report
// so we can build the frontend flow before real audit logic exists.
export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as { url?: string };
		const url = body.url?.trim() ?? "";

		const validationResult = validateUrl(url);

		if (!validationResult.isValid) {
			return NextResponse.json(
				{
					message: validationResult.error ?? "Invalid URL.",
				},
				{
					status: 400,
				},
			);
		}

		const report: AuditReport = {
			url,
			summary: {
				score: 73,
				totalIssues: 4,
				criticalCount: 1,
				seriousCount: 1,
				moderateCount: 1,
				minorCount: 1,
			},
			issues: [
				{
					id: "image-alt",
					title: "Images must have alternative text",
					severity: "critical",
					description:
						"Some images are missing meaningful alternative text for assistive technology users.",
					help: "Add descriptive alt text to informative images.",
					helpUrl: "https://dequeuniversity.com/rules/axe/4.10/image-alt",
					selector: "img.hero-image",
					htmlSnippet: '<img class="hero-image" src="/hero.jpg">',
				},
				{
					id: "button-name",
					title: "Buttons must have an accessible name",
					severity: "serious",
					description: "A button was found without text content or an accessible label.",
					help: "Add visible text or an aria-label to the button.",
					helpUrl: "https://dequeuniversity.com/rules/axe/4.10/button-name",
					selector: "button.icon-only",
					htmlSnippet: '<button class="icon-only"></button>',
				},
				{
					id: "color-contrast",
					title: "Elements must meet minimum color contrast ratio thresholds",
					severity: "moderate",
					description: "Some text does not have enough contrast against its background.",
					help: "Adjust text or background colors to meet WCAG contrast requirements.",
					helpUrl: "https://dequeuniversity.com/rules/axe/4.10/color-contrast",
					selector: ".muted-copy",
					htmlSnippet: '<p class="muted-copy">Low contrast text</p>',
				},
				{
					id: "landmark-one-main",
					title: "Document should have one main landmark",
					severity: "minor",
					description: "The page does not appear to expose a clear main landmark for navigation.",
					help: "Wrap the primary page content in a main element.",
					helpUrl: "https://dequeuniversity.com/rules/axe/4.10/landmark-one-main",
					selector: "body",
					htmlSnippet: "<body>...</body>",
				},
			],
			manualChecks: getManualChecks(),
		};

		return NextResponse.json(report, { status: 200 });
	} catch {
		return NextResponse.json(
			{
				message: "Something went wrong while analyzing the URL.",
			},
			{
				status: 500,
			},
		);
	}
}

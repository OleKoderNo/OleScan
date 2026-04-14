import type { ManualCheck } from "@/types/audit";

// Returns a fixed list of manual checks.
// These are reminders for accessibility areas that still need human review.
export function getManualChecks(): ManualCheck[] {
	return [
		{
			id: "keyboard-navigation",
			title: "Keyboard navigation",
			description:
				"Check that all interactive elements can be reached and used with a keyboard only.",
		},
		{
			id: "focus-visibility",
			title: "Focus visibility",
			description:
				"Make sure visible focus styles are clear and consistent throughout the interface.",
		},
		{
			id: "screen-reader-order",
			title: "Screen reader reading order",
			description:
				"Verify that the reading order makes sense when content is announced by assistive technology.",
		},
		{
			id: "link-purpose",
			title: "Link purpose in context",
			description: "Ensure links are understandable from their visible text and nearby context.",
		},
		{
			id: "form-errors",
			title: "Form error messaging",
			description:
				"Confirm that form errors are announced clearly and linked to the relevant fields.",
		},
		{
			id: "alt-text-quality",
			title: "Meaningful alt text quality",
			description: "Review whether image alt text is useful, contextual, and not overly generic.",
		},
	];
}

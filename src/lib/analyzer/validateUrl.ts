// Validates that the user entered a usable public URL.
// We only allow http and https protocols.
export function validateUrl(value: string): {
	isValid: boolean;
	error?: string;
} {
	const trimmedValue = value.trim();

	// Prevent empty submission.
	if (!trimmedValue) {
		return {
			isValid: false,
			error: "Please enter a URL.",
		};
	}

	try {
		const parsedUrl = new URL(trimmedValue);

		// Only allow web URLs for this project.
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
			return {
				isValid: false,
				error: "URL must start with http:// or https://.",
			};
		}

		return { isValid: true };
	} catch {
		// URL constructor throws if the string is invalid.
		return {
			isValid: false,
			error: "Please enter a valid public URL.",
		};
	}
}

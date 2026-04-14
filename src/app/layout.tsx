import type { Metadata } from "next";
import "./globals.css";

// Basic metadata for the app.
// This can be expanded later with Open Graph, icons, and more.
export const metadata: Metadata = {
	title: "OleScan",
	description: "Accessibility auditing tool built for developers.",
};

type RootLayoutProps = {
	children: React.ReactNode;
};

// Root layout used by the App Router.
// Wraps every page in the application.
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

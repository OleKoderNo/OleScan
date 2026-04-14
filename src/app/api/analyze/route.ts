import { NextResponse } from "next/server";

// Placeholder API route for the first foundation commit.
// We are only proving that the route exists and is correctly structured.
export async function POST() {
	return NextResponse.json(
		{
			message: "Analyze endpoint not implemented yet.",
		},
		{
			status: 501,
		},
	);
}

import { NextRequest, NextResponse } from "next/server";

const openRouter = process.env.OPENROUTER_API_KEY!;
const openRouterModel = process.env.OPENROUTER_MODEL_NAME!;

export async function POST(req: NextRequest) {
  try {
    // Optional: check env vars first
    const { messages } = await req.json();
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openRouter}`,
        },
        body: JSON.stringify({
          model: openRouterModel,
          messages,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

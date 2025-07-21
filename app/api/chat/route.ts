import { NextRequest, NextResponse } from "next/server";

const openRouter = process.env.OPENROUTER_API_KEY!;
const openRouterModel = process.env.OPENROUTER_MODEL_NAME!;
const INTERNAL_DOMAIN = "santosh2.com.np";
const _API_KEY = process.env.EXTERNAL_API_KEY!;

function formatExternalResponse(data: any) {
  const assistantMessage = data?.choices?.[0]?.message;
  if (assistantMessage && assistantMessage.role && assistantMessage.content) {
    return { role: assistantMessage.role, content: assistantMessage.content };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "";
    const isExternal = origin
      ? !origin.includes(INTERNAL_DOMAIN)
      : true;

    // API key check for external requests
    if (isExternal) {
      const apiKey = req.headers.get("authorization");
      if (!apiKey || apiKey !== _API_KEY) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid or missing API key" },
          { status: 401 }
        );
      }
    }

    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouter}`,
      },
      body: JSON.stringify({
        model: openRouterModel,
        messages,
      }),
    });

    const data = await response.json();

    if (isExternal) {
      const formatted = formatExternalResponse(data);
      if (formatted) {
        return NextResponse.json(formatted);
      }
      return NextResponse.json(
        { error: "No assistant message found in response" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

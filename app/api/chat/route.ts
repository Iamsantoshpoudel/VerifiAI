import { NextRequest, NextResponse } from "next/server";
import { OpenRouterResponse, ChatMessage } from "@/lib/types";
const openRouter = process.env.OPENROUTER_API_KEY!;
const openRouterModel = process.env.OPENROUTER_MODEL_NAME!;
const INTERNAL_DOMAIN = "santosh2.com.np";
const EXTERNAL_API_KEY = process.env.EXTERNAL_API_KEY!;

function formatExternalResponse(data: OpenRouterResponse) {
  const assistantMessage = data?.choices?.[0]?.message;
  if (assistantMessage && assistantMessage.role && assistantMessage.content) {
    return { role: assistantMessage.role, content: assistantMessage.content };
  }
  return null;
}

// CORS headers for all responses
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "";
    const isExternal = origin ? !origin.includes(INTERNAL_DOMAIN) : true;

    // API key check for external requests
    if (isExternal) {
      const apiKey = req.headers.get("authorization");
      if (!apiKey || apiKey !== EXTERNAL_API_KEY) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid or missing API key" },
          { status: 401, headers: CORS_HEADERS }
        );
      }
    }

    const body = await req.json();
    const messages: ChatMessage[] = body.messages;

    // Validate messages: must be a non-empty array with at least one message with non-empty, non-whitespace content
    if (!Array.isArray(messages) || messages.length === 0 || !messages.some((m: ChatMessage) => typeof m.content === 'string' && m.content.trim().length > 0)) {
      return NextResponse.json(
        { error: "Invalid message: content must not be empty or whitespace only." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Trim all message contents before sending to the model
    const trimmedMessages: ChatMessage[] = messages.map((m: ChatMessage) => ({ ...m, content: m.content.trim() }));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouter}`,
      },
      body: JSON.stringify({
        model: openRouterModel,
        messages: trimmedMessages,
      }),
    });

    const data: OpenRouterResponse = await response.json();

    if (isExternal) {
      const formatted = formatExternalResponse(data);
      if (formatted) {
        return NextResponse.json(formatted, { headers: CORS_HEADERS });
      }
      return NextResponse.json(
        { error: "No assistant message found in response" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(data, { headers: CORS_HEADERS });
  } catch (error: unknown) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

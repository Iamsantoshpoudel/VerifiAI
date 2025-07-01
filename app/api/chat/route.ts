import { NextRequest, NextResponse } from 'next/server';






export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY!}`
      },
      body: JSON.stringify({
        model: `${process.env.OPENROUTER_MODEL_TEXT!}`, // e.g., "openrouter/mistral-7b"
        messages: messages
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// app/api/ai/route.ts
export async function POST(req: Request) {
    const { prompt } = await req.json();
  
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://santoshpoudel.com.np", // your domain
        "X-Title": "Poudel AI", // your app name
      },
      body: JSON.stringify({
        model: "qwen/qwen3-0.6b-04-28:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  
    const data = await res.json();
    return Response.json({ message: data.choices[0].message.content });
  }
  
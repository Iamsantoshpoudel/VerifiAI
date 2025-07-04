// app/api/detect/route.ts
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Limit the body size (optional)
// export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert to JPEG using sharp
  const jpegBuffer = await sharp(buffer).jpeg().toBuffer();

  const model = process.env.HF_IMAGE_DETECT_MODEL;
  const HF_TOKEN = process.env.HF_TOKEN;

  const response = await fetch(`https://router.huggingface.co/hf-inference/models/haywoodsloan/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "image/jpeg",
    },
    body: jpegBuffer,
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: 500 });
  }

  const result = await response.json();
  return NextResponse.json({ result });
}

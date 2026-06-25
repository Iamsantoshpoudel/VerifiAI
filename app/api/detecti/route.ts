// app/api/detecti/route.ts
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

interface ModelPrediction {
  label: string;
  score: number;
}

interface FormattedResult {
  predictions: ModelPrediction[];
  overallVerdict: string;
  confidence: number;
  isAIGenerated: boolean;
  analysis: {
    aiScore: number;
    humanScore: number;
    topPrediction: ModelPrediction;
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Please upload PNG, JPEG, JPG, or WebP files.",
        },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "File too large. Please upload files smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const jpegBuffer = await sharp(buffer).jpeg().toBuffer();
    const imageBytes = new Uint8Array(jpegBuffer);

    const model = process.env.HF_IMAGE_DETECT_MODEL || "Ateeqq/ai-vs-human-image-detector";
    const HF_TOKEN = process.env.HF_TOKEN;

    const headers: Record<string, string> = {
      "Content-Type": "image/jpeg",
    };

    if (HF_TOKEN) {
      headers.Authorization = `Bearer ${HF_TOKEN}`;
    }

    const response = await fetch(
      `https://router.huggingface.co/hf-inference/models/${model}`,
      {
        method: "POST",
        headers,
        body: imageBytes,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);
      return NextResponse.json(
        {
          error: "Failed to analyze image. Please try again.",
        },
        { status: 500 }
      );
    }

    const rawResult = await response.json();
    const formattedResult = formatDetectionResults(rawResult);

    return NextResponse.json({
      result: formattedResult,
      success: true,
    });
  } catch (error) {
    console.error("Image detection error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(1, score));
}

function normalizePrediction(pred: unknown): ModelPrediction {
  const raw = pred as {
    label?: string;
    class?: string;
    score?: number;
    confidence?: number;
  };

  const label = raw.label ?? raw.class ?? "unknown";
  const score = typeof raw.score === "number"
    ? raw.score
    : typeof raw.confidence === "number"
      ? raw.confidence
      : 0;

  return {
    label: String(label),
    score: clampScore(score),
  };
}

function formatDetectionResults(rawResult: unknown): FormattedResult {
  let predictions: ModelPrediction[] = [];

  if (Array.isArray(rawResult)) {
    predictions = rawResult.map(normalizePrediction);
  } else if (
    typeof rawResult === "object" &&
    rawResult !== null &&
    "predictions" in rawResult &&
    Array.isArray((rawResult as { predictions: unknown }).predictions)
  ) {
    predictions = (rawResult as { predictions: unknown[] }).predictions.map(normalizePrediction);
  } else if (
    typeof rawResult === "object" &&
    rawResult !== null &&
    "classes" in rawResult &&
    Array.isArray((rawResult as { classes: unknown }).classes)
  ) {
    predictions = (rawResult as { classes: unknown[] }).classes.map(normalizePrediction);
  } else if (typeof rawResult === "object" && rawResult !== null) {
    const keys = Object.keys(rawResult as Record<string, unknown>);
    predictions = keys
      .filter((key) => {
        const value = (rawResult as Record<string, unknown>)[key];
        return typeof value === "number" && value >= 0 && value <= 1;
      })
      .map((key) => ({
        label: key,
        score: clampScore((rawResult as Record<string, number>)[key]),
      }));
  }

  predictions.sort((a, b) => b.score - a.score);
  predictions = predictions.map((pred) => ({
    ...pred,
    score: clampScore(pred.score),
  }));

  const aiKeywords = [
    "ai",
    "artificial",
    "generated",
    "synthetic",
    "fake",
    "deepfake",
    "fake_image",
    "ai_generated",
  ];
  const humanKeywords = [
    "human",
    "hum",
    "real",
    "natural",
    "authentic",
    "real_image",
    "human_created",
    "photo",
  ];

  let aiScore = 0;
  let humanScore = 0;

  predictions.forEach((pred) => {
    const label = pred.label.toLowerCase();

    if (label === "ai" || aiKeywords.some((keyword) => label.includes(keyword))) {
      aiScore = Math.max(aiScore, pred.score);
    } else if (label === "hum" || humanKeywords.some((keyword) => label.includes(keyword))) {
      humanScore = Math.max(humanScore, pred.score);
    }
  });

  if (aiScore === 0 && humanScore === 0 && predictions.length > 0) {
    const topPred = predictions[0];
    const label = topPred.label.toLowerCase();

    if (label.includes("ai") || label.includes("fake") || label.includes("generated")) {
      aiScore = topPred.score;
      humanScore = 1 - topPred.score;
    } else {
      humanScore = topPred.score;
      aiScore = 1 - topPred.score;
    }
  }

  const isAIGenerated = aiScore >= humanScore;
  const confidence = Math.max(aiScore, humanScore);

  let overallVerdict = "Unclear";
  if (confidence >= 0.85) {
    overallVerdict = isAIGenerated ? "Likely AI-Generated" : "Likely Human-Created";
  } else if (confidence >= 0.6) {
    overallVerdict = isAIGenerated ? "Possibly AI-Generated" : "Possibly Human-Created";
  }

  return {
    predictions,
    overallVerdict,
    confidence,
    isAIGenerated,
    analysis: {
      aiScore,
      humanScore,
      topPrediction: predictions[0] || { label: "unknown", score: 0 },
    },
  };
}

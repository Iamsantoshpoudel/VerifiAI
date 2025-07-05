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
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Please upload PNG, JPEG, JPG, or WebP files." 
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: "File too large. Please upload files smaller than 10MB." 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to JPEG using sharp for consistent processing
    const jpegBuffer = await sharp(buffer).jpeg().toBuffer();

    const model = process.env.HF_IMAGE_DETECT_MODEL;
    const HF_TOKEN = process.env.HF_TOKEN;

    if (!model || !HF_TOKEN) {
      return NextResponse.json({ 
        error: "AI model configuration is missing. Please check environment variables." 
      }, { status: 500 });
    }

    const response = await fetch(`https://router.huggingface.co/hf-inference/models/haywoodsloan/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "image/jpeg",
      },
      body: jpegBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);
      return NextResponse.json({ 
        error: "Failed to analyze image. Please try again." 
      }, { status: 500 });
    }

    const rawResult = await response.json();
    
    // Format and interpret the results
    const formattedResult: FormattedResult = formatDetectionResults(rawResult);
    
    return NextResponse.json({ 
      result: formattedResult,
      success: true 
    });

  } catch (error) {
    console.error("Image detection error:", error);
    return NextResponse.json({ 
      error: "An unexpected error occurred. Please try again." 
    }, { status: 500 });
  }
}

function formatDetectionResults(rawResult: unknown): FormattedResult {
  // Handle different response formats from the model
  let predictions: ModelPrediction[] = [];
  
  if (Array.isArray(rawResult)) {
    // If result is directly an array of predictions
    predictions = rawResult.map((pred: unknown) => ({
      label: (pred as { label?: string; class?: string })?.label || (pred as { label?: string; class?: string })?.class || "unknown",
      score: (pred as { score?: number; confidence?: number })?.score || (pred as { score?: number; confidence?: number })?.confidence || 0
    }));
  } else if (typeof rawResult === 'object' && rawResult !== null && 'predictions' in rawResult && Array.isArray((rawResult as { predictions: unknown }).predictions)) {
    // If result has a predictions array
    predictions = (rawResult as { predictions: unknown[] }).predictions.map((pred: unknown) => ({
      label: (pred as { label?: string; class?: string })?.label || (pred as { label?: string; class?: string })?.class || "unknown",
      score: (pred as { score?: number; confidence?: number })?.score || (pred as { score?: number; confidence?: number })?.confidence || 0
    }));
  } else if (typeof rawResult === 'object' && rawResult !== null && 'classes' in rawResult && Array.isArray((rawResult as { classes: unknown }).classes)) {
    // Alternative format
    predictions = (rawResult as { classes: unknown[] }).classes.map((pred: unknown) => ({
      label: (pred as { class?: string; label?: string })?.class || (pred as { class?: string; label?: string })?.label || "unknown",
      score: (pred as { confidence?: number; score?: number })?.confidence || (pred as { confidence?: number; score?: number })?.score || 0
    }));
  } else if (typeof rawResult === 'object' && rawResult !== null) {
    // Fallback: try to extract any prediction-like data
    const keys = Object.keys(rawResult);
    predictions = keys
      .filter(key => typeof (rawResult as Record<string, unknown>)[key] === 'number' && (rawResult as Record<string, number>)[key] >= 0 && (rawResult as Record<string, number>)[key] <= 1)
      .map(key => ({
        label: key,
        score: (rawResult as Record<string, number>)[key]
      }));
  }

  // Sort predictions by score (highest first)
  predictions.sort((a, b) => b.score - a.score);

  // Normalize scores to ensure they're between 0 and 1
  predictions = predictions.map(pred => ({
    ...pred,
    score: Math.max(0, Math.min(1, pred.score))
  }));

  // Determine AI vs Human scores
  const aiKeywords = ['ai', 'artificial', 'generated', 'synthetic', 'fake', 'fake_image', 'ai_generated'];
  const humanKeywords = ['human', 'real', 'natural', 'authentic', 'real_image', 'human_created'];

  let aiScore = 0;
  let humanScore = 0;

  predictions.forEach(pred => {
    const label = pred.label.toLowerCase();
    if (aiKeywords.some(keyword => label.includes(keyword))) {
      aiScore = Math.max(aiScore, pred.score);
    } else if (humanKeywords.some(keyword => label.includes(keyword))) {
      humanScore = Math.max(humanScore, pred.score);
    }
  });

  // If we can't determine from keywords, use the highest score
  if (aiScore === 0 && humanScore === 0 && predictions.length > 0) {
    const topPred = predictions[0];
    // Assume first prediction is AI if score is high enough
    if (topPred.score > 0.5) {
      aiScore = topPred.score;
      humanScore = 1 - topPred.score;
    } else {
      humanScore = topPred.score;
      aiScore = 1 - topPred.score;
    }
  }

  // Determine overall verdict
  const isAIGenerated = aiScore > humanScore;
  const confidence = Math.max(aiScore, humanScore);
  
  let overallVerdict = "Unclear";
  if (confidence > 0.7) {
    overallVerdict = isAIGenerated ? "Likely AI-Generated" : "Likely Human-Created";
  } else if (confidence > 0.5) {
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
      topPrediction: predictions[0] || { label: "unknown", score: 0 }
    }
  };
}

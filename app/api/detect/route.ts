import { NextResponse } from "next/server";
import axios from "axios";

//FROM ENV
const HF_TOKEN = process.env.HF_TOKEN;
const HF_MODEL = process.env.HF_MODEL;

///////////import env

const textModelName = process.env.OPENROUTER_MODEL_NAME!;
const openRouterApi = process.env.OPENROUTER_API_KEY!;

const cxId = process.env.COSTOM_SEARCH_CX_ID!;
const googleCostomSearch = process.env.GOOGLE_COSTOM_SEARCH_API!;

/////////

const HF_HEADERS = {
  Authorization: `Bearer ${HF_TOKEN}`,
};

interface SearchResult {
  snippet: string;
  link: string;
}

interface FactCheckResult {
  score: number;
  label: string;
}

interface Verdict {
  verdict: string;
  score: number;
  evidence: string;
  source: string;
}

function needsResearch(question: string): boolean {
  const keywords = [
    "prove",
    "proof",
    "real",
    "fake",
    "true",
    "false",
    "news",
    "evidence",
  ];
  return keywords.some((k) => question.toLowerCase().includes(k));
}

async function searchGoogle(
  query: string,
  numResults = 3
): Promise<SearchResult[]> {
  const url = "https://www.googleapis.com/customsearch/v1";
  const params = {
    key: googleCostomSearch,
    cx: cxId,
    q: query,
    num: numResults,
  };

  try {
    const res = await axios.get(url, { params });
    const data = res.data as { items?: any[] };
    return (
      data.items?.map((item: any) => ({
        snippet: item.snippet,
        link: item.link,
      })) ?? []
    );
  } catch (error) {
    console.error("Google Search Error:", error);
    return [];
  }
}

async function searchWikipedia(query: string): Promise<SearchResult[]> {
  try {
    const res = await axios.get(
      "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(query)
    );
    return [
      {
        snippet: (res.data as any).extract,
        link:
          (res.data as any).content_urls?.desktop?.page ||
          "https://en.wikipedia.org/wiki/" + encodeURIComponent(query),
      },
    ];
  } catch (error) {
    console.log("Wikipedia search failed:", error);
    return [];
  }
}

async function factCheck(
  claim: string,
  evidence: string
): Promise<FactCheckResult | null> {
  const payload = {
    inputs: evidence,
    parameters: {
      candidate_labels: [claim],
      hypothesis_template: "This text supports the claim that: {}",
    },
  };

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      payload,
      { headers: HF_HEADERS }
    );

    const data = response.data as { scores: number[]; labels: string[] };

    return {
      score: data.scores[0],
      label: data.labels[0],
    };
  } catch (error: any) {
    console.error("HF fact-check error:", error.response?.data);
    return null;
  }
}

// ✅ This is App Router compatible POST handler
export async function POST(req: Request) {
  const { claim } = await req.json();

  if (!claim || typeof claim !== "string") {
    return NextResponse.json({ error: "Claim is required" }, { status: 400 });
  }
  //send response to openrouter model
  if (!needsResearch(claim)) {
    try {
      // Send request to OpenRouter
      const openRouterResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: textModelName,
          messages: [
            {
              role: "user",
              content: claim,
            },
          ],
          max_tokens: 512,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openRouterApi}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the AI answer from OpenRouter's response
      const data = openRouterResponse.data as {
        choices?: { message?: { content?: string } }[];
      };
      const aiMessage = data.choices?.[0]?.message?.content || "No answer";

      return NextResponse.json(
        {
          type: "ai",
          answer: aiMessage,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }
  } else {
    // If research needed
    let results: SearchResult[] = await searchWikipedia(claim);
    if (results.length === 0) {
      results = await searchGoogle(claim, 3);
    }

    const verdicts: Verdict[] = [];

    for (const result of results) {
      const evidence = result.snippet;
      const url = result.link;

      const fc = await factCheck(claim, evidence);
      if (fc) {
        const score = Math.round(fc.score * 1000) / 1000;
        let verdict = "Unclear";
        if (score > 0.75) verdict = "Likely True";
        else if (score < 0.3) verdict = "Likely False";

        verdicts.push({
          verdict,
          score,
          evidence,
          source: url,
        });
      }
    }

    return NextResponse.json({
      type: "factcheck",
      claim,
      results: verdicts,
    });
  }
}

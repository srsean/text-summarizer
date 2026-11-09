const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/openai/";
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

type SummaryResult = {
  summary: string;
  rewritten: string;
};

type GeminiChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

const SYSTEM_PROMPT = `You are a careful text summarizer and editor.

Given a block of text, do two things:
1. Write a faithful summary. Keep the most important facts, names, numbers, and conclusions. Do not invent details. Aim for roughly 15-25% of the original length and no more than 250 words.
2. Rewrite that summary in the requested tone and style. Remove every URL or link. Keep the meaning unchanged.

Return only a JSON object with exactly these two string keys:
{"summary":"...","rewritten":"..."}

Do not wrap the JSON in markdown or code fences.`;

function getGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  return apiKey;
}

function parseSummaryResult(content: string): SummaryResult {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    const candidate = jsonMatch ? jsonMatch[0] : cleaned;
    const parsed = JSON.parse(candidate) as Partial<SummaryResult>;

    if (
      typeof parsed.summary === "string" &&
      typeof parsed.rewritten === "string"
    ) {
      return {
        summary: parsed.summary.trim(),
        rewritten: parsed.rewritten.trim(),
      };
    }
  } catch {
    // Fall through to the plain-text fallback below.
  }

  // If Gemini ignored the JSON instruction, keep the response usable instead
  // of failing the whole request.
  return {
    summary: cleaned,
    rewritten: cleaned,
  };
}

async function summarizeWithGemini(
  text: string,
  tone: "formal" | "casual" | "friendly" | "professional",
  style: "concise" | "persuasive"
): Promise<SummaryResult> {
  const apiKey = getGeminiApiKey();
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  const response = await fetch(`${GEMINI_BASE_URL}chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Tone: ${tone}\nStyle: ${style}\n\nText to summarize:\n${text}`,
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini API error (${response.status}): ${errorBody.slice(0, 500)}`
    );
  }

  const completion = (await response.json()) as GeminiChatResponse;
  const content = completion.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Gemini returned an empty response");
  }

  return parseSummaryResult(content);
}

export async function generateSummary(
  text: string,
  tone: "formal" | "casual" | "friendly" | "professional" = "formal",
  style: "concise" | "persuasive" = "concise"
) {
  try {
    const { summary, rewritten } = await summarizeWithGemini(text, tone, style);

    return {
      // Kept for compatibility with the existing database/UI field names.
      bartSummarization: summary,
      finalSummary: rewritten,
    };
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return {
      bartSummarization: "",
      finalSummary: "",
    };
  }
}

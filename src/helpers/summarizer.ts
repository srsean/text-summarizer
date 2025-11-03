import { InferenceClient } from "@huggingface/inference";
import { OpenAI } from "openai";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// create the client
const inferenceClient = new InferenceClient(HF_API_KEY);

const openAIClient = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HF_API_KEY,
});

export async function generateSummary(
  text: string,
  tone: "formal" | "casual" | "friendly" | "professional" = "formal",
  style: "concise" | "persuasive" = "concise"
) {
  try {
    const summarization = await summarizeWithBart(text);

    const result = await rewriteWithToneAndStyle(summarization, tone, style);

    return result;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
}

async function summarizeWithBart(text: string) {
  const result = await inferenceClient.summarization({
    model: "facebook/bart-large-cnn",
    inputs: text,
    parameters: {
      max_length: 200,
      min_length: 60,
      do_sample: false,
    },
  });

  return result.summary_text;
}

export async function rewriteWithToneAndStyle(
  text: string,
  tone: "formal" | "casual" | "friendly" | "professional",
  style?: "concise" | "persuasive"
): Promise<string> {
  // Build style description if provided
  const styleText = style ? ` in a ${style} style` : "";

  const prompt = `Rewrite the following text in a ${tone} tone${styleText}, and remove any URLs or links while keeping the meaning unchanged:\n\n${text}`;

  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      model: "openai/gpt-oss-safeguard-20b:groq",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return chatCompletion.choices[0].message.content ?? "";
  } catch (err) {
    console.error("Error rewriting text with tone and style:", err);
    return text; // fallback
  }
}

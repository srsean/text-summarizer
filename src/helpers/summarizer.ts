import { InferenceClient } from "@huggingface/inference";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// create the client
const client = new InferenceClient(HF_API_KEY);

export async function generateSummary(text: string) {
  try {
    const model = "facebook/bart-large-cnn"; // or any summarization model you prefer

    // use the summarization task
    const result = await client.summarization({
      model,
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 30,
        do_sample: false,
      },
    });

    return result.summary_text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
}

import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export async function generateSummary(text: string) {
  var summarizedText = "";

  const thread = await createThread();
  const threadId = thread.id;

  const message = "Summarize this text: " + text;
  await addMessage(threadId, message);

  const response = await runAssistant(threadId);

  if (response.status == "completed") {
    const messages = await client.beta.threads.messages.list(thread.id);
    const firstMessage = messages.getPaginatedItems()[0];

    if (firstMessage && firstMessage.content[0].type === "text") {
      summarizedText = (firstMessage.content[0] as any).text.value;
    } else {
      console.log("Message content does not have text property or firstMessage is undefined.");
    }
  }

  return summarizedText;
}

async function createThread() {
  console.log("Creating a new thread...");
  const thread = await client.beta.threads.create();
  return thread;
}

async function addMessage(threadId: string, message: any) {
  console.log("Adding a new message to thread: " + threadId);
  const response = await client.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

async function runAssistant(threadId: string) {
  console.log("Running assistant for thread: " + threadId);
  const response = await client.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: OPENAI_ASSISTANT_ID as string,
  });
  return response;
}

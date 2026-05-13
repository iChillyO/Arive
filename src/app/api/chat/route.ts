import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

const models: Record<string, any> = {
  "gpt-4o": openai("gpt-4o"),
  "gpt-4": openai("gpt-4"),
  "gpt-3.5-turbo": openai("gpt-3.5-turbo"),
  "claude-sonnet": anthropic("claude-3-5-sonnet-20241022"),
  "claude-haiku": anthropic("claude-3-haiku-20240307"),
  "gemini-pro": google("gemini-1.5-pro"),
  "gemini-flash": google("gemini-1.5-flash"),
};

export async function POST(req: Request) {
  const { messages, model = "gpt-4o" } = await req.json();

  const selectedModel = models[model] || models["gpt-4o"];

  const result = await streamText({
    model: selectedModel,
    system: `You are Stack AI, an intelligent assistant built into the Stack by Aivre workspace. You are helpful, precise, and concise. You format responses with markdown when appropriate. You never use emojis.`,
    messages,
  });

  return result.toDataStreamResponse();
}

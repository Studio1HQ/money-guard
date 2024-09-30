import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

type MessageRole = "system" | "user" | "assistant" | "function";

interface BaseMessage {
  role: MessageRole;
  content: string;
}

interface FunctionMessage extends BaseMessage {
  role: "function";
  name: string; // required for function role
}

type Message = BaseMessage | FunctionMessage;

export async function POST(request: NextRequest) {
  const body: {
    messages: Message[];
    max_tokens?: number;
    temperature?: number;
  } = await request.json();

  try {
    // Map your Message type to the ChatCompletionMessageParam type
    const formattedMessages = body.messages.map((msg) => {
      if (msg.role === "function") {
        // Cast to FunctionMessage and ensure 'name' is included
        return {
          role: msg.role,
          content: msg.content,
          name: (msg as FunctionMessage).name,
        };
      }

      return {
        role: msg.role,
        content: msg.content,
      };
    });

    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: formattedMessages, // Pass formatted messages
      max_tokens: body.max_tokens || 100,
      temperature: body.temperature || 0.7,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

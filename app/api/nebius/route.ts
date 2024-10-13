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
  name: string;
}

type Message = BaseMessage | FunctionMessage;

export async function POST(request: NextRequest) {
  const body: {
    messages: Message[];
    max_tokens?: number;
    temperature?: number;
  } = await request.json();

  console.log("Received request body:", JSON.stringify(body, null, 2));

  try {
    const formattedMessages = body.messages.map((msg) => {
      if (msg.role === "function") {
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

    console.log(
      "Formatted messages:",
      JSON.stringify(formattedMessages, null, 2)
    );

    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
      messages: formattedMessages,
      max_tokens: body.max_tokens || 500,
      temperature: body.temperature || 0.7,
    });

    console.log(
      "Nebius AI response:",
      JSON.stringify(completion.choices[0].message, null, 2)
    );

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

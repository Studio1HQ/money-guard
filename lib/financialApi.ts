import { Card, Transaction } from "@/lib/mockData";
import { ButtonName } from "@/types/financialTypes";
import { generatePrompt } from "@/utils/financialUtils";

export const fetchFinancialData = async (
  buttonName: ButtonName,
  userInput: string | undefined,
  transactions: Transaction[],
  subscriptions: Transaction[],
  cards: Card[]
) => {
  const prompt = generatePrompt(buttonName, userInput);

  const response = await fetch("/api/nebius", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a financial assistant. Respond in markdown format. Use the provided transaction data to inform your responses.",
        },
        {
          role: "user",
          content: `Here is the user's transaction data:\n${JSON.stringify({
            transactions,
            subscriptions,
            cards,
          })}\n\n${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
};

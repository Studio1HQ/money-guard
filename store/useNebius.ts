/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getSubscriptions,
  getTransactions,
  Transaction,
} from "@/lib/mockTransaction";
import { create } from "zustand";

export type ButtonName = "subscriptions" | "bills" | "buyOrRent" | "userInput";

type ResponseData = {
  markdownText: string;
};

interface FinancialState {
  loading: boolean;
  generating: boolean;
  activeButton: ButtonName | null;
  parsedResponse: ResponseData | null;
  displayText: string;
  textIndex: number;
  transactions: Transaction[];
  subscriptions: Transaction[];
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setActiveButton: (activeButton: ButtonName | null) => void;
  setParsedResponse: (parsedResponse: ResponseData | null) => void;
  setDisplayText: (displayText: string) => void;
  setTextIndex: (textIndex: number) => void;
  handleButtonClick: (buttonName: ButtonName, userInput?: string) => void;
  fetchTransactions: () => void;
  fetchSubscriptions: () => void;
}

const generatePrompt = (buttonName: ButtonName, userInput?: string): string => {
  switch (buttonName) {
    case "subscriptions":
      return "Generate a list of active subscriptions with their costs and a summary of total monthly cost based on the provided transaction data.";
    case "bills":
      return "Generate a list of upcoming bills with their amounts and due dates, and a summary of total amount due based on the provided transaction data.";
    case "buyOrRent":
      return "Provide an analysis on whether to buy or rent a home, considering the user's current financial situation based on their transaction history.";
    case "userInput":
      return userInput || "";
    default:
      return "";
  }
};

// Simplified: Parse the raw markdown text from the response
const parseResponse = (responseText: string): ResponseData => {
  console.log("Parsing markdown response:", responseText);
  return {
    markdownText: responseText,
  };
};

export const useFinancialStore = create<FinancialState>((set) => ({
  loading: false,
  generating: false,
  activeButton: null,
  parsedResponse: null,
  displayText: "",
  textIndex: 0,
  transactions: [],
  subscriptions: [],
  setLoading: (loading) => set({ loading }),
  setGenerating: (generating) => set({ generating }),
  setActiveButton: (activeButton) => set({ activeButton }),
  setParsedResponse: (parsedResponse) => set({ parsedResponse }),
  setDisplayText: (displayText) => set({ displayText }),
  setTextIndex: (textIndex) => set({ textIndex }),
  fetchTransactions: () => {
    const transactions = getTransactions();
    set({ transactions });
  },
  fetchSubscriptions: () => {
    const subscriptions = getSubscriptions();
    set({ subscriptions });
  },
  handleButtonClick: async (buttonName, userInput) => {
    set({
      loading: true,
      activeButton: buttonName,
      parsedResponse: null,
      displayText: "",
      textIndex: 0,
      generating: false,
    });

    try {
      const prompt = generatePrompt(buttonName, userInput);
      const transactions = getTransactions();
      const subscriptions = getSubscriptions();

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

      const data = await response.json();
      console.log("API response data:", data);

      // Parse and set the markdown response
      const parsedResponse = parseResponse(data.content);
      const displayText = parsedResponse.markdownText; // Simply display the markdownText

      set({
        loading: false,
        generating: false,
        parsedResponse,
        displayText,
      });
    } catch (error) {
      console.error("Error:", error);
      set({
        loading: false,
        generating: false,
        parsedResponse: {
          markdownText: `An error occurred while fetching data. Please check the console for more details.`,
        },
        displayText:
          "An error occurred while fetching data. Please check the console for more details.",
      });
    }
  },
}));

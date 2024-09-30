/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export type ButtonName = "subscriptions" | "bills" | "buyOrRent" | "userInput";

type ResponseItem = {
  [key: string]: string | number | boolean;
};

type ResponseData = {
  title: string;
  items?: ResponseItem[];
  summary?: string;
  recommendation?: string;
  reasons?: string[];
  [key: string]: any;
};

interface FinancialState {
  loading: boolean;
  generating: boolean;
  activeButton: ButtonName | null;
  parsedResponse: ResponseData | null;
  displayText: string;
  textIndex: number;
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setActiveButton: (activeButton: ButtonName | null) => void;
  setParsedResponse: (parsedResponse: ResponseData | null) => void;
  setDisplayText: (displayText: string) => void;
  setTextIndex: (textIndex: number) => void;
  handleButtonClick: (buttonName: ButtonName, userInput?: string) => void;
}

const generatePrompt = (buttonName: ButtonName, userInput?: string): string => {
  switch (buttonName) {
    case "subscriptions":
      return "Generate a list of active subscriptions with their costs and a summary of total monthly cost";
    case "bills":
      return "Generate a list of upcoming bills with their amounts and due dates, and a summary of total amount due";
    case "buyOrRent":
      return "Provide an analysis on whether to buy or rent a home";
    case "userInput":
      return userInput || "";
    default:
      return "";
  }
};

const parseResponse = (responseText: string): ResponseData => {
  console.log("Parsing response:", responseText);
  try {
    // First, try to parse the entire response as JSON
    const parsedJson = JSON.parse(responseText);

    // If successful, return the parsed JSON
    if (typeof parsedJson === "object" && parsedJson !== null) {
      return {
        title: "Upcoming Bills",
        items: parsedJson.upcomingBills || [],
        summary: `Total bills: ${parsedJson.upcomingBills.length}`,
      };
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Failed to parse entire response as JSON:", error);

    // If parsing fails, try to extract JSON from the text
    const jsonMatch = responseText.match(/```json?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const extractedJson = JSON.parse(jsonMatch[1]);
        return {
          title: "Upcoming Bills",
          items: extractedJson.upcomingBills || [],
          summary: `Total bills: ${extractedJson.upcomingBills.length}`,
        };
      } catch (innerError) {
        console.error("Failed to parse extracted JSON:", innerError);
      }
    }
  }

  // If all parsing attempts fail, return an error response
  return {
    title: "Parsing Error",
    summary: "Failed to parse the API response.",
    details: responseText,
  };
};

export const useFinancialStore = create<FinancialState>((set) => ({
  loading: false,
  generating: false,
  activeButton: null,
  parsedResponse: null,
  displayText: "",
  textIndex: 0,
  setLoading: (loading) => set({ loading }),
  setGenerating: (generating) => set({ generating }),
  setActiveButton: (activeButton) => set({ activeButton }),
  setParsedResponse: (parsedResponse) => set({ parsedResponse }),
  setDisplayText: (displayText) => set({ displayText }),
  setTextIndex: (textIndex) => set({ textIndex }),
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
      const response = await fetch("/api/nebius", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a financial assistant. Respond in JSON format.",
            },
            { role: "user", content: prompt },
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

      const parsedResponse = parseResponse(data.content);
      const displayText = generateDisplayText(parsedResponse);

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
          title: "Error",
          summary: "An error occurred while fetching data.",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        displayText:
          "An error occurred while fetching data. Please check the console for more details.",
      });
    }
  },
}));

const generateDisplayText = (response: ResponseData): string => {
  let displayText = response.title ? `${response.title}\n\n` : "";

  if (response.items && Array.isArray(response.items)) {
    displayText +=
      response.items
        .map((item) =>
          Object.entries(item)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")
        )
        .join("\n") + "\n\n";
  }

  if (response.summary) {
    displayText += `${response.summary}\n\n`;
  }

  if (response.recommendation) {
    displayText += `${response.recommendation}\n\n`;
  }

  if (response.reasons && Array.isArray(response.reasons)) {
    displayText += response.reasons.join("\n") + "\n";
  }

  // Handle any additional fields
  Object.entries(response).forEach(([key, value]) => {
    if (
      !["title", "items", "summary", "recommendation", "reasons"].includes(key)
    ) {
      if (typeof value === "string" || typeof value === "number") {
        displayText += `${key}: ${value}\n`;
      } else if (Array.isArray(value)) {
        displayText += `${key}:\n${value.join("\n")}\n`;
      }
    }
  });

  return displayText.trim();
};

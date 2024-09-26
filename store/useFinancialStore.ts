import { create } from "zustand";

export type ButtonName = "subscriptions" | "bills" | "buyOrRent";

type SubscriptionItem = { name: string; cost: string };

type BillItem = { name: string; amount: string; dueDate: string };

type SubscriptionResponse = {
  title: string;
  items: SubscriptionItem[];
  summary: string;
};

type BillsResponse = {
  title: string;
  items: BillItem[];
  summary: string;
};

type BuyOrRentResponse = {
  title: string;
  recommendation: string;
  reasons: string[];
};

type ResponseData = SubscriptionResponse | BillsResponse | BuyOrRentResponse;

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
  handleButtonClick: (buttonName: ButtonName) => void;
}

const generateMockResponse = (buttonName: ButtonName): ResponseData => {
  switch (buttonName) {
    case "subscriptions":
      return {
        title: "Your Active Subscriptions",
        items: [
          { name: "Netflix", cost: "₹649/month" },
          { name: "Spotify", cost: "₹119/month" },
          { name: "Amazon Prime", cost: "₹1499/year" },
        ],
        summary: "Your total monthly subscription cost is approximately ₹893.",
      };
    case "bills":
      return {
        title: "Upcoming Bills",
        items: [
          { name: "Electricity", amount: "₹2,500", dueDate: "30th" },
          { name: "Water", amount: "₹800", dueDate: "2nd" },
          { name: "Internet", amount: "₹999", dueDate: "5th" },
        ],
        summary: "The total amount due this month is ₹4,299.",
      };
    case "buyOrRent":
      return {
        title: "Buy or Rent Analysis",
        recommendation:
          "Renting might be more suitable based on your situation.",
        reasons: [
          "Your monthly rent budget of ₹20,000 is manageable.",
          "Buying would require a larger down payment.",
          "Consider saving for a down payment while renting.",
        ],
      };
  }
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
  setActiveButton: (activeButton) => ({ activeButton }),
  setParsedResponse: (parsedResponse) => set({ parsedResponse }),
  setDisplayText: (displayText) => set({ displayText }),
  setTextIndex: (textIndex) => set({ textIndex }),
  handleButtonClick: (buttonName) => {
    set({
      loading: true,
      activeButton: buttonName,
      parsedResponse: null,
      displayText: "",
      textIndex: 0,
      generating: false,
    });

    setTimeout(() => {
      set({ loading: false, generating: true });
      const response = generateMockResponse(buttonName);
      const combinedText = generateCombinedText(response);
      set({ parsedResponse: response, displayText: combinedText });
    });
  },
}));

const generateCombinedText = (response: ResponseData): string => {
  let combinedText = response.title + "\n";

  if ("items" in response) {
    combinedText +=
      response.items
        .map((item) =>
          "cost" in item
            ? `${item.name}: ${item.cost}`
            : `${item.name}: ₹${item.amount} (Due: ${item.dueDate})`
        )
        .join("\n") + "\n";
  }

  if ("summary" in response) {
    combinedText += response.summary + "\n";
  }

  if ("recommendation" in response) {
    combinedText += response.recommendation + "\n";
    combinedText += response.reasons.join("\n") + "\n";
  }

  return combinedText;
};

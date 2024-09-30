// store/useFinancialStore.ts

import { create } from "zustand";

import { ButtonName, FinancialState } from "@/types/financialTypes";
import { fetchFinancialData } from "@/app/api/nebius/financialApi";
import { parseResponse } from "@/utils/financialUtils";
import {
  Card,
  getCards,
  getSubscriptions,
  getTransactions,
} from "@/lib/mockData";

export const useFinancialStore = create<FinancialState>((set) => ({
  loading: false,
  generating: false,
  activeButton: null,
  parsedResponse: null,
  displayText: "",
  textIndex: 0,
  transactions: [],
  subscriptions: [],
  cards: [] as Card[],
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
  fetchCards: () => {
    const cards = getCards();
    set({ cards });
  },
  handleButtonClick: async (buttonName: ButtonName, userInput?: string) => {
    set({
      loading: true,
      activeButton: buttonName,
      parsedResponse: null,
      displayText: "",
      textIndex: 0,
      generating: false,
    });

    try {
      const transactions = getTransactions();
      const subscriptions = getSubscriptions();
      const cards = getCards();
      const data = await fetchFinancialData(
        buttonName,
        userInput,
        transactions,
        subscriptions,
        cards
      );

      console.log("API response data:", data);

      const parsedResponse = parseResponse(data.content);
      const displayText = parsedResponse.markdownText;

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

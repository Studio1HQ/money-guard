import { create } from "zustand";

import {
  ButtonName,
  FinancialState,
  FinancialTotals,
} from "@/types/financialTypes";
import { fetchFinancialData } from "@/app/api/nebius/financialApi";
import { parseResponse } from "@/utils/financialUtils";

import {
  Card,
  getCards,
  getSubscriptions,
  getTransactions,
} from "@/lib/mockData";

export const useFinancialStore = create<FinancialState & FinancialTotals>(
  (set, get) => ({
    loading: false,
    generating: false,
    activeButton: null,
    parsedResponse: null,
    displayText: "",
    textIndex: 0,
    transactions: [],
    subscriptions: [],
    cards: [] as Card[],
    balance: 0,
    income: 0,
    expense: 0,
    savedPercentage: 0,
    incomeChangePercentage: 0,
    expenseChangePercentage: 0,
    setLoading: (loading) => set({ loading }),
    setGenerating: (generating) => set({ generating }),
    setActiveButton: (activeButton) => set({ activeButton }),
    setParsedResponse: (parsedResponse) => set({ parsedResponse }),
    setDisplayText: (displayText) => set({ displayText }),
    setTextIndex: (textIndex) => set({ textIndex }),
    calculateTotals: () => {
      const transactions = get().transactions;
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = Math.abs(
        transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0)
      );
      const balance = income - expense;

      // These percentages should ideally be calculated by comparing with previous period data
      // For now, we'll use mock values
      const savedPercentage = 5.6;
      const incomeChangePercentage = 3.8;
      const expenseChangePercentage = -1.8;

      set({
        balance,
        income,
        expense,
        savedPercentage,
        incomeChangePercentage,
        expenseChangePercentage,
      });
    },
    fetchTransactions: () => {
      const transactions = getTransactions();
      set({ transactions }, false);
      get().calculateTotals();
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
  })
);

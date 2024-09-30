// types/financialTypes.ts

import { Card, Transaction } from "@/lib/mockData";

export type ButtonName = "subscriptions" | "bills" | "buyOrRent" | "userInput";

export type ResponseData = {
  markdownText: string;
};

export interface FinancialState {
  loading: boolean;
  generating: boolean;
  activeButton: ButtonName | null;
  parsedResponse: ResponseData | null;
  displayText: string;
  textIndex: number;
  transactions: Transaction[];
  subscriptions: Transaction[];
  cards: Card[];
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

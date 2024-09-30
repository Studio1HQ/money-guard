// utils/financialUtils.ts

import { ButtonName, ResponseData } from "../types/financialTypes";

export const generatePrompt = (
  buttonName: ButtonName,
  userInput?: string
): string => {
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

export const parseResponse = (responseText: string): ResponseData => {
  console.log("Parsing markdown response:", responseText);
  return {
    markdownText: responseText,
  };
};

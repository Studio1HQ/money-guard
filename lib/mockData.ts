// lib/mockData.ts

export interface Transaction {
  id: string;
  name: string;
  mode: string;
  date: string;
  amount: number;
  isSubscription: boolean;
}

export interface Card {
  id: string;
  number: string;
  name: string;
  expiryDate: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Figma(Subscription)",
    mode: "Credit Card",
    date: "26-06-2022",
    amount: -1850,
    isSubscription: true,
  },
  {
    id: "2",
    name: "John Doe",
    mode: "Debit Card",
    date: "20-06-2022",
    amount: 15000,
    isSubscription: false,
  },
  // Add more transactions as needed
];

export const mockCards: Card[] = [
  {
    id: "1",
    number: "12XX XXXX XXXX XX66",
    name: "Adam Jacobs",
    expiryDate: "04/28",
  },
  {
    id: "2",
    number: "91XX XXXX XXXX XX46",
    name: "Adam Jacobs",
    expiryDate: "04/28",
  },
];

export function getTransactions(): Transaction[] {
  return mockTransactions;
}

export function getCards(): Card[] {
  return mockCards;
}

export function getSubscriptions(): Transaction[] {
  return mockTransactions.filter((transaction) => transaction.isSubscription);
}

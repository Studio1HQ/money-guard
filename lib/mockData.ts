export interface Transaction {
  id: string;
  name: string;
  mode: string;
  date: string;
  amount: number;
  isSubscription: boolean;
  type: "income" | "expense";
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
    name: "Salary",
    mode: "Bank Transfer",
    date: "01-09-2024",
    amount: 350000,
    isSubscription: false,
    type: "income",
  },
  {
    id: "2",
    name: "Rent",
    mode: "Bank Transfer",
    date: "05-09-2024",
    amount: -30000,
    isSubscription: true,
    type: "expense",
  },
  {
    id: "3",
    name: "Groceries",
    mode: "Credit Card",
    date: "10-09-2024",
    amount: -5000,
    isSubscription: false,
    type: "expense",
  },
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
    expiryDate: "04/30",
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

// lib/mockTransactions.ts

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  isSubscription: boolean;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-09-01",
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    isSubscription: true,
  },
  {
    id: "2",
    date: "2024-09-02",
    description: "Grocery Store",
    amount: 87.32,
    category: "Food",
    isSubscription: false,
  },
  {
    id: "3",
    date: "2024-09-03",
    description: "Gym Membership",
    amount: 50.0,
    category: "Health",
    isSubscription: true,
  },
  {
    id: "4",
    date: "2024-09-05",
    description: "Amazon Purchase",
    amount: 35.99,
    category: "Shopping",
    isSubscription: false,
  },
  {
    id: "5",
    date: "2024-09-10",
    description: "Spotify Subscription",
    amount: 9.99,
    category: "Entertainment",
    isSubscription: true,
  },
  // Add more transactions as needed
];

export function getTransactions(): Transaction[] {
  return mockTransactions;
}

export function getSubscriptions(): Transaction[] {
  return mockTransactions.filter((transaction) => transaction.isSubscription);
}

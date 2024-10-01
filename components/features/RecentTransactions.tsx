"use client";
import React from "react";
import { useFinancialStore } from "@/store/useNebius";
import { useEffect } from "react";

export const RecentTransactions = () => {
  const { fetchTransactions, transactions } = useFinancialStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(absAmount);
    return amount < 0 ? `-${formattedAmount}` : `+${formattedAmount}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  return (
    <div className="bg-white shadow-md p-4 w-full rounded">
      <h4 className="text-lg font-semibold mb-4">Recent Transactions</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-950 text-sm">
              <th className="text-left pb-2">Name</th>
              <th className="text-left pb-2">Mode</th>
              <th className="text-left pb-2">Date</th>
              <th className="text-right pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2">{transaction.name}</td>
                <td>{transaction.mode}</td>
                <td>{formatDate(transaction.date)}</td>
                <td
                  className={`text-right ${
                    transaction.amount < 0 ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {formatAmount(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

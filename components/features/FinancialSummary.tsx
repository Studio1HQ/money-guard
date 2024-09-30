"use client";
import { useFinancialStore } from "@/store/useNebius";
import React, { useEffect } from "react";

const FinancialSummary = () => {
  const {
    balance,
    income,
    expense,
    savedPercentage,
    incomeChangePercentage,
    expenseChangePercentage,
    fetchTransactions,
  } = useFinancialStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow-md">
        <h4 className="text-sm text-gray-950 mb-2">Total Balance</h4>
        <p className="text-3xl font-bold">
          {balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="text-green-500">↑ {savedPercentage.toFixed(2)}% Saved</p>
      </div>
      <div className="bg-white p-4 shadow-md rounded">
        <h4 className="text-sm text-gray-950 mb-2">Total Income</h4>
        <p className="text-3xl font-bold">
          {income.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <span className="text-green-950 text-sm">
          ↑ {incomeChangePercentage.toFixed(2)}%
        </span>
      </div>
      <div className="bg-white p-4 rounded shadow-md border">
        <h4 className="text-sm text-gray-950 mb-2">Total Expense</h4>
        <p className="text-3xl font-bold">
          {expense.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <span className="text-red-950 text-sm">
          ↓ {expenseChangePercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default FinancialSummary;

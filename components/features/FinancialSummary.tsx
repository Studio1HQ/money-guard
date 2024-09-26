import React from "react";

export const FinancialSummary: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
    <div className="bg-white p-4 rounded shadow-md">
      <h4 className="text-sm text-gray-950 mb-2">Total Balance</h4>
      <p className="text-2xl font-bold">₹ 1,80,000.00</p>
      <span className="text-green-950 text-sm">↑ 5.60 Saved</span>
    </div>
    <div className="bg-white p-4 shadow-md rounded">
      <h4 className="text-sm text-gray-950 mb-2">Total Income</h4>
      <p className="text-2xl font-bold">₹ 3,50,000.00</p>
      <span className="text-green-950 text-sm">↑ 3.80%</span>
    </div>
    <div className="bg-white p-4 rounded shadow-md border">
      <h4 className="text-sm text-gray-950 mb-2">Total Expense</h4>
      <p className="text-2xl font-bold">₹ 83,000.00</p>
      <span className="text-red-950 text-sm">↓ 1.80%</span>
    </div>
  </div>
);

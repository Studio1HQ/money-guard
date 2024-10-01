"use client";
import { useFinancialStore } from "@/store/useNebius";
import { useEffect } from "react";

export const YourCard = () => {
  const { cards, fetchCards } = useFinancialStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <div className="bg-white shadow-md p-4 w-full rounded">
      <h4 className="text-lg font-semibold mb-4">Your Cards</h4>
      <div className="space-y-4">
        {cards.map(({ number, name, expiryDate, id }) => (
          <div className="bg-gray-100 p-4 rounded" key={id}>
            <p className="text-sm mb-1">{number}</p>
            <p className="text-sm">{name}</p>
            <p className="text-sm text-gray-950">{expiryDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

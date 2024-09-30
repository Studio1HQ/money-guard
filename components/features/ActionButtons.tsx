"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { NotebookPen, MessageCircleQuestion, HousePlus } from "lucide-react";
import { ButtonName, useFinancialStore } from "@/store/useNebius";

export const ActionButtons: React.FC = () => {
  const { handleButtonClick, activeButton, loading, generating } =
    useFinancialStore();

  const renderButton = (
    name: ButtonName,
    icon: React.ReactNode,
    label: string
  ) => (
    <Button
      className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded
      focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
      ${activeButton === name ? "ring-2 ring-orange-600 ring-opacity-50" : ""}`}
      onClick={() => handleButtonClick(name)}
      disabled={loading || generating}
    >
      {icon} {label}
    </Button>
  );

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {renderButton(
        "subscriptions",
        <NotebookPen className="mr-2 h-4 w-4" />,
        "List my subscriptions"
      )}
      {renderButton(
        "bills",
        <MessageCircleQuestion className="mr-2 h-4 w-4" />,
        "More on my bills..."
      )}
      {renderButton(
        "buyOrRent",
        <HousePlus className="mr-2 h-4 w-4" />,
        "Should I buy or rent?"
      )}
    </div>
  );
};

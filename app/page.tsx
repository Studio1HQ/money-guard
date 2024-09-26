"use client";
import React, { useState, useEffect } from "react";
import { DonutChart } from "@/components/Chart";
import { Layout } from "@/components/DashboardLayout";
import { RecentTransactions } from "@/components/features/RecentTransactions";
import { YourCard } from "@/components/features/YourCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUp,
  HousePlus,
  MessageCircleQuestion,
  NotebookPen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type SubscriptionItem = { name: string; cost: string };
type BillItem = { name: string; amount: string; dueDate: string };

type SubscriptionsResponse = {
  title: string;
  items: SubscriptionItem[];
  summary: string;
};

type BillsResponse = {
  title: string;
  items: BillItem[];
  summary: string;
};

type BuyOrRentResponse = {
  title: string;
  recommendation: string;
  reasons: string[];
};

type ResponseData = SubscriptionsResponse | BillsResponse | BuyOrRentResponse;

type ButtonName = "subscriptions" | "bills" | "buyOrRent";

const generateMockResponse = (buttonName: ButtonName): ResponseData => {
  switch (buttonName) {
    case "subscriptions":
      return {
        title: "Your Active Subscriptions",
        items: [
          { name: "Netflix", cost: "₹649/month" },
          { name: "Spotify", cost: "₹119/month" },
          { name: "Amazon Prime", cost: "₹1499/year" },
        ],
        summary: "Your total monthly subscription cost is approximately ₹893.",
      };
    case "bills":
      return {
        title: "Upcoming Bills",
        items: [
          { name: "Electricity", amount: "₹2,500", dueDate: "30th" },
          { name: "Water", amount: "₹800", dueDate: "2nd" },
          { name: "Internet", amount: "₹999", dueDate: "5th" },
        ],
        summary: "The total amount due this month is ₹4,299.",
      };
    case "buyOrRent":
      return {
        title: "Buy or Rent Analysis",
        recommendation:
          "Renting might be more suitable based on your situation.",
        reasons: [
          "Your monthly rent budget of ₹20,000 is manageable.",
          "Buying would require a larger down payment.",
          "Consider saving for a down payment while renting.",
        ],
      };
  }
};

const FinancialDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<ButtonName | null>(null);
  const [parsedResponse, setParsedResponse] = useState<ResponseData | null>(
    null
  );
  const [displayText, setDisplayText] = useState<string>("");
  const [textIndex, setTextIndex] = useState<number>(0);

  const handleButtonClick = (buttonName: ButtonName) => {
    setLoading(true);
    setActiveButton(buttonName);

    // Clear previous response data and text
    setParsedResponse(null);
    setDisplayText("");
    setTextIndex(0); // Reset text index to start from the beginning
    setGenerating(false); // Reset the generating flag

    setTimeout(() => {
      setLoading(false);
      setGenerating(true);

      const response = generateMockResponse(buttonName);
      setParsedResponse(response);

      // Generate the combined text for the new response
      const combinedText = generateCombinedText(response);
      setDisplayText(combinedText);
    }, 2000); // Simulate API delay
  };

  // Combines all response text into one string
  const generateCombinedText = (response: ResponseData): string => {
    let combinedText = response.title + "\n";

    if ("items" in response) {
      combinedText +=
        response.items
          .map((item) =>
            "cost" in item
              ? `${item.name}: ${item.cost}`
              : `${item.name}: ₹${item.amount} (Due: ${item.dueDate})`
          )
          .join("\n") + "\n";
    }

    if ("summary" in response) {
      combinedText += response.summary + "\n";
    }

    if ("recommendation" in response) {
      combinedText += response.recommendation + "\n";
      combinedText += response.reasons.join("\n") + "\n";
    }

    return combinedText;
  };

  useEffect(() => {
    if (generating && textIndex < displayText.length) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 30); // Speed of text generation

      return () => clearTimeout(timer);
    } else if (generating && textIndex === displayText.length) {
      setGenerating(false);
    }
  }, [generating, textIndex, displayText]);

  const renderContent = (content: string) => {
    return generating ? content.slice(0, textIndex) + "|" : content;
  };

  const renderResponse = () => {
    if (!parsedResponse) return null;

    return (
      <div className="bg-white shadow-md p-4 rounded mb-4">
        <pre className="whitespace-pre-wrap text-lg">
          {renderContent(displayText)}
        </pre>
      </div>
    );
  };

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
    <Layout>
      <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
        <div className="bg-white shadow-md p-4 rounded mb-4">
          <div className="flex flex-col xl:flex-row gap-2 items-center w-full">
            <Input
              icon={
                <div className="bg-orange-500 p-1 rounded-lg cursor-pointer">
                  <ArrowUp className="h-4 w-4 text-white" />
                </div>
              }
              placeholder="What can we help you with today?.."
            />
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
          </div>
        </div>

        {(loading || generating || parsedResponse) && (
          <div className="bg-white shadow-md p-4 rounded mb-4">
            <h4 className="text-lg font-semibold mb-2">
              {loading ? "Generating..." : "Generated Response"}
            </h4>
            {loading && (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            {parsedResponse && renderResponse()}
          </div>
        )}

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

        <div className="mb-4">
          <DonutChart />
        </div>
        <RecentTransactions />
        <YourCard />
      </div>
    </Layout>
  );
};

export default FinancialDashboard;

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

const FinancialDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState("");
  const [fullText, setFullText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const generateResponse = (buttonName: string) => {
    switch (buttonName) {
      case "subscriptions":
        return "Your active subscriptions include Netflix (₹649/month), Spotify (₹119/month), and Amazon Prime (₹1499/year). Your total monthly subscription cost is approximately ₹893.";
      case "bills":
        return "Your upcoming bills are: Electricity (₹2,500 due on 30th), Water (₹800 due on 2nd), and Internet (₹999 due on 5th). The total amount due this month is ₹4,299.";
      case "buyOrRent":
        return "Based on your current financial situation, renting might be more suitable. Your monthly rent budget of ₹20,000 is manageable, while buying would require a down payment and higher monthly payments. Consider saving for a down payment while renting.";
      default:
        return "";
    }
  };

  const handleButtonClick = (buttonName: string) => {
    setLoading(true);
    setActiveButton(buttonName);
    setGeneratedText("");
    setFullText("");
    setTextIndex(0);

    // Simulate API call or data processing
    setTimeout(() => {
      setLoading(false);
      setGenerating(true);
      const response = generateResponse(buttonName);
      setFullText(response);
      // Start text generation after a short delay
      setTimeout(() => {
        setTextIndex(0);
      }, 500);
    }, 2000); // 2 seconds delay to simulate loading
  };
  useEffect(() => {
    if (generating && generatedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setGeneratedText(fullText.slice(0, generatedText.length + 1));
      }, 30); // Adjust the speed of text generation here

      return () => clearTimeout(timer);
    } else if (generating && generatedText.length === fullText.length) {
      setGenerating(false);
    }
  }, [generating, generatedText, fullText, textIndex]);

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
            <div className="mx-auto [1100px]:w-2/4 flex justify-end  flex-col md:flex-row gap-2">
              <Button
                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
                ${
                  activeButton === "subscriptions"
                    ? "ring-2 ring-orange-600 ring-opacity-50"
                    : ""
                }`}
                onClick={() => handleButtonClick("subscriptions")}
                disabled={loading || generating}
              >
                <NotebookPen className="mr-2 h-4 w-4 " /> List my subscriptions
              </Button>
              <Button
                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
                ${
                  activeButton === "bills"
                    ? "ring-2 ring-orange-600 ring-opacity-50"
                    : ""
                }`}
                onClick={() => handleButtonClick("bills")}
                disabled={loading || generating}
              >
                <MessageCircleQuestion className="mr-2 h-4 w-4" /> More on my
                bills...
              </Button>
              <Button
                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50
                ${
                  activeButton === "buyOrRent"
                    ? "ring-2 ring-orange-600 ring-opacity-50"
                    : ""
                }`}
                onClick={() => handleButtonClick("buyOrRent")}
                disabled={loading || generating}
              >
                <HousePlus className="mr-2 h-4 w-4" /> Should I buy or rent?
              </Button>
            </div>
          </div>
        </div>

        {(loading || generating || generatedText) && (
          <div className="bg-white shadow-md p-4 rounded mb-4">
            <h4 className="text-lg font-semibold mb-2">Generated Response:</h4>
            {loading && (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
            {(generating || generatedText) && (
              <p className="text-gray-700">
                {generatedText}
                {generating && <span className="animate-pulse">|</span>}
              </p>
            )}
          </div>
        )}

        {!loading && !generating && (
          <>
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
                <span className="text-red-950 text-sm">↓ 4.62%</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-semibold mb-4">
                  Your Spending Summary
                </h4>
                <DonutChart />
                <div className="flex justify-center mt-4 space-x-4">
                  <span className="text-sm">Subscriptions</span>
                  <span className="text-sm">Money Transfer</span>
                  <span className="text-sm">Bill Payments</span>
                  <span className="text-sm">Food Payment</span>
                </div>
              </div>
              <YourCard />
            </div>
            <RecentTransactions />
          </>
        )}
      </div>
    </Layout>
  );
};

export default FinancialDashboard;

"use client";
import React, { useState, FormEvent } from "react";
import { useFinancialStore } from "@/store/useNebius";
import { Loader2Icon } from "lucide-react";
import { ButtonName } from "@/types/financialTypes";

const MoneyGuardAssistant = () => {
  const [query, setQuery] = useState("a penguin");
  const { handleButtonClick, loading } = useFinancialStore();

  const moneyguardPrompts = [
    { name: "subscriptions", prompt: "List my subscriptions" },
    { name: "bills", prompt: "More on my bills..." },
    { name: "buyOrRent", prompt: "Should I buy or rent?" },
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleButtonClick("userInput", query);
    }
  };

  return (
    <div className="flex w-full mb-4 flex-col gap-2">
      <div className="bg-white border-gray-300 py-4 dark:border-orange-700 dark:bg-orange-900 rounded-md border">
        <ul className="text-orange-500 dark:text-orange-200 text-sm">
          {moneyguardPrompts.map(({ name, prompt }, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-1 hover:bg-orange-100 dark:hover:bg-orange-800"
            >
              <button
                className="text-left w-full"
                onClick={() => handleButtonClick(name as ButtonName)}
              >
                {prompt}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="relative w-full">
        <label htmlFor="aiPrompt" className="sr-only">
          ai prompt
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 fill-orange-600 dark:fill-orange-400"
        >
          <path
            fillRule="evenodd"
            d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          id="aiPrompt"
          type="text"
          className="w-full border-outline bg-orange-50 border border-orange-300 rounded-md px-2 py-2 pl-10 pr-24 text-sm text-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-75 dark:border-orange-700 dark:bg-orange-900/50 dark:text-orange-200 dark:focus-visible:outline-orange-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="prompt"
          placeholder="Ask AI ..."
          disabled={loading}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-md px-2 py-1 text-xs tracking-wide transition focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 active:bg-orange-800"
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default MoneyGuardAssistant;

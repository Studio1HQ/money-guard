"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { useFinancialStore } from "@/store/useNebius";

export const QueryInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const { handleButtonClick, loading } = useFinancialStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleButtonClick("userInput", query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What can we help you with today?.."
        className="pr-12"
        disabled={loading}
      />
      <button
        type="submit"
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 p-1 rounded-lg transition-colors ${
          query.trim() ? "hover:bg-orange-600" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!query.trim() || loading}
        aria-label="Submit query"
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </button>
    </form>
  );
};

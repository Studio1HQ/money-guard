"use client";
import React, { useState, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFinancialStore } from "@/store/useNebius";
import { ActionButtons } from "./ActionButtons";

function FormSection() {
  const [query, setQuery] = useState("");

  const { handleButtonClick, loading } = useFinancialStore();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleButtonClick("userInput", query);
      setQuery("");
    }
  };

  return (
    <div className="p-5 flex flex-col gap-2 md:flex-row justify-between">
      <form className="mt-6  w-full md:w-3/4" onSubmit={onSubmit}>
        <div className="my-2 flex flex-col gap-2 mb-7">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What can we help you with today?.."
            className="pr-12 w-full"
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6 bg-orange-500 hover:bg-orange-700 text-white font-bold  px-4 rounded
      focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 "
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Generate
        </Button>
      </form>
      <ActionButtons />
    </div>
  );
}

export default FormSection;

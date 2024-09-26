// components/ResponseDisplay.tsx
"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialStore } from "@/store/useFinancialStore";

export const ResponseDisplay: React.FC = () => {
  const {
    loading,
    generating,
    parsedResponse,
    displayText,
    textIndex,
    setTextIndex,
    setGenerating,
  } = useFinancialStore();

  useEffect(() => {
    if (generating && textIndex < displayText.length) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 30);

      return () => clearTimeout(timer);
    } else if (generating && textIndex === displayText.length) {
      setGenerating(false);
    }
  }, [generating, textIndex, displayText, setTextIndex, setGenerating]);

  const renderContent = (content: string) => {
    return generating ? content.slice(0, textIndex) + "|" : content;
  };

  if (!loading && !generating && !parsedResponse) return null;

  return (
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
      {parsedResponse && (
        <pre className="whitespace-pre-wrap text-lg">
          {renderContent(displayText)}
        </pre>
      )}
    </div>
  );
};

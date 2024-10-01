"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialStore } from "@/store/useNebius";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MarkdownResponse {
  markdownText: string;
}

export const ResponseDisplay: React.FC = () => {
  const { loading, parsedResponse } = useFinancialStore();

  const getContent = () => {
    if (!parsedResponse) return "";

    try {
      const response = parsedResponse as MarkdownResponse;
      return response.markdownText || "";
    } catch (error) {
      console.error("Error parsing response:", error);
      return "";
    }
  };

  if (!loading && !parsedResponse) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{loading ? "Loading..." : "Response"}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <MarkdownRenderer content={getContent()} />
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;

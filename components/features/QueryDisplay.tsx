"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialStore } from "@/store/useNebius";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarkdownResponse {
  markdownText: string;
}

const formatText = (text: string) => {
  // Split the text into sections
  const sections = text.split("**").map((section, index) => {
    if (index % 2 === 1) {
      // This is a heading (wrapped in **)
      return (
        <h2 key={index} className="text-lg font-semibold my-3">
          {section}
        </h2>
      );
    }

    // Handle regular paragraphs and other formatting
    return section.split("*").map((subsection, subIndex) => {
      if (subIndex % 2 === 1) {
        // This is emphasized text (wrapped in single *)
        return (
          <span key={`${index}-${subIndex}`} className="font-medium">
            {subsection}
          </span>
        );
      }

      // Regular text
      return subsection;
    });
  });

  return sections.map((section, index) => {
    if (React.isValidElement(section)) {
      return section;
    }
    return (
      <p key={index} className="mb-2">
        {section}
      </p>
    );
  });
};

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
          <div className="space-y-2 text-sm leading-relaxed">
            {formatText(getContent())}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;

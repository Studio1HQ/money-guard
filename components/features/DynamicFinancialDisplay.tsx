/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Define the FinancialData and Props interfaces

interface DynamicFinancialDisplayProps {
  data: any;
}

// Helper function to render values
const renderValue = (value: unknown): React.ReactNode => {
  if (typeof value === "string") {
    return <ReactMarkdown>{value}</ReactMarkdown>; // Render markdown
  } else if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5">
        {value.map((item, index) => (
          <li key={index}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  } else if (typeof value === "object" && value !== null) {
    return renderObjectContent(value as Record<string, unknown>);
  } else {
    return <span>{String(value)}</span>;
  }
};

// Helper function to render object content
const renderObjectContent = (obj: Record<string, unknown>): React.ReactNode => {
  return (
    <div className="space-y-4">
      {Object.entries(obj).map(([key, value]) => (
        <div key={key}>
          <h3 className="text-md font-semibold">{key}</h3>
          {renderValue(value)}
        </div>
      ))}
    </div>
  );
};

// Main component
const DynamicFinancialDisplay: React.FC<DynamicFinancialDisplayProps> = ({
  data,
}) => {
  if (!data || typeof data !== "object") {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Invalid or missing data.</AlertDescription>
      </Alert>
    );
  }

  return <div className="markdown-container">{renderValue(data)}</div>;
};

export default DynamicFinancialDisplay;

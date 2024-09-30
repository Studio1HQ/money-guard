/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Define the FinancialData and Props interfaces

interface DynamicFinancialDisplayProps {
  data: any;
}

// Helper function to render values
const renderValue = (value: unknown): React.ReactNode => {
  if (Array.isArray(value)) {
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
        <Card key={key} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-md">{key}</CardTitle>
          </CardHeader>
          <CardContent>{renderValue(value)}</CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to render tables
const renderTable = (
  items: Array<Record<string, unknown>>
): React.ReactNode | null => {
  if (items.length === 0) return null;

  // Extract headers from the first item
  const headers = Object.keys(items[0]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header}>{renderValue(item[header])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
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

  // Function to render content based on the presence of items
  const renderContent = (): React.ReactNode => {
    if (Array.isArray(data.items)) {
      return (
        <>
          {renderTable(data.items)}
          {typeof data.summary === "string" && (
            <p className="mt-4 font-semibold">{data.summary}</p>
          )}
        </>
      );
    } else {
      const { ...rest } = data;
      return renderObjectContent(rest);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{data.title || "Financial Information"}</CardTitle>
        {typeof data.overview === "string" && (
          <CardDescription>{data.overview}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default DynamicFinancialDisplay;

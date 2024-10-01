"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialStore } from "@/store/useNebius";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DynamicFinancialDisplay from "./DynamicFinancialDisplay";

export const ResponseDisplay: React.FC = () => {
  const { loading, parsedResponse } = useFinancialStore();
  if (!loading && !parsedResponse) return null;

  return (
    <Card className="w-full ">
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
          <DynamicFinancialDisplay data={parsedResponse} />
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;

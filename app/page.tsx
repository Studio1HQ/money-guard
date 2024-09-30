import React from "react";
import { Layout } from "@/components/DashboardLayout";
import { DonutChart } from "@/components/Chart";
import { RecentTransactions } from "@/components/features/RecentTransactions";
import { YourCard } from "@/components/features/YourCards";
import { ActionButtons } from "@/components/features/ActionButtons";
import { FinancialSummary } from "@/components/features/FinancialSummary";
import { ResponseDisplay } from "@/components/features/QueryDisplay";
import { QueryInput } from "@/components/features/QueryInput";

const FinancialDashboard = async () => {
  return (
    <Layout>
      <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
        <div className="bg-white shadow-md p-4 rounded mb-4">
          <div className="flex flex-col xl:flex-row gap-2 items-center w-full">
            <QueryInput />
            <ActionButtons />
          </div>
        </div>
        <ResponseDisplay />
        <FinancialSummary />
        <div className="mb-4">
          <DonutChart />
        </div>
        <RecentTransactions />
        <YourCard />
      </div>
    </Layout>
  );
};

export default FinancialDashboard;

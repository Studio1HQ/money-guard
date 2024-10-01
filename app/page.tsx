import React from "react";
import { Layout } from "@/components/DashboardLayout";
// import { DonutChart } from "@/components/Chart";
import { RecentTransactions } from "@/components/features/RecentTransactions";
import { YourCard } from "@/components/features/YourCards";

import { ResponseDisplay } from "@/components/features/QueryDisplay";

import FinancialSummary from "@/components/features/FinancialSummary";
import MoneyGuardAssistant from "@/components/features/PromptInput";

const FinancialDashboard = async () => {
  return (
    <Layout>
      <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
        <div className="bg-white p-4 rounded mb-4">
          <MoneyGuardAssistant />
          <ResponseDisplay />
        </div>
        <FinancialSummary />
        {/* <div className="mb-4">
          <DonutChart />
        </div> */}
        <div className="flex flex-col lg:flex-row w-full justify-between gap-3">
          <RecentTransactions />
          <YourCard />
        </div>
      </div>
    </Layout>
  );
};

export default FinancialDashboard;

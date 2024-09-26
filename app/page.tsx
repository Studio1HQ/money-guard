import React from "react";
import { Layout } from "@/components/DashboardLayout";
import { DonutChart } from "@/components/Chart";
import { RecentTransactions } from "@/components/features/RecentTransactions";
import { YourCard } from "@/components/features/YourCards";
import { ActionButtons } from "@/components/features/ActionButtons";
import { FinancialSummary } from "@/components/features/FinancialSummary";
import { ResponseDisplay } from "@/components/features/QueryDisplay";
import { QueryInput } from "@/components/features/QueryInput";

async function getSubscriptions() {
  const res = await fetch("http://localhost:3000/api/subscriptions", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch subscriptions");
  }
  console.log(res);
  return res.json();
}

const FinancialDashboard = async () => {
  const { subscriptions } = await getSubscriptions();

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
        <div className="bg-white shadow-md p-4 rounded mb-4">
          <div className="flex flex-col xl:flex-row gap-2 items-center w-full">
            <QueryInput />
            <ActionButtons />
          </div>
        </div>
        <div>
          <h1>Server-side Fetched Data</h1>
          <pre>{JSON.stringify(subscriptions, null, 2)}</pre>
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

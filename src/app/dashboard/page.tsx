import AverageChartSection from "@/app/components/Charts/AverageChartSection";
import SummaryCardSection from "../components/Cards/SummaryCardSection";
import UsageChartSection from "../components/Charts/UsageChartSection";
import { headers } from "next/headers";
import { ChangeIndicatorCard } from "../components/Cards/ChangeIndicatorCard";
import { ChangeIndicator } from "../types/dashboard";
import WorkloadAllocationScatterChart from "../components/Charts/WorkloadAllocationChart";

export default async function DashboardPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/summary-card`);
  const data = await res.json();
  const summary = Array.isArray(data.summary) ? data.summary[0] : {};

  const indicatorRes = await fetch(
    `${protocol}://${host}/api/change-Indicator`
  );
  const indicatorJson = await indicatorRes.json();
  const indicators: ChangeIndicator[] = indicatorJson.data ?? [];

  return (
    <div className="w-full">
      <h1 className="md:text-xl lg:text-3xl text-lg font-bold text-indigo-600 text-center mb-6">
        🚀 리소스 분석 대시보드
      </h1>
      <div className="flex flex-col gap-6 lg:min-h-[621px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 flex flex-col gap-5">
            <SummaryCardSection summary={summary} />
            <UsageChartSection />
          </div>

          <div className="lg:w-1/2">
            <AverageChartSection />
          </div>
        </div>
        <div className="flex flex-grow flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 lg:max-w-[calc(50%-12px)]">
            <ChangeIndicatorCard indicators={indicators} />
          </div>
          <div className="lg:w-1/2 lg:max-w-[calc(50%-12px)]">
            <WorkloadAllocationScatterChart />
          </div>
        </div>
      </div>
    </div>
  );
}

import ChartSection from "@/app/components/Charts/AverageChartSection";
import SummaryCardSection from "../components/Cards/SummaryCardSection";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/summary-card`);

  const data = await res.json();
  const summary = Array.isArray(data.summary) ? data.summary[0] : {};

  return (
    <div className="w-full">
      <h1 className="md:text-xl lg:text-3xl text-lg font-bold text-indigo-600 text-center mb-6">
        🚀 리소스 분석 대시보드
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <SummaryCardSection summary={summary} />
        </div>
        <div className="lg:w-1/2">
          <ChartSection />
        </div>
      </div>
    </div>
  );
}

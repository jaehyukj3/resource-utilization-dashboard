import AverageChartSection from "@/app/components/Charts/AverageChartSection";
import SummaryCardSection from "../components/Cards/SummaryCardSection";
import UsageChartSection from "../components/Charts/UsageChartSection";
import { headers } from "next/headers";
import { ChangeIndicatorCard } from "../components/Cards/ChangeIndicatorCard";
import { ChangeIndicator } from "../types/dashboard";
import WorkloadAllocationScatterChart from "../components/Charts/WorkloadAllocationChart";

export async function generateMetadata() {
  return {
    title: "🚀 리소스 분석 대시보드",
    description: "리소스 데이터를 시각화하여 분석하는 대시보드 페이지입니다.",
    openGraph: {
      title: "🚀 리소스 분석 대시보드",
      description: "리소스 데이터를 시각화하여 분석하는 대시보드 페이지입니다.",
      url: "https://resource-utilization-dashboard.vercel.app/dashboard",
      siteName: "Rsource Nextjs",
      locale: "ko-KR",
      type: "website",
    },
  };
}

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
    <div className="flex flex-col w-full h-full wide:max-h-(900px) wide:min-h-(900px)">
      <h1 className="md:text-xl lg:text-3xl text-lg font-bold text-indigo-600 text-center mb-6">
        🚀 리소스 분석 대시보드
      </h1>
      <div className="flex flex-1 flex-col gap-6 lg:min-h-[621px] h-full max-h-[calc(100%-36px)]">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(70%-12px)] wide:h-[calc(55%-12px)]">
          <div className="lg:w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)] flex flex-col gap-6">
            <SummaryCardSection summary={summary} />
            <UsageChartSection />
          </div>

          <div className="lg:w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)]">
            <AverageChartSection />
          </div>
        </div>
        <div className="flex flex-grow flex-col lg:flex-row gap-6 lg:h-[calc(30%-28px)] wide:h-[calc(45%-12px)]">
          <div className="lg:w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)] lg:max-w-[calc(30%-12px)] wide:min-w-[calc(25%-12px)] wide:max-w-[calc(25%-12px)]">
            <ChangeIndicatorCard indicators={indicators} />
          </div>
          <div className="lg:w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)] lg:max-w-[calc(70%-12px)] wide:min-w-[calc(75%-12px)] wide:max-w-[calc(75%-12px)]">
            <WorkloadAllocationScatterChart />
          </div>
        </div>
      </div>
    </div>
  );
}

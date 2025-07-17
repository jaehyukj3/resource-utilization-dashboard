import ChartSection from "@/app/components/Charts/AverageChartSection";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-lg">
      <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-indigo-600 text-center mb-6">
        🚀 리소스 분석 대시보드
      </h1>
      <ChartSection />
    </div>
  );
}

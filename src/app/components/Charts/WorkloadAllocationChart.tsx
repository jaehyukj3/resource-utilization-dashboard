"use client";

import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
  TooltipItem,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ResourceAllocationStat } from "@/app/types/dashboard";

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

export default function WorkloadAllocationScatterChart() {
  const [stats, setStats] = useState<ResourceAllocationStat[]>([]);
  const [selectedRange, setSelectedRange] = useState<"24h" | "168h">("24h");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/workload-allocation")
      .then((res) => res.json())
      .then((result) => {
        setStats(result.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 fetch 실패:", err);
        setStats([]);
        setLoading(false);
      });
  }, []);

  const filtered = stats.filter((d) => d.range_type === selectedRange);

  const chartData = {
    datasets: [
      {
        label: "Workload vs Resource Allocation",
        data: filtered.map((d) => ({
          x: d.resource_allocation,
          y: d.workload,
        })),
        backgroundColor: selectedRange === "24h" ? "#4f46e5" : "#10b981",
      },
      {
        label: "Baseline (x = y)",
        data: [
          { x: 0, y: 0 },
          { x: 100, y: 100 },
        ],
        showLine: true,
        borderColor: "#9ca3af",
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 12,
        bottom: 5,
      },
    },
    clip: 10,
    scales: {
      x: {
        title: {
          display: true,
          text: "Resource Allocation (%)",
          font: { size: 10 },
          padding: 2,
        },
        min: 0,
        max: 100,
      },
      y: {
        title: {
          display: true,
          text: "Workload (%)",
          font: { size: 10 },
          padding: 2,
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      tooltip: {
        mode: "nearest",
        displayColors: false,
        callbacks: {
          label: (ctx: TooltipItem<"scatter">) => {
            const x = ctx.parsed.x?.toFixed(2);
            const y = ctx.parsed.y?.toFixed(2);
            return `Resource Allocation: ${x}% • Workload: ${y}%`;
          },
        },
        bodyFont: { size: 10 },
      },
      legend: { display: false },
      title: { display: false },
    },
  };

  return (
    <div className="w-full bg-white rounded-md p-4 shadow-sm lg:h-[100%] lg:max-h-full">
      <div className=" flex justify-between items-center">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          워크로드 / 할당
        </h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value as "24h" | "168h")}
          className="border border-gray-300 rounded px-2 py-[6px] pr-8 text-sm text-gray-700"
        >
          <option value="24h">24H</option>
          <option value="168h">7Days</option>
        </select>
      </div>
      <div className="h-[145px] lg:h-[calc(100%-34px)]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            데이터를 불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            해당 기간에 데이터가 없습니다.
          </div>
        ) : (
          <Scatter data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type UsageData = {
  cpu_utilization: number;
  memory_usage: number;
  storage_usage: number;
};

const chartItems = [
  {
    key: "cpu_utilization",
    label: "CPU 사용률",
    color: "#6366f1",
  },
  {
    key: "memory_usage",
    label: "메모리 사용률",
    color: "#10b981",
  },
  {
    key: "storage_usage",
    label: "디스크 사용률",
    color: "#f59e0b",
  },
];

function getOrCreateTooltipEl(id: string) {
  let tooltipEl = document.getElementById(id) as HTMLDivElement | null;

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = id;

    // 🧤 여기부터 초기 스타일 지정
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "50";
    tooltipEl.style.background = "#111827";
    tooltipEl.style.color = "#f9fafb";
    tooltipEl.style.padding = "4px 8px";
    tooltipEl.style.borderRadius = "4px";
    tooltipEl.style.fontSize = "12px";
    tooltipEl.style.whiteSpace = "nowrap";
    tooltipEl.style.transition = "all 0.1s ease";
    tooltipEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    tooltipEl.style.opacity = "0";
    tooltipEl.style.left = "-9999px";
    tooltipEl.style.top = "-9999px";
    tooltipEl.style.transform = "translate(0, 0)";

    document.body.appendChild(tooltipEl);
  }

  return tooltipEl;
}

export default function UsageChartSection() {
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    fetch("/api/usage-chart")
      .then((res) => res.json())
      .then((data) => setUsage(data));
  }, []);

  return (
    <section className="grid grid-cols-1 compact:grid-cols-3 gap-5 lg:gap-2 xl:gap-5 lg:h-[152px]">
      {chartItems.map(({ key, label, color }) => {
        const value = usage?.[key as keyof UsageData] ?? null;

        const externalTooltipHandler = (context: {
          chart: Chart;
          tooltip: import("chart.js").TooltipModel<"doughnut">;
        }) => {
          const { chart, tooltip } = context;
          const tooltipEl = getOrCreateTooltipEl(`tooltip-${key}`);

          if (!tooltip || tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const canvasRect = chart.canvas.getBoundingClientRect();
          tooltipEl.textContent =
            tooltip.dataPoints?.[0]?.label +
            ": " +
            parseFloat(tooltip.dataPoints?.[0]?.formattedValue || "0").toFixed(
              2
            ) +
            "%";

          tooltipEl.style.opacity = "1";
          tooltipEl.style.left =
            canvasRect.left + window.scrollX + tooltip.caretX + "px";
          tooltipEl.style.top =
            canvasRect.top + window.scrollY + tooltip.caretY + "px";
          tooltipEl.style.transform = "translate(-50%, -100%)";
          tooltipEl.style.fontWeight = "500";
          tooltipEl.style.background = "#111827";
          tooltipEl.style.color = "#f9fafb";
          tooltipEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        };

        return (
          <div
            key={key}
            className={`bg-white rounded-xl shadow-sm p-4 pt-3 flex flex-col items-center justify-between border-t-4 ${
              usage ? "" : "animate-pulse"
            }`}
            style={{ borderColor: color }}
          >
            <span className="text-xs font-medium" style={{ color }}>
              {label}
            </span>

            <div
              className="w-[64px] h-[64px]"
              style={{ position: "relative", overflow: "visible" }}
            >
              {usage ? (
                <Doughnut
                  data={{
                    labels: [label, "잔여"],
                    datasets: [
                      {
                        data: [value!, 100 - value!],
                        backgroundColor: [color, "#f3f4f6"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    cutout: "70%",
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        enabled: false,
                        external: externalTooltipHandler,
                      },
                    },
                  }}
                />
              ) : (
                <div className="w-[64px] h-[64px] rounded-full bg-gray-100" />
              )}
            </div>

            <span
              className={`text-sm font-semibold ${
                usage ? "" : "text-gray-300"
              }`}
              style={{ color: usage ? color : undefined }}
            >
              {usage ? `${value!.toFixed(1)}%` : "--%"}
            </span>
          </div>
        );
      })}
    </section>
  );
}

"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const X_AXIS_OPTIONS = ["hour_of_day", "month_day", "day_index"];
const LABEL_MAP: Record<string, string> = {
  hour_of_day: "Hour",
  month_day: "Date",
  day_index: "Day",
};
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const METRIC_KEYS = ["cpu_utilization", "memory_usage", "storage_usage"];

type ChartDataItem = {
  hour_of_day?: number | string;
  month_day?: string;
  day_index?: number;
  cpu_utilization?: number;
  memory_usage?: number;
  storage_usage?: number;
};

export default function AverageChartSection() {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [xKey, setXKey] = useState("hour_of_day");
  const [selectedMetrics, setSelectedMetrics] = useState(METRIC_KEYS);

  useEffect(() => {
    fetch("/api/average-chart?group=" + xKey)
      .then((res) => res.json())
      .then((res) => {
        setData(res?.chart || []);
      });
  }, [xKey]);

  const labels =
    xKey === "day_index"
      ? DAY_ORDER
      : data.map((item) => item[xKey as keyof ChartDataItem] as string);

  const COLOR_MAP: Record<string, string> = {
    cpu_utilization: "#6366f1",
    memory_usage: "#10b981",
    storage_usage: "#f59e0b",
  };

  const chartData = {
    labels,
    datasets: METRIC_KEYS.filter((key) => selectedMetrics.includes(key)).map(
      (key) => ({
        label: extractMetricPrefix(key),
        data: data.map((item) => item[key as keyof ChartDataItem] ?? 0),
        borderColor: COLOR_MAP[key],
        backgroundColor: COLOR_MAP[key],
        pointStyle: "circle",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      })
    ),
  };

  function extractMetricPrefix(str: string): string {
    return str
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .split(" ")[0];
  }

  function formatLabel(str: string): string {
    return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <section className="bg-white flex flex-col shadow rounded p-4 w-full h-[400px]">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2 text-center">
        평균 리소스 사용률
      </h2>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          {X_AXIS_OPTIONS.map((key) => (
            <button
              key={key}
              className={`px-3 py-1 rounded text-sm border whitespace-nowrap ${
                xKey === key ? "bg-indigo-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setXKey(key)}
            >
              {LABEL_MAP[key]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {METRIC_KEYS.map((key) => (
            <label
              key={key}
              className="flex items-center gap-1 text-sm whitespace-nowrap"
            >
              <input
                type="checkbox"
                checked={selectedMetrics.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMetrics([...selectedMetrics, key]);
                  } else {
                    setSelectedMetrics(
                      selectedMetrics.filter((k) => k !== key)
                    );
                  }
                }}
              />
              {formatLabel(key)}
            </label>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <Line
          data={chartData}
          options={{
            resizeDelay: 50,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  display: false,
                },
              },
              x: {
                ticks: {
                  maxRotation: 0,
                  autoSkip: true,
                  padding: 6,
                },
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 10,
                  color: "#333",
                },
              },
              tooltip: {
                usePointStyle: true,

                callbacks: {
                  label: (ctx) => {
                    const value = parseFloat(ctx.formattedValue);
                    return `${ctx.dataset.label}: ${value.toFixed(2)}%`;
                  },
                },
              },
            },
          }}
          height={200}
        />
      </div>
    </section>
  );
}

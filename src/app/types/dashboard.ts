export type AverageChartData = {
  hour_of_day?: number | string;
  month_day?: string;
  day_index?: number;
  cpu_utilization?: number;
  memory_usage?: number;
  storage_usage?: number;
};

export type ChangeIndicator = {
  metric: "CPU" | "Memory" | "Storage";
  change_pct: number;
  status: "up" | "down" | "stable";
};

export type ResourceAllocationStat = {
  range_type: "24h" | "168h";
  ts: string;
  resource_allocation: number;
  workload: number;
};

export type Summary = {
  avg_cpu_utilization: number;
  avg_memory_usage: number;
  avg_storage_usage: number;
  avg_workload: number;
  [key: string]: number | undefined;
};
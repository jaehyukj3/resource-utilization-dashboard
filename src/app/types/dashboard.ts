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

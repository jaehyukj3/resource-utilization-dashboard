export type ChangeIndicator = {
  metric: "CPU" | "Memory" | "Storage";
  change_pct: number;
  status: "up" | "down" | "stable";
};

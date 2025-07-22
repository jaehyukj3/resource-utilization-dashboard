import { createClient } from "@/utils/supabase/server";
import type { Summary, ChangeIndicator } from "@/app/types/dashboard";

export async function getSummary(): Promise<Summary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_summary_metrics");

  if (error || !data) {
    console.error("get_summary_metrics RPC failed:", error?.message);
    return [];
  }

  return Array.isArray(data) ? data : [data];
}

export async function getIndicators(): Promise<ChangeIndicator[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_change_indicators");
  if (error || !data) return [];
  return data ?? [];
}